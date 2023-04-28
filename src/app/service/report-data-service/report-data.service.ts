import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InvoiceDTO } from 'src/app/common/dto/invoiceDTO';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReportDataService {
  baseUrl = environment.baseURL + '/backOffice';

  constructor(private http: HttpClient) {}

  public verifyUpload(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(this.baseUrl + '/verify_upload', formData);
  }

  public saveExcelSheet(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(this.baseUrl + '/upload_excel', formData);
  }

  public getAllQuarterReport(
    limit: number,
    offset: number,
    year: string,
    quarter: string,
    search: string
  ) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('limit', limit);
    queryParams = queryParams.append('offset', offset);
    queryParams = queryParams.append('year', year);
    queryParams = queryParams.append('quarter', quarter);
    queryParams = queryParams.append('search', search);

    return this.http.get(this.baseUrl + '/pagination/report', {
      params: queryParams,
    });
  }

  public saveInvoice(invoiceDTO: InvoiceDTO) {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(invoiceDTO);
    return this.http.post(this.baseUrl + '/save_invoice', body, {
      headers: headers,
    });
  }

  public getAllArtistCount() {
    return this.http.get(this.baseUrl + '/artist_count');
  }

  public getAllContentCount() {
    return this.http.get(this.baseUrl + '/content_count');
  }

  public getAllInvoiceCount() {
    return this.http.get(this.baseUrl + '/invoice_count');
  }

  public getAllTransactionCount() {
    return this.http.get(this.baseUrl + '/transaction_count');
  }
  
  public completeTransaction(reportId:number) {
    return this.http.get(this.baseUrl + `/payment_status/${reportId}`);
  }

  public getQuarterPayment(
    year: number,
    quarter: number,
    vendorNo: string
  ) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('year', year);
    queryParams = queryParams.append('quarter', quarter);
    queryParams = queryParams.append('vendorNo', vendorNo);

    return this.http.get(this.baseUrl + '/quarter_payment', {
      params: queryParams,
    });
  }

  public resetPassword(sapNo:string) {
    return this.http.get(this.baseUrl + `/reset_password/${sapNo}`);
  }
}
