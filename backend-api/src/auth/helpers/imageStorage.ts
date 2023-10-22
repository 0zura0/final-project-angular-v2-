
import { diskStorage } from "multer";
import {v4 as uuidv4 } from 'uuid'

import fs from "fs";
import FileTypes from "file-type";

import path = require("path");

type validfileType ='png' | 'jpg' | 'jpeg';
type validmimetype ='image/png' | 'image/jpg' | 'image/jpeg';

const valiFileArr: validfileType[] =['png','jpg','jpeg'] 
const validMimeTypeArr: validmimetype[] =[ 
    'image/png',
    'image/jpg',
    'image/jpeg'
] 

export const saveImageFileToStorage = {
    storage:diskStorage({
       destination:'./images',
       filename:(req,file,cb)=>{
        const fileExtention:string = path.extname(file.originalname); //ვიღებ ფაილის გაფართოვებას
        const filename:string =uuidv4() + fileExtention;
        cb(null,filename)
       },
    }),
    fileFilter :(req,file,cb)=>{
        const allowedMimeTypes: validmimetype[] = validMimeTypeArr;
        allowedMimeTypes.includes(file.mimetype) ? cb(null,true):cb(null,false);
       } 
}