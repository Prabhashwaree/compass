import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArtistDashboardComponent } from './artistDashboard.component';
import { ArtistDashboardFormComponent } from './component/artistDashboardForm/artistDashboardForm.component';

const routes: Routes = [
  {  
    path: '',
    component: ArtistDashboardComponent,
    children: [
      { path: 'artistForm', component: ArtistDashboardFormComponent },
     
    ],
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class ArtistDashboardRoutingModule{

}
