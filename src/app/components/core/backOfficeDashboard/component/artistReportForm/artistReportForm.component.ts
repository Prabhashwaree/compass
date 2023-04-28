import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { ViewChild } from '@angular/core';
import { NgbTypeahead, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { Subject, merge, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

import {
  NgbAlertModule,
  NgbDatepickerModule,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';
import { ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user-sevice/user.service';
import { ReportDataService } from 'src/app/service/report-data-service/report-data.service';
import { InvoiceDTO } from 'src/app/common/dto/invoiceDTO';
import { UserDTO } from 'src/app/common/dto/userDTO';
import { DateAdapter } from '@angular/material/core';

let states: any = [];

export interface Vendor {
  value: number;
  name: string;
}

@Component({
  selector: 'app-artistReportForm',
  templateUrl: './artistReportForm.component.html',
  styleUrls: ['./artistReportForm.component.scss'],
  styles: [
    `
      .form-control {
        width: 200px;
      }
    `,
  ],
})
export class ArtistReportFormComponent implements OnInit {
  invoiceForm!: FormGroup;
  submitted = false;

  allYears: any[] = [];

  selectedYear!: number;
  selectQuarter!: number;
  selectVendorNo!: string;
  invoiceId!: string;

  model: any;

  myControl = new FormControl<string | Vendor>('');
  options: Vendor[] = [];
  filteredOptions: Observable<Vendor[]> | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private reportService: ReportDataService,
    private dateAdapter: DateAdapter<Date>
  ) {}


    async ngOnInit() {

    this.invoiceForm = this.formBuilder.group({
      year: new FormControl(''),
      quarter: new FormControl(''),
      venderNo: new FormControl(''),
      invoiceId: new FormControl(''),
      issueDate: new FormControl(new Date()),
      chequeDate: new FormControl(new Date()),
      // startDate: new FormControl(new Date()),
      // endDate: new FormControl(new Date()),
      payment: new FormControl(''),
    });

    await this.loadAllYears();

    await this.getVenders();

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.options.slice();
      })
    );
  }

  async getVenders(): Promise<any> {
    return new Promise<void>((resolve, reject) => {
      try {
        let resp = this.userService.getVenders();
        resp.subscribe((data: any) => {
          data.data.map((vendor: any, index: any) => {
            this.options.push({ name: vendor, value: index });
          });
          resolve();
          states = data.data;
        });
      } catch (err) {
        console.log(err);
        reject();
      }
    });
  }
  saveInvoice() {
    let invoiceDTO = new InvoiceDTO();


    invoiceDTO.setInvoiceId(this.invoiceForm.controls['invoiceId'].value);
    invoiceDTO.setYear(this.selectedYear);
    invoiceDTO.setQuarter(this.selectQuarter);
    invoiceDTO.setVenderNo(this.selectVendorNo);
    invoiceDTO.setChequeDate(
      new Date( this.invoiceForm.controls['chequeDate'].value)
    );
    invoiceDTO.setIssueDate(
      new Date( this.invoiceForm.controls['issueDate'].value)
    );
    // invoiceDTO.setDatePeriod(
    //   this.invoiceForm.controls['startDate'].value.toLocaleDateString()+" - "+this.invoiceForm.controls['endDate'].value.toLocaleDateString()
    // );

    console.log(invoiceDTO);

    let resp = this.reportService.saveInvoice(invoiceDTO);
    resp.subscribe((data: any) => {
      alert(data.message);
    });

    this.clear();
  }

  onSubmit() {
    this.submitted = true;

    // if (this.invoiceForm.invalid) {
    //   console.log('form invalid');
    //   console.log(this.invoiceForm);
    //   return;
    // }
    // this.saveArtistRegister();

    console.log(this.invoiceForm);

    this.saveInvoice();
  }

  get f() {
    return this.invoiceForm.controls;
  }

  private _filter(name: string): Vendor[] {
    const filterValue = name.toLowerCase();

    return this.options.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
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

  clear() {
    this.myControl.setValue('0');
    this.invoiceForm.controls['invoiceId'].setValue('');
    this.invoiceForm.controls['payment'].setValue('');
    this.invoiceForm.controls['issueDate'].setValue(new Date());
    this.invoiceForm.controls['chequeDate'].setValue(new Date());
    this.invoiceForm.controls['startDate'].setValue(new Date());
    this.invoiceForm.controls['endDate'].setValue(new Date());
  }

  onYearComboChangeStatus(value: number) {
    this.selectedYear = this.allYears[value].year;
    
  }

  onQuarterComboChangeStatus(value: number) {
    this.selectQuarter = value;

  }

  issueDateChange(event: any) {
    console.log(event);
  }

  chequeDateChange(event: any) {
    console.log(event);
  }

  startDateChange(event: any) {
    console.log(event);
  }

  endDateChange(event: any) {
    console.log(event);
  }

  getVendorNo(data: Vendor) {
    this.selectVendorNo=data.name
    this.getQuarterWisePayment(this.selectedYear,this.selectQuarter,this.selectVendorNo)
  }

  displayFn(vendor: Vendor): string {
    return vendor && vendor.name ? vendor.name : '';
  }

  getQuarterWisePayment(year:number,quarter:number,vendorNo:string){
    let reps = this.reportService.getQuarterPayment(year,quarter,vendorNo);
    reps.subscribe((data:any)=>{
      console.log(data.data);
      console.log('====================================');
    this.invoiceForm.controls['payment'].setValue(data.data);
      
    })
  }
}
