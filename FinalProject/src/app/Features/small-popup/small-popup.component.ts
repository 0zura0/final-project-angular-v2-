import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDataService } from 'src/app/shared/services/manipulateData/user-data.service';
import { FormBuilder } from '@angular/forms';
import { from, switchMap } from 'rxjs';

Component({
  selector: 'app-small-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './small-popup.component.html',
  styleUrls: ['./small-popup.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush

})
type ValifFileExtentions  = 'png' | 'jpg' | 'jpeg';
type ValidMimeType = 'image/png' | 'image/jpeg' | 'image/jpg';
export class SmallPopupComponent {
constructor(public userDataService : UserDataService,
            private formBuilder:FormBuilder){}

public ValidFileExtentions:ValifFileExtentions[] =['png' , 'jpg' , 'jpeg']
public ValidMimeTypes:ValidMimeType[] =['image/png' , 'image/jpeg' , 'image/jpg']
    
public  form = this.formBuilder.group({
  file: null,
})

onFileSelect(event:any){
const file:File = event.target.files[0]
console.log(file);
if(!file) return;
const Formdata = new FormData();
Formdata.append('file',file)

file.arrayBuffer()

}

}
