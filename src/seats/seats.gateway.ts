import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { SeatsService } from './seats.service';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';
import { Seat } from './schema/seat.schema';
import { Server } from 'socket.io';
@WebSocketGateway()
export class SeatsGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly seatsService: SeatsService) {}

  @SubscribeMessage('createSeat')
  async create(
    @MessageBody()
    seat: CreateSeatDto,
  ): Promise<Seat> {
    const newSeat = await this.seatsService.create(seat);

    this.server.emit('findAllSeats', await this.seatsService.findAll());

    return newSeat;
  }

  @SubscribeMessage('findAllSeats')
  findAll(): Promise<Seat[]> {
    return this.seatsService.findAll();
  }

  @SubscribeMessage('updateSeat')
  async update(
    @MessageBody('seat') 
    seat: UpdateSeatDto,

  ): Promise<Seat> {
    const { id, ...updatedSeatData } = seat; 

    const updatedSeat = await this.seatsService.update(id, updatedSeatData);
    
    this.server.emit('findAllSeats', await this.seatsService.findAll());

    return updatedSeat;
  }
}
