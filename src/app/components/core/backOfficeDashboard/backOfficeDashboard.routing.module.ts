import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BackOfficeDashboardComponent } from './backOfficeDashboard.component';
import { ArtistPaymentTableComponent } from './component/artistPaymentTable/artistPaymentTable.component';
import { ArtistRegisterTableComponent } from './component/artistRegisterTable/artistRegisterTable.component';
import { ArtistReportFormComponent } from './component/artistReportForm/artistReportForm.component';
import { ArtistsRegisterFormComponent } from './component/artistsRegisterForm/artistsRegisterForm.component';
import { ArtistsReportsTableComponent } from './component/artistsReportsTable/artistsReportsTable.component';
import { BackOfficeDashboardFormComponent } from './component/backOfficeDashboardForm/backOfficeDashboardForm.component';
import { ReportUploadComponent } from './component/reportUpload/reportUpload.component';

const routes: Routes = [
  {  
    path: '',
    component: BackOfficeDashboardComponent,
    children: [
      { path: 'backOfficeForm', component: BackOfficeDashboardFormComponent },
      { path: 'artistRegisterForm', component: ArtistsRegisterFormComponent },
      { path: 'artistReportTable', component: ArtistsReportsTableComponent},
      { path: 'artistPaymentTable', component: ArtistPaymentTableComponent},
      { path: 'reportUpload', component: ReportUploadComponent},
      { path: 'artistReportForm', component: ArtistReportFormComponent},
      { path: 'artistRegisterTable', component: ArtistRegisterTableComponent},
    ],
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})


export class BackOfficeDashboardRoutingModule {}
