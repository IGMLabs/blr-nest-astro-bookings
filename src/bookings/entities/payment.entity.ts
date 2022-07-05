import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Booking } from "./booking.entity";

@Entity("payments")
export class Payment {
  @PrimaryColumn()
  id: string;

  @Column()
  card: string;

  @Column()
  amount: number;

  @ManyToOne(() => Booking, (booking: Booking) => booking.payment)
  booking: Booking;
}
