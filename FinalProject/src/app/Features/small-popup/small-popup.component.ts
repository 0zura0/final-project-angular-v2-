import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDataService } from 'src/app/shared/services/manipulateData/user-data.service';

@Component({
  selector: 'app-small-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './small-popup.component.html',
  styleUrls: ['./small-popup.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush

})
export class SmallPopupComponent {
constructor(public userDataService : UserDataService){}


}
