
import { diskStorage } from "multer";
import {v4 as uuidv4 } from 'uuid'

import fs from "fs";
import FileTypes, { FileTypeResult } from "file-type";

import path = require("path");
import { Observable, from, of, switchMap } from "rxjs";

type validfileType ="apng" | 'jpg' | 'jpeg';
type validmimetype ='image/png' | 'image/jpg' | 'image/jpeg';

const valiFileArr: validfileType[] =['apng','jpg','jpeg'] 
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

// export const IsFileExtensionSafe=(FullfilePath:string):Observable<boolean>=>{
//  return from(FileTypes.fileTypeFromFile(FullfilePath)).pipe(  //ეს ფუნქცია აბრუნებს extentions და Mime tipe-ს
//     switchMap((value:FileTypeResult,index:number):Observable<boolean>=>{
//         if(value)return of(false);

//         const isFiletypeLegit = valiFileArr.includes(value.ext)
//         const ifmimeTypeLegit = validMimeTypeArr.includes(value.mime)

//         const isfileLegit=isFiletypeLegit && ifmimeTypeLegit
//         return of(isFiletypeLegit)
//     })
//  )
// }