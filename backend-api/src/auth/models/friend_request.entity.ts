import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";
import { friend_request_Status } from "./friendRequest";


@Entity('request')
export class FriendRequestEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(()=>UserEntity, (UserEntity)=> UserEntity.SentFriendRequest)
    creator:UserEntity;

    @ManyToOne(()=>UserEntity, (UserEntity)=> UserEntity.RecivedFriendRequest)
    reciver:UserEntity;

    @Column()
    status:friend_request_Status;

    
}