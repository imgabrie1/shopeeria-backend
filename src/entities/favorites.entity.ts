import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  ManyToOne,
} from "typeorm";
import { User } from "./user.entity";
import { Product } from "./products.entity";

@Entity("favorites")
export class Favorite {
  @PrimaryGeneratedColumn("increment")
  id: number;

  // Essa coluna referencia o usuário que favoritou o produto
  @ManyToOne(() => User, (user) => user.favorites)
  user: User;

  // Essa coluna referencia o produto que foi favoritado pelo usuário
  @ManyToOne(() => Product, (product) => product.favorites)
  product: Product;
}

