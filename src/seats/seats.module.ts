import { Module } from '@nestjs/common';
import { SeatsService } from './seats.service';
import { SeatsGateway } from './seats.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { SeatSchema } from './schema/seat.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Seat', schema: SeatSchema }])],
  providers: [SeatsGateway, SeatsService],
})
export class SeatsModule {}
