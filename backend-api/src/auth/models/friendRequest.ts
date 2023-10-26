import { User } from "./user.interface";

export type friend_request_Status ='not-sent'| 'pending' | 'accepted' | 'declined' | 'waiting-the-User-response';

export interface friendRequestStatus{
    status?: friend_request_Status;
}

export interface FriendRequest{
    id?:number;
    creator?:User
    reciver?:User
    status?: friend_request_Status
}