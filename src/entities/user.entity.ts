import { getRounds, hashSync } from "bcryptjs";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate
} from "typeorm";
import { Favorite } from "./favorites.entity";


@Entity("users")
export class User {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 50 })
  name: string;

  @Column({ type: "varchar", length: 50 })
  email: string;

  @Column({ type: "varchar", length: 125 })
  password: string;

  @Column({ default: false })
  admin: boolean;

  @OneToMany(() => Favorite, (favorite) => favorite.user)
  favorites: Favorite[];

  @CreateDateColumn({ type: "date" })
  createdAt: Date | string;

  @UpdateDateColumn({ type: "date" })
  updatedAt: Date | string;

  @DeleteDateColumn({ type: "date" })
  deletedAt: Date | string;


  @BeforeInsert()
  @BeforeUpdate()
  hashPassword(){
      const isEncrypt = getRounds(this.password)
      if(!isEncrypt){
          this.password = hashSync(this.password, 10)
      }
  }
}

