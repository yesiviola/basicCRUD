import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Vehicle } from "./Vehicle";

@Entity({
  name: "users",
}) //users
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
  })
  name: string;

  @Column()
  email: string;

  @Column("integer")
  age: number;

  @Column()
  active: boolean;

  // @OneToOne(() => Vehicle)
  // @JoinColumn()
  // vehicle: Vehicle;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.user)
  vehicles: Vehicle[];
  user: Vehicle;
  newVehicle: User;
}
