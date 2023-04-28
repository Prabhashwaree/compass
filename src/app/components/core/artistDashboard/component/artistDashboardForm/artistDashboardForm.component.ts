import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { IpService } from 'src/app/service/ip-service/ip.service';
import { UserService } from 'src/app/service/user-sevice/user.service';
import { PageEvent } from '@angular/material/paginator';

export interface ArtistContentList {
  year: string;
  quarter: number;
  platform: string;
  revenue: number;
  artistName: string;
  assetTitle: string;
  revenueShare: string;
}

const ELEMENT_DATA: ArtistContentList[] = [];

@Component({
  selector: 'app-artistDashboardForm',
  templateUrl: './artistDashboardForm.component.html',
  styleUrls: ['./artistDashboardForm.component.scss'],
})
export class ArtistDashboardFormComponent implements OnInit {
  pageEvent!: PageEvent;
  pageIndex: number = 0;
  pageSize: number = 10;
  length!: number;

  vendor:string=String(localStorage.getItem("name"));

  year!: number;
  quarter!: number;
  platform!: string;

  userId!: number;
  reportId!: number;
  ip!: string;
  allYears: any[] = [];
  allPlatform: any[] = [
    { name: 'All', value: 0 },
    { name: 'Youtube', value: 1 },
    { name: 'Telco', value: 2 },
    { name: 'Streaming', value: 3 },
  ];

  selectedPlatform!: any;
  selectedQuarter!: any;
  selectedYear!: any;

  icon: string = 'thumb_up_alt';

  isRaisedHand: boolean = true;
  isReportEnable: boolean = true;

  FullRevenue: number = 0;

  displayedColumns: string[] = [
    'year',
    'quarter',
    'platform',
    'artistName',
    'assetTitle',
    'revenue',
    'revenueShare',
  ];
  dataSource = new MatTableDataSource<ArtistContentList>(ELEMENT_DATA);
  clickedRows = new Set<ArtistContentList>();

  constructor(private userService: UserService, private ipService: IpService) {}

  async ngOnInit() {
    await this.loadAllYears();

    this.selectedPlatform = this.allPlatform[0].value;
    this.selectedQuarter = 1;
    this.selectedYear = this.allYears[0].value;

    this.year = this.allYears[0].year;
    this.platform = '';
    this.quarter = 1;

    // this.getIp();
    this.userId = Number(localStorage.getItem('id'));
    this.ip = String( localStorage.getItem('ip'))

    await this.loadUserDataToTable(
      this.pageSize,
      this.pageIndex,
      this.userId,
      this.year,
      this.quarter,
      this.platform
    );

    await this.checkRaisedHand();


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

  // getIp() {
  //   this.ipService.getMyIp().subscribe((data: any) => {
  //     {
  //       this.ip = data.ip;
  //       console.log(data.ip);
  //     }
  //   });
  // }

  async checkRaisedHand(): Promise<any> {
    return new Promise<void>((resolve, reject) => {
      try {
        let resp = this.userService.checkRaisedHand(this.reportId);
        resp.subscribe((data: any) => {
          if (data.data == 1) {
            this.isRaisedHand = false;
            this.icon = 'thumb_up_alt';
          } else if (data.data == 2) {
            this.isRaisedHand = true;
            this.icon = 'pan_tool';
          } else if (data.data == 3) {
            this.isRaisedHand = true;
            this.icon = 'restore';
          } else {
            this.isRaisedHand = true;
            this.icon = 'done_outline';
          }
          resolve();
        });
      } catch (err) {
        console.log(err);
        reject();
      }
    });
  }

  raisedHand() {
    if (this.reportId == undefined) {
      return;
    }

    let resp = this.userService.changeReportStatus(this.reportId);
    resp.subscribe((data: any) => {
      alert(data.message);
      this.isRaisedHand = true;
      this.icon = 'pan_tool';
    });
  }

  async loadUserDataToTable(
    limit: number,
    offset: number,
    userId: number,
    year: number,
    quarter: number,
    platform: string
  ): Promise<any> {
    ELEMENT_DATA.length = 0;

    return new Promise<void>((resolve, reject) => {
      try {
        ELEMENT_DATA.length = 0;
        let resp = this.userService.getAllQuarterData(
          limit,
          offset,
          userId,
          year,
          quarter,
          platform
        );
        resp.subscribe(async (data: any) => {
          this.length = data.data.count;
          if (data.data.artistDataListResDTOs.length != 0) {
            this.isReportEnable = false;
            this.reportId = data.data.artistDataListResDTOs[0].reportId;
            this.getTotalRevenue();
            await this.checkRaisedHand();
          } else {
            this.isReportEnable = true;
            this.isRaisedHand = true;
            this.icon = 'thumb_up_alt';

            this.FullRevenue=0;
          }

          data.data.artistDataListResDTOs.map((value: any) => {
            ELEMENT_DATA.push({
              year: value.year,
              quarter: value.quarterNo,
              platform: value.platform,
              revenue: value.revenue,
              artistName: value.artist,
              assetTitle: value.assetTitle,
              revenueShare: value.revenueShare,
            });
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


  downloadPdf() {
    console.log(this.ip)
    let resp = this.userService.downloadPdf(this.reportId, this.ip);
    resp.subscribe((response: any) => {
      const file = new Blob([response], { type: 'application/pdf' });
      const downloadUrl = URL.createObjectURL(file);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download =this.vendor+"-Y"+this.year+"-Q"+this.quarter+"-"+new Date().toLocaleString();
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  async getServerData(event: PageEvent) {
    this.pageSize = event?.pageSize;
    this.loadUserDataToTable(
      event.pageSize,
      event.pageIndex * event.pageSize,
      this.userId,
      this.year,
      this.quarter,
      this.platform
    );
  }

  async onYearComboChangeStatus(value: number) {

    this.year = this.allYears[value].year;
    this.loadUserDataToTable(
      this.pageSize,
      this.pageIndex,
      this.userId,
      this.year,
      this.quarter,
      this.platform
    );
  }

  async onQuarterComboChangeStatus(value: number) {

    this.quarter = value;
    console.log(value);
    this.loadUserDataToTable(
      this.pageSize,
      this.pageIndex,
      this.userId,
      this.year,
      this.quarter,
      this.platform
    );
  }

  async onPlatformComboChangeStatus(value: number) {

    if (value == 0) {
      this.platform = '';
    } else {
      this.platform = this.allPlatform[value].name;
    }

    this.loadUserDataToTable(
      this.pageSize,
      this.pageIndex,
      this.userId,
      this.year,
      this.quarter,
      this.platform
    );
  }

  getTotalRevenue() {
    let resp = this.userService.getTotalRevenue(this.reportId);
    resp.subscribe((data: any) => {
      this.FullRevenue=data.data;
    });
  }
}
