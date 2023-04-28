import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/core/login/login.component';
import { AuthGuardService } from './service/auth-guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    canActivate: [AuthGuardService],
    loadChildren: () =>
      import('./components/core/layout/layout.module').then(
        (m) => m.LayoutModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
