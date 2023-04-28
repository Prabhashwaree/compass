import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDTO } from 'src/app/common/dto/userDTO';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL=environment.baseURL+"/auth";

  constructor(private http: HttpClient) {}

  public login(
    username: string ,
    password: string ,
    ipAddress: string
  ) {

    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify({ username: username, password: password ,ipAddress:ipAddress});
    return this.http.post(this.authURL+'/login', body, {
      headers: headers,
    });
  }

  public isLoginIn(){
    return localStorage.getItem("token");
  }

  public saveUser(userDTO: UserDTO) {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(userDTO);
    return this.http.post(this.authURL+ "/saveUser", body, {
      headers: headers,
    });
  }

  public logoutUser(id: number) {
    return this.http.post(this.authURL+ `/logout/${id}`, {
    });
  }
  

}
