import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistDashboardComponent } from './artistDashboard.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ArtistDashboardRoutingModule } from './artistDashboard.routing.module';
import { ArtistDashboardFormComponent } from './component/artistDashboardForm/artistDashboardForm.component';
import { UserService } from 'src/app/service/user-sevice/user.service';
import { IpService } from 'src/app/service/ip-service/ip.service';



@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule,
    MatSelectModule,
    MatPaginatorModule,
    HttpClientModule,
    NgbDropdownModule,
    ArtistDashboardRoutingModule
  ],
  declarations: [ArtistDashboardComponent,ArtistDashboardFormComponent],
  providers:[UserService,IpService]
})
export class ArtistDashboardModule { }
