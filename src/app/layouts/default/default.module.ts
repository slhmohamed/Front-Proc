
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from 'src/app/modules/users/users.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { TableComponent } from 'src/app/modules/dashboard/table/table.component';
import { MatMenuModule } from '@angular/material/menu';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { AgGridModule } from 'ag-grid-angular';
import { StatutComponent } from 'src/app/modules/statut/statut.component';
import { ChartsComponent } from 'src/app/modules/charts/charts.component';
import { ProfileComponent } from 'src/app/profile/profile.component';
import { ScrumComponent } from 'src/app/modules/scrum/scrum.component';
import { PrioriteComponent } from 'src/app/modules/priorite/priorite.component';
import { PrdSpComponent } from 'src/app/modules/prd-sp/prd-sp.component';
import { CouvertureComponent } from 'src/app/modules/couverture/couverture.component';
import { ProfilProcComponent } from 'src/app/modules/profil-proc/profil-proc.component';



@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    UsersComponent,
    TableComponent,
    ChartsComponent,
    StatutComponent,
    ProfilProcComponent,
    ScrumComponent,
    PrioriteComponent,
    PrdSpComponent,
    CouvertureComponent  
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDividerModule,
    FormsModule,
    MatCardModule,
    MatMenuModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatListModule,
    MatDialogModule,
    AgGridModule.withComponents([]),
    ],
  exports:[
   HeaderComponent
  ]

})

export class DefaultModule { }
