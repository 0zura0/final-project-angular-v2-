import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LeftBarComponent } from "../../Features/left-bar/left-bar.component";
import { TopcomponentComponent } from "../../Features/topcomponent/topcomponent.component";
import { RightBarComponent } from "../../Features/right-bar/right-bar.component";
import { HttpClientModule } from '@angular/common/http';
import { ManipulationService } from 'src/app/shared/services/manipulateData/manipulation.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        LeftBarComponent,
        TopcomponentComponent,
        RightBarComponent,
        HttpClientModule
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'FinalProject';

  constructor(public manipulationService: ManipulationService,
    private Ref:ChangeDetectorRef){}
  ngOnInit(): void {
    this.Ref.detectChanges();
  }
    
}
