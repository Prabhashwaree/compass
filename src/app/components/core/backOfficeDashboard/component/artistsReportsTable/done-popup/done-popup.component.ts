import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-done-popup',
  templateUrl: './done-popup.component.html',
  styleUrls: ['./done-popup.component.scss']
})
export class DonePopupComponent {
  message = '';
  status = false;
  btnStatus = true;
  

  constructor(
    private dialogRef: MatDialogRef<DonePopupComponent>,
    @Inject(MAT_DIALOG_DATA) data: { message: string ,status:boolean}
  ) {
    this.message = data ? data.message : '';
    this.btnStatus = data?data.status : true
  }
}
