import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Seat } from './schema/seat.schema';
import mongoose from 'mongoose';

@Injectable()
export class SeatsService {
  constructor(
    @InjectModel(Seat.name)
    private seatModel: mongoose.Model<Seat>,
  ) {}

  async create(seat: Seat): Promise<Seat> {
    const res = await this.seatModel.create(seat);
    return res;
  }

  async findAll(): Promise<Seat[]> {
    return await this.seatModel.find();
  }

  async update(id: string, seat: Seat): Promise<Seat> {
    return await this.seatModel.findByIdAndUpdate(id, seat, {
      new: true,
      runValidators: true,
    });
  }
}
