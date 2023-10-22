import { FeedPost } from "src/feed/models/post.interface";
import { Role } from "./role.enum";


export interface User{
    id?:number;
    firstname?:string;  
    lastname?:string; 
    nickname?:string; 
    phone?:string; 
    email?:string; 
    imagePath?:string;
    password?:string; 
    role?:Role;
    posts?:FeedPost[];
}