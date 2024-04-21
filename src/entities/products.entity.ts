import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Favorite } from "./favorites.entity";


@Entity("products")
export class Product {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 45 })
  productName: string;

  @Column({ type: "varchar", length: 120 })
  description: string;

  @Column({type: "varchar", array: true })
  category: [string];

  @Column({type: "varchar"})
  link: string;

  @OneToMany(() => Favorite, (favorite) => favorite.product)
  favorites: Favorite[];

  @CreateDateColumn({ type: "date" })
  createdAt: Date | string;

  @UpdateDateColumn({ type: "date" })
  updatedAt: Date | string;

  @DeleteDateColumn({ type: "date" })
  deletedAt: Date | string;


}

