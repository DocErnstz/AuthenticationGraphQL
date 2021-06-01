import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";
@ObjectType()
@Entity("users")
export class User {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;
    @Field()
    @Column("text")
    email: string;
    @Column("text")
    password: string;
}
