import { IPost } from "src/app/shared/Interfaces/Post/IPots";

export interface User{
    id?:number;
    firstname?:string;  
    lastname?:string; 
    nickname?:string; 
    phone?:string; 
    email?:string; 
    imagePath?:string;
    password?:string; 
    role?:'user';
    feedPosts?:IPost[];
}