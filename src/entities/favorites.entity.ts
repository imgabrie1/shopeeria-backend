import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./user.entity";
import { Product } from "./products.entity";

@Entity("favorites")
export class Favorite {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @ManyToOne(() => User, (user) => user.favorites)
  user: User;

  @ManyToOne(() => Product, (product) => product.favorites)
  product: Product;
}

