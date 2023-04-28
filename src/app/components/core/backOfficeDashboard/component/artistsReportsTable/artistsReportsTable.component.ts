import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DataTransferService } from 'src/app/service/data-transfer-service/data-transfer.service';
import { ViewChild, ElementRef } from '@angular/core';
import { ReportDataService } from 'src/app/service/report-data-service/report-data.service';
import { UserService } from 'src/app/service/user-sevice/user.service';
import { PageEvent } from '@angular/material/paginator';
import { NgFor } from '@angular/common';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { DonePopupComponent } from './done-popup/done-popup.component';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';



export interface ArtistContentList {
  reportId:number;
  venderId: string;
  year: string;
  quarter: number;
  invoiceId: string;
  artistName: string;
  // datePeriod: string;
  checkDate: string;
  revenue:number;
  paymentStatus: '';
}

const ELEMENT_DATA: ArtistContentList[] = [];

const ArtistReport: any = [];

@Component({
  selector: 'app-artistsReportsTable',
  templateUrl: './artistsReportsTable.component.html',
  styleUrls: ['./artistsReportsTable.component.scss'],
})
export class ArtistsReportsTableComponent implements OnInit {

  title = 'matDialog';
  dataFromDialog: any;

  panelOpenState = false;

  pageEvent!: PageEvent;
  pageIndex: number = 0;
  pageSize: number = 10;
  length!: number;

  selectedYear!: any;
  selectedQuarter!: any;

  year: string = '';
  quarter: string = '';
  search: string = '';

  allYears: any[] = [];


  message!:string;
  status!:boolean;

  displayedColumns: string[] = [
    'venderId',
    'year',
    'quarter',
    'artistName',
    'revenue',
    'invoiceId',
    // 'datePeriod',
    'checkDate',
    'paymentStatus',
  ];
  dataSource = new MatTableDataSource<ArtistContentList>(ELEMENT_DATA);
  clickedRows = new Set<ArtistContentList>();

  constructor(
    private dataTransferService: DataTransferService,
    private reportService: ReportDataService,
    private userService: UserService,
    public dialog: MatDialog
  ) {
  }

  async ngOnInit() {
    await this.loadAllYears();

    this.loadReportDataToTable(
      this.pageSize,
      this.pageIndex,
      this.year,
      this.quarter,
      this.search
    );
  }

  async loadReportDataToTable(
    limit: number,
    offset: number,
    year: string,
    quarter: string,
    search: string
  ): Promise<any> {
    ELEMENT_DATA.length = 0;
    return new Promise<void>((resolve, reject) => {
      try {
        let resp = this.reportService.getAllQuarterReport(
          limit,
          offset,
          year,
          quarter,
          search
        );
        resp.subscribe((data: any) => {

          this.length = data.data.count;
          data.data.dataListResDTOs.map((report: any) => {
            if (report.invoiceId == null) {
              ELEMENT_DATA.push({
                reportId:report.reportId,
                venderId: report.venderNo,
                year: report.year,
                quarter: report.quarter,
                invoiceId: ' - ',
                artistName: report.artist,
                // datePeriod: ' - ',
                checkDate: ' - ',
                paymentStatus: report.status,
                revenue:report.revenue
              });
              
            } else {
              ELEMENT_DATA.push({
                reportId:report.reportId,
                venderId: report.venderNo,
                year: report.year,
                quarter: report.quarter,
                invoiceId: report.invoiceId,
                artistName: report.artist,
                // datePeriod: report.datePeriod,
                checkDate: report.chequeDate,
                paymentStatus: report.status,
                revenue:report.revenue
              });
            }
          });
          this.dataSource = new MatTableDataSource(ELEMENT_DATA);
          resolve();
        });
      } catch (err) {
        console.log(err);
        reject();
      }
    });

   
  }

  async loadAllYears(): Promise<any> {
    return new Promise<void>((resolve, reject) => {
      try {
        let resp = this.userService.getAllYears();
        resp.subscribe((data: any) => {
          data.data.map((year: any, index: number) => {
            this.allYears.push({
              year: year,
              value: index,
            });
          });
          resolve();
        });
      } catch (err) {
        console.log(err);
        reject();
      }
    });
  }

  searchByKeyword() {
    ELEMENT_DATA.length = 0;

    this.loadReportDataToTable(
      this.pageSize,
      this.pageIndex,
      this.year,
      this.quarter,
      this.search
    );
  }

  onYearComboChangeStatus(value: any) {
    if (value == 'all') {
      this.year = '';
    } else {
      this.year = this.allYears[value].year;
    }
    console.log(value);

    this.loadReportDataToTable(
      this.pageSize,
      this.pageIndex,
      this.year,
      this.quarter,
      this.search
    );
  }

  onQuarterComboChangeStatus(value: string) {
    console.log(value);
    if (value == 'all') {
      this.quarter = '';
    } else {
      this.quarter = value;
    }

    this.loadReportDataToTable(
      this.pageSize,
      this.pageIndex,
      this.year,
      this.quarter,
      this.search
    );
  }
  getServerData(event: PageEvent) {
    this.pageSize = event?.pageSize;
    this.loadReportDataToTable(
      event.pageSize,
      event.pageIndex * event.pageSize,
      this.year,
      this.quarter,
      this.search
    );
  }


  openDialog(element:any): void {
    if(element.paymentStatus==3){
      this.message = 'Are you sure, You want done this payment?'
      this.status = false;
    }else{
      this.message = 'You cant change pending transactions'
      this.status = true;

    }

    const ref: MatDialogRef<DonePopupComponent> = this.dialog.open(
      DonePopupComponent,
      {
        width: '420px',
        height: '195px',
        data: {
          message:this.message,
          status:this.status
        },
        backdropClass: 'confirmDialogComponent',
        hasBackdrop: true,
      }
    );
    ref.afterClosed().subscribe(result => {
      if(result.clicked==="Ok"){
          this.completeTransaction(element.reportId);
      }else{
          this.reloadPreviousRecord(element);
      }
     });
  }


  completeTransaction(id:number) {
    let resp = this.reportService.completeTransaction(id);
    resp.subscribe((data:any)=>{
      alert(data.message);
      this.clearTableData(id);
    })
  }

  clearTableData(id: number) {
    const index = ELEMENT_DATA.findIndex(
      (o: ArtistContentList) => o.reportId == id
    );
    if (index > -1) {
      ELEMENT_DATA.splice(index, 1);
    }
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }

  reloadPreviousRecord(report: any) {

    const index = ELEMENT_DATA.findIndex(
      (o: ArtistContentList) => o.reportId == report.reportId
    );
    if (index > -1) {
      ELEMENT_DATA.splice(index, 1);
    }

    ELEMENT_DATA.splice(index,0,{
      reportId:report.reportId,
      venderId: report.venderId,
      year: report.year,
      quarter: report.quarter,
      invoiceId: report.invoiceId,
      artistName: report.artistName,
      // datePeriod: report.datePeriod,
      checkDate: report.checkDate,
      paymentStatus: report.paymentStatus,
      revenue:report.revenue
    });

    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }
}
