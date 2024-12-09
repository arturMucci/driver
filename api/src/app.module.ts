import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RideModule } from './modules/ride/ride.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    RideModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
