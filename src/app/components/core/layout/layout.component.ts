import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth-service/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  userId!: number;
  loginId!: number;
  username: string = '';

  homeRoute!: string;

  artistMenu: any[] = [
    {
      name: 'Artist Management',
      icon: 'recent_actors',
      route: 'artistDashboard/artistForm',
    },
  ];

  backOfficeMenu: any[] = [
    {
      name: 'Backoffice',
      icon: 'card_travel',
      route: 'backOfficeDashboard/backOfficeForm',
    },
    {
      name: "Artist Register",
      icon: "group_add",
      route: "backOfficeDashboard/artistRegisterTable"
      // artistRegisterForm
    },
    {
      name: 'Artist Report',
      icon: 'library_books',
      route: 'backOfficeDashboard/artistReportTable',
    },
    {
      name: 'Report Upload',
      icon: 'cloud_download',
      route: 'backOfficeDashboard/reportUpload',
    },
    {
      name: 'Artist Payment',
      icon: 'money',
      route: 'backOfficeDashboard/artistPaymentTable',
    },
  ];

  panelOpenState = false;
  menus: any[] = [];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userId = Number(localStorage.getItem('id'));
    this.username = String(localStorage.getItem('name'));
    this.loginId = Number(localStorage.getItem('loginId'));
    // this.setAuthDetails();
    this.loadMenuList(this.userId);
  }

  loadMenuList(id: number) {
    let roleName = localStorage.getItem('roleName');

    if (roleName === 'Artist') {
      this.menus = this.artistMenu;
      this.homeRoute="home/artistDashboard/artistForm"
      this.router.navigate(['home/artistDashboard/artistForm']);
    } else if (roleName === 'Backoffice') {
      this.menus = this.backOfficeMenu;
      this.homeRoute="home/backOfficeDashboard/backOfficeForm"
      this.router.navigate(['home/backOfficeDashboard/backOfficeForm']);
    }

  }

  routeToHome() {
    this.router.navigate([this.homeRoute]);

  }

  // setAuthDetails(){
  //   this.username=this.username.name;
  // }

  logoutUser() {
    this.authService.logoutUser(this.loginId).subscribe((data: any) => {
      console.log(data);
      localStorage.clear();
    });
  }
}
