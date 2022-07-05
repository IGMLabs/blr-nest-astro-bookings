import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Trip } from "../../trips/entities/trip.entity";
import { Payment } from "./payment.entity";

@Entity("bookings")
export class Booking {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Trip, (trip: Trip) => trip.booking, { eager: true })
  trip: Trip;

  @Column({ nullable: false })
  client: string;

  @Column({ type: "int", default: 1 })
  passengers: number;

  @Column({ type: "timestamp", default: () => "now()" })
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt: Date;

  @OneToMany(() => Payment, (payment: Payment) => payment.booking, { cascade: true })
  payment: Payment;
}
