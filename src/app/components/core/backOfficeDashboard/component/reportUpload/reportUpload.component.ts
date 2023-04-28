import { Component, OnInit, ElementRef } from '@angular/core';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import * as XLSX from 'xlsx';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { DeletePopupComponent } from './delete-popup/delete-popup.component';
import { ReportDataService } from 'src/app/service/report-data-service/report-data.service';
import { ActivatedRoute, Router } from '@angular/router';

// import { UploadService } from '../services/upload.service';


// AOA : array of array
type AOA = any[][];

@Component({
  selector: 'app-reportUpload',
  templateUrl: './reportUpload.component.html',
  styleUrls: ['./reportUpload.component.scss']
})
export class ReportUploadComponent implements OnInit {

  selectedFiles!: FileList;

  title = 'matDialog';
  dataFromDialog: any;
  message: string = '';
  error:any;
  color:string= ''




  constructor(private el: ElementRef, private _formBuilder: FormBuilder, public dialog: MatDialog, private reportDataService:ReportDataService,private router:Router) { }
  isMaxSelect = false;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  currentPage = 0;
  isEmptyDrop = true;
  isExcelDrop = true;
  isRadioChecked = false;
  
  // toppings = new FormControl();
  // toppingList: string[] = [
  //   'Test',
  //   'demo',
  //   'Interview purpose',
    
  // ];

  // states: string[] = [
  //   'DELHI ',
  //   'HARYANA',
    
  // ];

  email = new FormControl('', [Validators.required, Validators.email]);

  /**
   * sheet.js
   */
  origExcelData: AOA = [
    ['Data: 2018/10/26'],
    ['Data: 2018/10/26'],
    ['Data: 2018/10/26'],
  ];
  refExcelData!: Array<any>;
  excelFirstRow = [];
  excelDataEncodeToJson:any
  excelTransformNum:any[] = [];

  /** Default  excel file-name */
  sheetJsExcelName = 'null.xlsx';

  /* excel sheet.js */
  sheetCellRange:any;
  sheetMaxRow:any;
  localwSheet:any;
  localWorkBook:any;
  localPDF:any;
  sheetNameForTab: Array<string> = ['excel tab 1', 'excel tab 2'];
  totalPage = this.sheetNameForTab.length;
  selectDefault:any;
  sheetBufferRender:any;

  pdfFile:any;
  pdfSrc:any;
  pdfBufferRender:any;

  inputExcelOnClick(evt:any) {
    const target: any = evt.target || "";
    if (target.files.length === 0) {
      throw new Error("error66");
    }
    if (target.files.length > 1) {
      throw new Error('Cannot use multiple files');
    }
    this.sheetJsExcelName = evt.target.files.item(0).name;
    const reader: FileReader = new FileReader();
    this.readerExcel(reader);
    reader.readAsArrayBuffer(target.files[0]);
    this.sheetBufferRender = target.files[0];
    this.isEmptyDrop = false;
    this.isExcelDrop = true;
  }


  async openDialog( ) {  
    
    await this.verifyExlSheet();

    const ref: MatDialogRef<DeletePopupComponent> = this.dialog.open(
      DeletePopupComponent,
      {

        width: '550px',
        height: '395px',
        data: {
          error:this.error,
          message:this.message,
          color:this.color
        },
        backdropClass: 'confirmDialogComponent',
        hasBackdrop: true,
      }
    );
    
    
    ref.afterClosed().subscribe(result => {
      if(result.clicked=="Ok"){
        const file = this.sheetBufferRender;
        this.router.navigate(['home/backOfficeDashboard/reportUpload']);


        let resp = this.reportDataService.saveExcelSheet(file!);
        resp.subscribe((data:any)=>{
          alert(data.message);
        })
      }
    });   
   
  }

