import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule, 
    MatTableModule,
    MatProgressSpinnerModule
  ],
  exports:[
    MatIconModule,
    MatButtonModule, 
    MatTableModule,
    MatProgressSpinnerModule
  ]
})
export class MaterialModule { }
