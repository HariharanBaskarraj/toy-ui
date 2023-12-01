import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from './modules/material/material.module';
import { DragDropComponent } from './components/drag-drop/drag-drop.component';
import { TitleBarComponent } from './components/title-bar/title-bar.component';
import { ResultsComponent } from './components/results/results.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    DragDropComponent,
    TitleBarComponent,
    ResultsComponent,
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'mattel-ui';
}
