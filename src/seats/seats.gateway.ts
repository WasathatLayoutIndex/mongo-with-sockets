import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { SeatsService } from './seats.service';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';
import { Seat } from './schema/seat.schema';
import { Server, Socket } from 'socket.io';
@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: '/seats',
})
export class SeatsGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(private readonly seatsService: SeatsService) {}

  async handleConnection(client: Socket) {
    const allSeats = await this.seatsService.findAll();
    client.emit('allSeats', allSeats);
  }

  @SubscribeMessage('createSeat')
  async create(
    @MessageBody()
    seat: CreateSeatDto,
  ): Promise<Seat> {
    const newSeat = await this.seatsService.create(seat);

    this.server.emit('allSeats', await this.seatsService.findAll());

    return newSeat;
  }

  @SubscribeMessage('allSeats')
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

    this.server.emit('allSeats', await this.seatsService.findAll());

    return updatedSeat;
  }
}
