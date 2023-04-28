import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DataTransferService } from 'src/app/service/data-transfer-service/data-transfer.service';

export interface exlTableError{
  rowError: string;
  cellError: string;

}

const ELEMENT_DATA: exlTableError[] = [
  // {rowError:'1', cellError: 'A / B / C / D /E / F / G / H '},
  // {rowError:'1', cellError: 'A / B'},
  // {rowError:'1', cellError: 'A / B'},
  // {rowError:'1', cellError: 'A / B'},
  // {rowError:'1', cellError: 'A / B'},
  // {rowError:'1', cellError: 'A / B / C / D /E / F / G / H '},
  // {rowError:'1', cellError: 'A / B'},
  // {rowError:'1', cellError: 'A / B'},
  // {rowError:'1', cellError: 'A / B'},
  // {rowError:'1', cellError: 'A / B'},
 
 

];

const exlTableError: any = [];

@Component({
  selector: 'app-delete-popup',
  templateUrl: './delete-popup.component.html',
  styleUrls: ['./delete-popup.component.scss']
})
export class DeletePopupComponent {
  message = '';
  error:any;
  color='';

  isTableEmpty:boolean=true;

  displayedColumns: string[] = ['rowError', 'cellError'];
  dataSource = new MatTableDataSource<exlTableError>(ELEMENT_DATA);
  clickedRows = new Set<exlTableError>();

  constructor(
    private dialogRef: MatDialogRef<DeletePopupComponent>,
    @Inject(MAT_DIALOG_DATA) data: { message: string ,error:any,color:string}
  
  ,private dataTransferService: DataTransferService  ) {
    this.message = data ? data.message : '';
    this.error = data ? data.error:'';
    this.color=data?data.color:'';
   
  }

  ngOnInit() {
    this.loadErrorListToTable()
  }

  loadErrorListToTable() {
    ELEMENT_DATA.length = 0;
    if(this.error==null){
      this.isTableEmpty=true;
      return;
    }
    

    if(this.error.length==0){
      this.isTableEmpty=false;
      return;
    }

    this.error.map((data:any)=>{

      let cell:string="";
      data.errorCellList.map((data:any)=>{
        cell=cell+"    "+data
      })

      ELEMENT_DATA.push({
        rowError:data.rowNumber,
        cellError:cell
      })
    })
    this.dataSource=new MatTableDataSource(ELEMENT_DATA)
  }

}
