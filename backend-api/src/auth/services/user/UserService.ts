import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { cursorTo } from 'readline';
import { Observable, from, map, of, switchMap, tap } from 'rxjs';
import { FriendRequest, friendRequestStatus, friend_request_Status } from 'src/auth/models/friendRequest';
import { FriendRequestEntity } from 'src/auth/models/friend_request.entity';
import { Role } from 'src/auth/models/role.enum';
import { UserEntity } from 'src/auth/models/user.entity';
import { User } from 'src/auth/models/user.interface';
import { Repository, UpdateResult } from 'typeorm';


@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity)
    private readonly UserRepository: Repository<UserEntity>,


        @InjectRepository(FriendRequestEntity)
        private readonly FriendRequestRepository: Repository<FriendRequestEntity>

    ) { }

    findeUserByid(id: number): Observable<User> {
        return from(
            this.UserRepository.findOne({
                select: ['id', 'firstname', 'lastname', 'nickname', 'email', 'password', 'phone', 'role', 'imagePath'],
                where: { id }, relations: ['feedPosts']
            })
        ).pipe(map((user: User): User => {
            // console.log(user);
            delete user.password;
            return user;
        }));
    }


    updateUserUserByID(id: number, imagePath: string): Observable<UpdateResult> {
        const user = new UserEntity();
        user.id = id;
        user.imagePath = imagePath;
        return from(this.UserRepository.update(id, user));
    }



    FindImageNameByUserID(id: number): Observable<string> {
        return from(this.UserRepository.findOne({ where: { id } })).pipe(
            map((user: User) => {
                return user.imagePath;
            })
        );
    }

    getUserByName(Fullname: string): Observable<User | { error: string }> {
        let splited = Fullname.split(' ');
        let firstname = splited[0];
        let lastname = splited[1];
        return from(this.UserRepository.findOne({ where: { firstname: firstname, lastname: lastname } })).pipe(
            switchMap((person: User): Observable<User | { error: string }> => {
                if (person) {
                    return of(person)
                } else {
                    return of({ error: "There is no such person" })
                }
            })
        )
    }

    //რექვსეთი აქვს თუ არა იმას ამოწმებს და სჭირდება გამგზავნისა და მიმღების ობიექტები   {შიდა ფუნქციაა ამას ცონტროლერში არ ვიყენებთ}
    hasRequestBeenSentOrReceived(creator: User, reciver: User): Observable<boolean> {
        return from(
            this.FriendRequestRepository.findOne({
                where: [{ creator, reciver },
                { creator: reciver, reciver: creator }]
            })).pipe(
                switchMap((friendRequest: FriendRequest) => {
                    if (!friendRequest) {
                        return of(false);
                    } else {
                        return of(true);
                    }
                })
            );
    }


    //ამოწმებს აქვს თუ არა გაგზავნილი რექვესთი
    sendFriendReqest(reciverId: number, creator: User): Observable<FriendRequest | { error: string; }> {
        console.log(reciverId, creator);
        if (reciverId === creator.id) {
            return of({ error: "it is not possible to add yourself" });
        }

        return this.findeUserByid(reciverId).pipe(
            switchMap((reciver: User): Observable<any> => {
                return this.hasRequestBeenSentOrReceived(creator, reciver).pipe(
                    switchMap((hasRequestBeenSentOrReceived: boolean): Observable<any> => {
                        if (hasRequestBeenSentOrReceived) {
                            return of({ error: 'Frined request has already been sent or received.' });
                        }
                        let friendRequest: FriendRequest = {
                            creator,
                            reciver,
                            status: 'pending'
                        }
                        return from(this.FriendRequestRepository.save(friendRequest))
                    })
                );
            })
        );

    }


    //იღებს რექვესთის სტატუსს მიმღების აიდით და აქშუალ მომხმარებლით
    getFriendRequestStatus(reciverid: number, curentUser: User): Observable<friendRequestStatus> {
        console.log(curentUser);
        return this.findeUserByid(reciverid).pipe(
            switchMap((reciver: User) => {
                console.log("current user------------------------");
                console.log(curentUser);
                console.log("-------------------------------reciver");
                console.log(reciver);
                reciver = {
                    id: reciver.id,
                    firstname: reciver.firstname,
                    lastname: reciver.lastname,
                    nickname: reciver.nickname,
                    email: reciver.email,
                    phone: reciver.phone,
                    role: Role.User,
                    imagePath: reciver.imagePath,
                }
                console.log("---------------also reciver-------------------");

                console.log(reciver);
                return from(
                    this.FriendRequestRepository.findOne(
                        {
                            where: [
                                { creator: curentUser, reciver: reciver },
                                { creator: reciver, reciver: curentUser }
                            ],
                            relations: ['creator', 'reciver']
                        }),
                );
            }),
            switchMap((friendReques: FriendRequest) => {
                console.log("responce");
                console.log(friendReques);
                if (friendReques?.reciver.id === curentUser.id) {
                    if (friendReques.reciver.id === curentUser.id || friendReques.creator.id === curentUser.id) {

                        if (friendReques.status == 'accepted' || friendReques.status == 'declined') {
                            return of({ status: friendReques.status })
                        }

                    }
                    return of({ status: 'waiting-the-User-response' as friend_request_Status });
                }
                console.log(friendReques);
                return of({ status: friendReques?.status || 'not-sent' })
            }),
        );
    }

    //ეძებს რექვესთს რექვესთების ცხრილში აიდით
    getUserFriendRequestByid(friendRequesid: number): Observable<FriendRequest> {
        return from(this.FriendRequestRepository.findOne({
            where: { id: friendRequesid }
        }))
    }
    // რესპონსს უკეთენს ანუ გამოგზავნილი ადამინი გამომგზავნს ანუ რექვესთ ბაზაში პენდინგი იცვლება უარყოფით ან თანხმობით
    RespondToFriendRequest(
        statusResponse: friendRequestStatus,
        friendRequestId: number,
    ): Observable<friendRequestStatus | { notSend: boolean }> {

        return this.getUserFriendRequestByid(friendRequestId).pipe(
            switchMap((friendRequest: FriendRequest): Observable<any> => {
                console.log(friendRequest.status);
                    
                if(friendRequest.status=="declined"){
                    console.log("trying to delete friend request");
                    // return from(this.FriendRequestRepository.delete(friendRequest.id))
                }

                if (friendRequest) {
                    return from(this.FriendRequestRepository.save({
                        ...friendRequest,
                        status: statusResponse.status
                    }))
                } else {
                    return of({ notSend: true })
                }
            }),
        )
    }

    // აბრუნებს ყველა ადამიანის რესპონსს არ აქვს მნიშვნელობა აქვს თუ არა თანხმობა აქვს თუ არა და მერე ფრონტში გავცხრილავ როგორც მომინდება
    getFriendRequestFromResipients(currentUser: User): Observable<friendRequestStatus[] | { notSend: boolean }> {
        return from(this.FriendRequestRepository.find({
            where: [{ reciver: currentUser },{ creator: currentUser }],
            relations: ['reciver', 'creator']
        }))
    }


    deleteRequestByID(
        friendRequestId: number,
    ):Observable<any> {
        return from(this.FriendRequestRepository.delete({id:friendRequestId}))
    }



}