  async verifyExlSheet(): Promise<any>{
    return new Promise<void>((resolve, reject) => {
      try {
        const file = this.sheetBufferRender;

        if(file==undefined){
            return;
        }
      
        let resp = this.reportDataService.verifyUpload(file!).subscribe((data:any)=>{
          console.log('====================================');
          console.log(data);
          console.log('====================================');
          if(data.code==200){
              if(data.data.length==0){
                this.error=data.data;
                this.message = "Excel sheet verification completed successfully";
                this.color="green";
              }else{
                this.error=data.data;
                this.message = "You have an excel sheet error";
                this.color="red";
              }
          }else{
            this.error=data.data;
            this.message = "Verification failed,Cant convert this excel sheet";
            this.color="red";
          }
        resolve();
        }); 
      } catch (err) {
        console.log(err);
        reject();
      }
    });
  }



  /**excel ,from DragDropDirective , TODO: <ng-template>
   *  DragDropDirective drop event, .
   *  excel {readAsArrayBuffer}
   */
  dropExcelOnChance(targetInput:any) {
    this.sheetJsExcelName = targetInput[0].name;
    if (targetInput.length !== 1) {
      throw new Error('Cannot use multiple files');
    
    }
    const reader: FileReader = new FileReader();
    this.readerExcel(reader);
    reader.readAsArrayBuffer(targetInput[0]);
    this.sheetBufferRender = targetInput[0];
    this.isEmptyDrop = false;
    this.isExcelDrop = true;
  }

  dropExcelBlock(fileList: any) {
    if (fileList.length === 0) {
      return;
    } else {
      this.isExcelDrop = false;
      throw new Error('error drop excel block');
      
    }
  }

  
  loadSheetOnTabClick(index: number) {
    this.currentPage = index;

    if (this.localWorkBook === undefined) {
      throw new Error('err');
      return;
    }
    /* onload from this.localWorkBook, reReader from this.sheetBufferRender*/
    const reader: FileReader = new FileReader();
    this.readerExcel(reader, index);
    reader.readAsArrayBuffer(this.sheetBufferRender);
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }
// AWS Upload
//   upload() {
// 
// this.uploadService.uploadFile(file);
// }

selectFile(event:any) {

this.selectedFiles = event.target.files;



}

// AWS Upload ends here
  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' : this.email.hasError('email') ? 'Not a valid email' : '';
  }

  onClickRadioExcel() {
    if (this.localWorkBook === undefined) {
      throw new Error('error');
      return;
    }
    this.isExcelDrop = true;
    this.isEmptyDrop = false;
  }


  consoleHeight(evt:any) {
    if (evt.panel.nativeElement.clientHeight >= 255) {
      this.isMaxSelect = true;
    } else {
      this.isMaxSelect = false;
    }
  }

  transform(value:any) :any{
    return (value >= 26 ? this.transform(((value / 26) >> 0) - 1) : '') + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[value % 26 >> 0];
  }

  readerExcel(reader:any, index = 0) {
    /* reset array */
    this.origExcelData = [];
    reader.onload = (e: any) => {
      const data: string = e.target.result;
      const wBook: XLSX.WorkBook = XLSX.read(data, { type: 'array' });
      this.localWorkBook = wBook;
      const wsname: string = wBook.SheetNames[index];
      this.sheetNameForTab = wBook.SheetNames;
      this.totalPage = this.sheetNameForTab.length;
      this.selectDefault = this.sheetNameForTab[index];
      const wSheet: XLSX.WorkSheet = wBook.Sheets[wsname];
      this.localwSheet = wSheet;
      this.sheetCellRange = XLSX.utils.decode_range(wSheet['!ref'] || "");
      this.sheetMaxRow = this.sheetCellRange.e.r;
      this.origExcelData = <AOA>XLSX.utils.sheet_to_json(wSheet, {
        header: 1,
        range: wSheet['!ref'],
        raw: true,
      });
      this.refExcelData = this.origExcelData.slice(1).map(value => Object.assign([], value));
      /*  range  */
      this.excelTransformNum = [];
      for (let idx = 0; idx <= this.sheetCellRange.e.c; idx++) {
        this.excelTransformNum[idx] = this.transform(idx);
      }
      /*  order  */
      this.refExcelData.map(x => x.unshift('#'));
      this.excelTransformNum.unshift('order');
      /* JSON */
      this.excelDataEncodeToJson = this.refExcelData.slice(0).map(item =>
        item.reduce((obj:any, val:any, i:any) => {
          obj[this.excelTransformNum[i]] = val;
          return obj;
        }, {}),
      );
    };
  }

}
