import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { SeatsService } from './seats.service';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';

@WebSocketGateway()
export class SeatsGateway {
  constructor(private readonly seatsService: SeatsService) {}

  @SubscribeMessage('createSeat')
  create(@MessageBody() createSeatDto: CreateSeatDto) {
    return this.seatsService.create(createSeatDto);
  }

  @SubscribeMessage('findAllSeats')
  findAll() {
    return this.seatsService.findAll();
  }

  @SubscribeMessage('findOneSeat')
  findOne(@MessageBody() id: number) {
    return this.seatsService.findOne(id);
  }

  @SubscribeMessage('updateSeat')
  update(@MessageBody() updateSeatDto: UpdateSeatDto) {
    return this.seatsService.update(updateSeatDto.id, updateSeatDto);
  }

  @SubscribeMessage('removeSeat')
  remove(@MessageBody() id: number) {
    return this.seatsService.remove(id);
  }
}
