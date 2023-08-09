import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Seat{
    @Prop()
    name: string;

    @Prop()
    isClicked: boolean;

    @Prop()
    isReserved: boolean;
}

export const SeatSchema = SchemaFactory.createForClass(Seat);