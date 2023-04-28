import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { IpService } from 'src/app/service/ip-service/ip.service';
import { AuthService } from 'src/app/service/auth-service/auth.service';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers:[IpService,AuthService]
})
export class LoginModule { }
