import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseURL = environment.baseURL + '/artist';

constructor(private http: HttpClient) { 

}

public getAllQuarterData(limit: number, offset: number, userId: number, year:number, quarter:number,platform:string ) {
  let queryParams = new HttpParams();
  queryParams = queryParams.append('limit', limit);
  queryParams = queryParams.append('offset', offset);
  queryParams = queryParams.append('userId', userId);

  queryParams = queryParams.append('year', year);
  queryParams = queryParams.append('quarter', quarter);
  queryParams = queryParams.append('platform', platform);

  return this.http.get(this.baseURL + '/pagination/content', { params: queryParams });
}



  public downloadPdf(id: number,ip:string) {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify({ reportId: id, ipAddress: ip});

    return this.http.post(this.baseURL+'/create_pdf', body, {
      headers: headers, responseType: 'arraybuffer'
    });
  }

  public checkRaisedHand(reportId: number) {
    return this.http.get(this.baseURL+ `/check_raised_hand/${reportId}`, {
    });
  }

  public changeReportStatus(reportId: number) {
    return this.http.get(this.baseURL+ `/raised_hand/${reportId}`, {
    });
  }

  public getAllYears() {
    return this.http.get(this.baseURL+ '/all_years' 
    );
  }

  public getVenders() {
    return this.http.get(this.baseURL+ '/all_venders'
    );
  }

  public getTotalRevenue(id:number) {
    return this.http.get(this.baseURL+ `/total_revenue/${id}`
    );
  }

  public getAllArtist(limit: number, offset: number) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('limit', limit);
    queryParams = queryParams.append('offset', offset);
  
    return this.http.get(this.baseURL + '/all_artist', { params: queryParams });
  }

}

