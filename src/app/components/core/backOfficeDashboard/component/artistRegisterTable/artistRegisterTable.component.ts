import { Component, OnInit } from '@angular/core';
import { ResetPasswordComponent } from './resetPassword/resetPassword.component';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DataTransferService } from 'src/app/service/data-transfer-service/data-transfer.service';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ReportDataService } from 'src/app/service/report-data-service/report-data.service';
import { UserService } from 'src/app/service/user-sevice/user.service';

export interface artistRegisterTable {
  venderName: string;
  username: string;
  email: string;
  contact: string;
  nIC: string;
  venderNo: string;
  alternativeName: string;
  address: string;
  status: '';
}

const ELEMENT_DATA: artistRegisterTable[] = [];

@Component({
  selector: 'app-artistRegisterTable',
  templateUrl: './artistRegisterTable.component.html',
  styleUrls: ['./artistRegisterTable.component.scss'],
})
export class ArtistRegisterTableComponent implements OnInit {
  displayedColumns: string[] = [
    'venderName',
    'username',
    'email',
    'contact',
    'nIC',
    'venderNo',
    'alternativeName',
    'address',
    'status',
  ];
  dataSource = new MatTableDataSource<artistRegisterTable>(ELEMENT_DATA);
  clickedRows = new Set<artistRegisterTable>();

  
  title = 'matDialog';
  dataFromDialog: any;


  constructor(
    private dataTransferService: DataTransferService,
    public dialog: MatDialog,
    private userService: UserService,
    private reportService: ReportDataService
  ) { }
  pageEvent!: PageEvent;
  pageIndex: number = 0;
  pageSize: number = 10;
  length!: number;

  ngOnInit() {
    this.loadAllArtistDataToTable(this.pageSize, this.pageIndex);
  }

  loadAllArtistDataToTable(limit: number, offset: number) {
    ELEMENT_DATA.length = 0;
    let resp = this.userService.getAllArtist(limit, offset);
    resp.subscribe((data: any) => {
      this.length=data.data.count;
      data.data.allRecordListResDTOs.map((artist: any) => {
        ELEMENT_DATA.push({
          venderName: artist.vendorName,
          username: artist.username,
          email: artist.email,
          contact: artist.contactNumber          ,
          nIC: artist.nic,
          venderNo: artist.vendorNo,
          alternativeName:artist.alternativeName,
          address:artist.address,
          status: '',
        });
      });
      this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    });
  }

  getServerData(event: PageEvent) {
    this.pageSize = event?.pageSize;
    this.loadAllArtistDataToTable(
      event.pageSize,
      event.pageIndex * event.pageSize
    );
  }

  openDialog(element:any): void {
    const ref: MatDialogRef<ResetPasswordComponent> = this.dialog.open(
      ResetPasswordComponent,
      {
        width: '420px',
        height: '195px',
        backdropClass: 'confirmDialogComponent',
        hasBackdrop: true,
      }
    );
    ref.afterClosed().subscribe(result => {
      if(result.clicked==="Ok"){
          this.resetPassword(element);
      }
     });
  }

  resetPassword(element:any){
    console.log(element);

    let resp = this.reportService.resetPassword(element.venderNo);
    resp.subscribe((data:any)=>{
      alert(data.message +"\n username :"+data.data.username +"\n password :"+data.data.password);
    })
  }
}
