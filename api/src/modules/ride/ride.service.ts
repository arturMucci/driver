import { HttpException, Injectable, Logger } from '@nestjs/common';
import { GmapsApiPayloadDto, GmapsHeaderDto } from './dto/GmapsApiPayloadDto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { IRideEstimateData } from './interfaces/IRideEstimate';
import { PrismaService } from 'src/prisma.service';
import { GmapsApiOutputDto } from './dto/GmapsApiOutputDto';
import { EstimateOptionsDto } from './dto/EstimateOptionsDto';
import { IRideConfirmData } from './interfaces/IRideConfirm';

@Injectable()
export class RideService {
  private readonly logger = new Logger();

  constructor(
    private readonly httpService: HttpService,
    private readonly prismaService: PrismaService,
  ) {}

  public async rideHistory(
    customerId: string,
    driverId?: string,
  ): Promise<any> {
    if (
      !(await this.prismaService.customer.findUnique({
        where: { id: customerId },
      }))
    ) {
      throw new HttpException('INVALID_CUSTOMER', 400);
    }

    if (
      driverId &&
      !(await this.prismaService.driver.findUnique({
        where: { id: Number(driverId) },
      }))
    ) {
      throw new HttpException('INVALID_DRIVER', 400);
    }

    const customerQuery = await this.prismaService.customer.findUnique({
      where: { id: customerId },
      include: {
        rides: driverId ? { where: { driverId: Number(driverId) } } : true,
      },
    });

    return {
      customer_id: customerQuery.id,
      rides: customerQuery.rides,
    };
  }

  public async rideOptions(
    rideEstimateData: IRideEstimateData,
  ): Promise<EstimateOptionsDto> {
    const apiUrl = 'https://routes.googleapis.com/directions/v2:computeRoutes';

    const payload: GmapsApiPayloadDto = {
      origin: {
        address: rideEstimateData.origin,
      },
      destination: {
        address: rideEstimateData.destination,
      },
      intermediates: [],
      travelMode: 'DRIVE',
    };

    const header: GmapsHeaderDto = {
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': process.env.GOOGLE_API_KEY,
        'X-Goog-FieldMask': 'routes',
      },
    };

    try {
      const { data }: GmapsApiOutputDto = await firstValueFrom(
        this.httpService.post(apiUrl, payload, header),
      );

      try {
        const distanceMeters = data.routes[0].legs[0].distanceMeters;

        const prismaQuery = await this.prismaService.driver.findMany({
          where: { min_km: { lt: distanceMeters / 1000 } },
          include: { review: true },
        });

        const estimateOptions: EstimateOptionsDto = {
          origin: {
            latitude: data.routes[0].legs[0].startLocation.latLng.latitude,
            logitude: data.routes[0].legs[0].startLocation.latLng.longitude,
          },
          destination: {
            latitude: data.routes[0].legs[0].endLocation.latLng.latitude,
            logitude: data.routes[0].legs[0].endLocation.latLng.longitude,
          },
          distance: distanceMeters / 1000,
          duration: data.routes[0].legs[0].duration,
          options: prismaQuery.map((driver) => ({
            id: driver.id,
            name: driver.name,
            description: driver.description,
            vehicle: driver.vehicle,
            review: {
              rating: driver.review.rating,
              comment: driver.review.comment,
            },
            value: (driver.value * distanceMeters) / 1000,
          })),
          routeResponse: data,
        };

        return estimateOptions;
      } catch (error: any) {
        this.logger.error('Prisma query failed:', {
          message: error.message,
        });
      }
    } catch (error: any) {
      this.logger.error('Request failed:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });

      throw error;
    }
  }

  public async confirmRide(rideConfirmData: IRideConfirmData): Promise<any> {
    const prismaQuery = await this.prismaService.driver.findUnique({
      where: { id: rideConfirmData.driver.id },
    });

    if (!prismaQuery) {
      throw new HttpException('DRIVER_NOT_FOUND', 404);
    }

    if (prismaQuery.min_km > rideConfirmData.distance) {
      throw new HttpException('INVALID_DISTANCE', 406);
    }

    const checkCustomer = await this.prismaService.customer.findUnique({
      where: { id: rideConfirmData.customer_id },
    });

    if (!checkCustomer) {
      await this.prismaService.customer.upsert({
        where: { id: rideConfirmData.customer_id },
        update: {},
        create: {
          id: rideConfirmData.customer_id,
        },
      });
    }

    const prismaUpdate = await this.prismaService.ride
      .create({
        data: {
          origin: rideConfirmData.origin,
          destination: rideConfirmData.destination,
          distance: rideConfirmData.distance,
          duration: rideConfirmData.duration,
          value: rideConfirmData.value,
          driver: {
            connect: { id: rideConfirmData.driver.id },
          },
          customer: {
            connect: { id: rideConfirmData.customer_id },
          },
        },
        include: { driver: { select: { id: true, name: true } } },
      })
      .catch((error: any) => {
        console.log(error);
      });

    if (!prismaUpdate) {
      throw new HttpException('Erro ao criar a corrida', 500);
    }
  }
}
