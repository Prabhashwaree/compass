import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackOfficeDashboardComponent } from './backOfficeDashboard.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BackOfficeDashboardRoutingModule } from './backOfficeDashboard.routing.module';
import { BackOfficeDashboardFormComponent } from './component/backOfficeDashboardForm/backOfficeDashboardForm.component';
import { ArtistsRegisterFormComponent } from './component/artistsRegisterForm/artistsRegisterForm.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import { NgbDropdownModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { ArtistsReportsTableComponent } from './component/artistsReportsTable/artistsReportsTable.component';
import { AuthService } from 'src/app/service/auth-service/auth.service';
import {MatRadioModule} from '@angular/material/radio';
import { ArtistPaymentTableComponent } from './component/artistPaymentTable/artistPaymentTable.component';
import { ReportUploadComponent } from './component/reportUpload/reportUpload.component';

import {A11yModule} from '@angular/cdk/a11y';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';
import { DeletePopupModule } from './component/reportUpload/delete-popup/delete-popup.module';
import { ReportDataService } from 'src/app/service/report-data-service/report-data.service';
import {TextFieldModule} from '@angular/cdk/text-field';
import { ArtistReportFormComponent } from './component/artistReportForm/artistReportForm.component';
import { JsonPipe } from '@angular/common';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/service/user-sevice/user.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 
import { PaymentService } from 'src/app/service/payment-service/payment.service';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDatepickerModule } from '@angular/material/datepicker';
import { NgFor } from '@angular/common';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { DonePopupComponent } from './component/artistsReportsTable/done-popup/done-popup.component';
import { DonePopupModule } from './component/artistsReportsTable/done-popup/done-popup.module';
import { ArtistRegisterTableComponent } from './component/artistRegisterTable/artistRegisterTable.component';
import { ResetPasswordModule } from './component/artistRegisterTable/resetPassword/resetPassword.module';



@NgModule({
  imports: [
    A11yModule,
    DragDropModule,
    PortalModule,
    ScrollingModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    PdfViewerModule,
    MatExpansionModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSelectModule,
    MatPaginatorModule,
    HttpClientModule,
    NgbDropdownModule,
    BackOfficeDashboardRoutingModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule,
    MatListModule,
    MatBottomSheetModule,
    MatDialogModule,
    DonePopupModule,
    DeletePopupModule,
    ResetPasswordModule,
    TextFieldModule,
    NgbTypeaheadModule,
    JsonPipe,
    NgbDatepickerModule,
    MatNativeDateModule,
    MatDatepickerModule,
    NgFor,
    NgbAlertModule



  ],
  declarations: [BackOfficeDashboardComponent,BackOfficeDashboardFormComponent,ArtistsRegisterFormComponent
  ,ArtistsReportsTableComponent,ArtistPaymentTableComponent,ReportUploadComponent,ArtistReportFormComponent,ArtistRegisterTableComponent],
  providers:[AuthService,ReportDataService, UserService,PaymentService]
})
export class BackOfficeDashboardModule { }
