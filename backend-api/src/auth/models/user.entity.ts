import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.enum";
import { FeedPostEntity } from "src/feed/models/post.entity";

@Entity('user')
export class UserEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    firstname:string;

    @Column()
    lastname:string;

    @Column()
    nickname:string;

    @Column({unique: true})
    email:string;
    
    @Column({select: false})
    password:string;

    @Column()
    phone:string;

    @Column({type: "enum", enum :Role, default : Role.User})
    role:Role;

    @Column({nullable: true})
    imagePath:string;

    @OneToMany(()=> FeedPostEntity,(FeedPostEntity)=>FeedPostEntity.author)
    feedPosts:FeedPostEntity[];

}