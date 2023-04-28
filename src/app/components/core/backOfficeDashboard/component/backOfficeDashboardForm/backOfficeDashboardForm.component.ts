import { Component, OnInit } from '@angular/core';
import { ReportDataService } from 'src/app/service/report-data-service/report-data.service';

@Component({
  selector: 'app-backOfficeDashboardForm',
  templateUrl: './backOfficeDashboardForm.component.html',
  styleUrls: ['./backOfficeDashboardForm.component.scss']
})
export class BackOfficeDashboardFormComponent implements OnInit {

  artistCount:number=0;
  contentCount:number=0;
  invoiceCount:number=0;
  paymentCount:number=0;

  constructor(private reportService:ReportDataService) { }

  ngOnInit() {
    this.loadAllArtist();
    this.loadAllContent();
    this.loadAllInvoice();
    this.loadAllPayments();

  }

  loadAllPayments() {
   let resp = this.reportService.getAllTransactionCount();
   resp.subscribe((data:any)=>{
    this.paymentCount = data.data;
   })
  }

  loadAllInvoice() {
    let resp = this.reportService.getAllInvoiceCount();
    resp.subscribe((data:any)=>{
     this.invoiceCount = data.data;
    })
  }

  loadAllContent() {
    let resp = this.reportService.getAllContentCount();
    resp.subscribe((data:any)=>{
     this.contentCount = data.data;
    })
  }

  loadAllArtist() {
    let resp = this.reportService.getAllArtistCount();
    resp.subscribe((data:any)=>{
     this.artistCount = data.data;
    })
  }

}
