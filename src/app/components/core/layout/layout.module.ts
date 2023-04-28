import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatTreeModule } from '@angular/material/tree';
import { MatExpansionModule } from '@angular/material/expansion';
import { LayoutRoutingModule } from './layout.routing.module';
import {MatMenuModule} from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
// import { PermissionService } from 'src/app/service/permission-service/permission.service';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    FlexLayoutModule,
    MatButtonModule,
    MatSidenavModule,
    MatDividerModule,
    MatTreeModule,
    MatExpansionModule,
    LayoutRoutingModule,
    MatMenuModule,
    MatFormFieldModule,
  ],
  declarations: [LayoutComponent],
  // providers:[PermissionService]
})
export class LayoutModule { }
