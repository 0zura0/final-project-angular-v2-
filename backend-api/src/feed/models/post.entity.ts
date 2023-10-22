import { UserEntity } from "src/auth/models/user.entity";
import { Entity,PrimaryGeneratedColumn,Column, CreateDateColumn, ManyToMany, ManyToOne } from "typeorm";

@Entity('feed_post')
export class FeedPostEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: ''})
    body:string;

    @CreateDateColumn()
    created_at:Date;

    @ManyToOne(()=>UserEntity, (UserEntity)=> UserEntity.feedPosts)
    author:UserEntity;
}