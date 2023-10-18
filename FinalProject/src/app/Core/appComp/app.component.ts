import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LeftBarComponent } from "../../Features/left-bar/left-bar.component";
import { TopcomponentComponent } from "../../Features/topcomponent/topcomponent.component";
import { RightBarComponent } from "../../Features/right-bar/right-bar.component";

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
        RightBarComponent
    ]
})
export class AppComponent {
  title = 'FinalProject';
}
