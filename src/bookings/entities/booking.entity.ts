import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Trip } from "../../trips/entities/trip.entity";

@Entity("bookings")
export class Booking {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Trip)
  trip: Trip;

  @Column({ nullable: false })
  client: string;

  @Column({ type: "int", default: 1 })
  passengers: number;

  @Column({ type: "timestamp", default: () => "now()" })
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt: Date;
}

@Entity("payments")
export class Payment {
  @PrimaryColumn()
  id: string;

  @Column()
  card: string;

  @Column()
  amount: number;

  @ManyToOne(() => Booking)
  booking: Booking;
}
