import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CustomHttpInterceptorService {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // request = request.clone({headers: request.headers.set('Authorization', 'Basic MjpvMDZuSFZCSnlnTUdMRmNiR0YvV25kTGNheHM9')});
    // request = request.clone({headers: request.headers.set('platform', 'web')});
   
    if(localStorage.getItem('token')){
        request = request.clone({headers: request.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token')!)});
    }
    // console.log('====================================');
    // console.log(request.headers);
    // console.log('====================================');
    return next.handle(request);
  }

constructor() { }

}
