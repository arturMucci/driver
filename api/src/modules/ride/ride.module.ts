import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { RideController } from './ride.controller';
import { RideService } from './ride.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [HttpModule],
  controllers: [RideController],
  providers: [RideService, PrismaService],
  exports: [RideService],
})
export class RideModule {}
