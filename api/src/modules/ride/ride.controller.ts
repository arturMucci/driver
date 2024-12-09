import {
  Controller,
  Post,
  Body,
  Patch,
  Get,
  Param,
  Query,
} from '@nestjs/common';

import {
  RideEstimateSchema,
  RideConfirmSchema,
  RideHistoryParamSchema,
} from './ZodSchemas/ride';

import {
  RideEstimateValidation,
  RideConfirmValidation,
  RideHistoryValidation,
} from '../../decorators';

import { RideEstimateDataDto } from './dto/RideEstimateDto';
import { EstimateOptionsDto } from './dto/EstimateOptionsDto';
import { RideConfirmDataDto } from './dto/RideConfirmDto';
import { RideService } from './ride.service';

@Controller('ride')
export class RideController {
  constructor(private readonly rideService: RideService) {}

  @Get(':customer_id')
  rideHistory(
    @Param('customer_id')
    @RideHistoryValidation({ params: RideHistoryParamSchema })
    customerId: string,
    @Query('driver_id')
    driverId: string,
  ) {
    return this.rideService.rideHistory(customerId, driverId);
  }

  @Post('estimate')
  async rideOptions(
    @Body()
    @RideEstimateValidation({ body: RideEstimateSchema })
    rideEstimateDto: RideEstimateDataDto,
  ): Promise<EstimateOptionsDto> {
    return this.rideService.rideOptions(rideEstimateDto);
  }

  @Patch('confirm')
  async confirmRide(
    @Body()
    @RideConfirmValidation({ body: RideConfirmSchema })
    rideConfirmDataDto: RideConfirmDataDto,
  ) {
    console.log(rideConfirmDataDto);

    this.rideService.confirmRide(rideConfirmDataDto);

    return { success: true };
  }
}
