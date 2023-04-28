import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth-service/auth.service';
import { DataTransferService } from 'src/app/service/data-transfer-service/data-transfer.service';
import { IpService } from 'src/app/service/ip-service/ip.service';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';

  ip!: string;

  loginForm!: FormGroup;
  submitted = false;

  constructor(private authService: AuthService,
    private dataTransferService:DataTransferService, private router: Router ,private ipService: IpService,private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.getIp();

    this.loginForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required,]),
     
    });
  }

  onSubmit(){
    this.submitted = true;

    if (this.loginForm.invalid) {
      console.log('form invalid');
      console.log(this.loginForm);
      return;
    }
    this.onLogin();
  }

  getIp(){
    this.ipService.getMyIp().subscribe((data:any)=>{{
      this.ip = data.ip;
      localStorage.setItem('ip', data.ip);
    }})
  }

  onLogin() {
    let resp = this.authService.login(this.username, this.password, this.ip);
    resp.subscribe((data: any) => {
      if(!(data.data==null)){
        localStorage.setItem('name', data.data.name);
        localStorage.setItem('id', data.data.id);
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('roleName', data.data.roleName);
        localStorage.setItem('loginId', data.data.loginId);
        this.router.navigate(['/home']);
        this.dataTransferService.setData(data.data);
        console.log('====================================');
        console.log(data);
        console.log('====================================');
      }else{
        alert(data.message)
      }
    
    });

  }

}
