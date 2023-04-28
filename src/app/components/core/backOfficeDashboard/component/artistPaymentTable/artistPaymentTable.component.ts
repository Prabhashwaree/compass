import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {ViewChild, ElementRef } from '@angular/core';
import { PaymentService } from 'src/app/service/payment-service/payment.service';
import { PageEvent } from '@angular/material/paginator';


export interface ArtistContentList {
  invoiceId: string;
  platform: string;
  revenue: number;
  checkDate:string;
  status:"";

}

const ELEMENT_DATA: ArtistContentList[] = [];


@Component({
  selector: 'app-artistPaymentTable',
  templateUrl: './artistPaymentTable.component.html',
  styleUrls: ['./artistPaymentTable.component.scss']
})
export class ArtistPaymentTableComponent implements OnInit {
  allPayment: any[]= [];
  panelOpenState = false;

  search:any="";

  pageEvent!: PageEvent;
  pageIndex: number = 0;
  pageSize: number = 10;
  length!: number;
  

  displayedColumns: string[] = ['invoiceId', 'platform', 'revenue', 'checkDate','status'];
  dataSource = new MatTableDataSource<ArtistContentList>(ELEMENT_DATA);
  clickedRows = new Set<ArtistContentList>();

  constructor(private paymentService :PaymentService) { }

  ngOnInit() {
    this.getAllPaymentHistory(this.pageSize,this.pageIndex,this.search);
  }

  changeColor(status:number){
    if(status==3){
      return 'orange';//prossecing
    }else if(status==4){
      return 'green';//complete
    }else if(status==2){
      return 'red';//pending
    }else{
      return '#rgb(216, 208, 208);';//not request
    }
  }

  changeIcon(status:number){
    if(status==3){
      return 'star_half';//prossecing
    }else if(status==4){
      return 'star';//complete
    }else if(status==2){
      return 'star_border';//pending
    }else{
      return 'error_outline';//not request
    }
  }

  getAllPaymentHistory(limit: number, offset: number, search: string){
    let res=this.paymentService.getAllPaymentHistory(limit,offset,search).
    subscribe((data:any)=>{
      this.length = data.data[0].count;
      this.allPayment = data.data;

    })

  }

  searchByKeyword(){
    this.getAllPaymentHistory(this.pageSize,this.pageIndex,this.search)
  }

  getServerData(event: PageEvent) {
    this.pageSize = event?.pageSize;
    this.getAllPaymentHistory(
      this.pageSize,
      this.pageIndex,
      this.search,
    );
  }

}
