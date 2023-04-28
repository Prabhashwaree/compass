import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,   
    children: [
      {
        path: 'artistDashboard',
        loadChildren: () =>
          import('../../core/artistDashboard/artistDashboard.module').then((m) => m.ArtistDashboardModule,
          ) 
      },
      {
        path: 'backOfficeDashboard',
        loadChildren: () =>
          import('../../core/backOfficeDashboard/backOfficeDashboard.module').then((m) => m.BackOfficeDashboardModule,
          )
      },
    ],

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule { }
