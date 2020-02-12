import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatGridListModule,
    MatButtonToggleModule,
    MatSnackBarModule
  ], 
  exports: [
    MatFormFieldModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatInputModule,
    MatGridListModule,
    MatSnackBarModule
  ],
  declarations: []
})
export class AppMaterialModule { }
