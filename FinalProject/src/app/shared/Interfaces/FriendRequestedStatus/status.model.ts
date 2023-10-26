import { IUser } from "../Iauthorization/user.model";

export type friend_request_Status ='not-sent'| 'pending' | 'accepted' | 'declined' | 'waiting-the-User-response';

export interface friendRequestStatus{
    status?: friend_request_Status;
}

export interface FriendRequest{
    id:number;
    creatorId:number;
    reciverId:number;
    status?: friend_request_Status;
}

export interface FriendRequestWithreciverAndCreators{
    id:number;
    creator:IUser;
    reciver:IUser;
    status?: friend_request_Status;
}