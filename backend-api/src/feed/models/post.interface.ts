import { User } from "src/auth/models/user.interface";

export interface FeedPost{
    id?: number;
    body?: string;
    created_at?: Date;
    author?:User;
}