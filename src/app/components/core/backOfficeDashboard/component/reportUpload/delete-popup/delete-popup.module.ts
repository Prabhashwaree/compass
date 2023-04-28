import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { DeletePopupComponent } from './delete-popup.component';
import { MatTableModule } from '@angular/material/table'  

@NgModule({
  declarations: [
    DeletePopupComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDialogModule,
    MatTableModule,   
  ],
})
export class DeletePopupModule {}
