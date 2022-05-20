import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { UsersComponent } from './modules/users/users.component';
import { ChartsComponent } from './modules/charts/charts.component';
import { StatutComponent } from './modules/statut/statut.component';
import { ProfilProcComponent } from './modules/profil-proc/profil-proc.component';
import { ScrumComponent } from './modules/scrum/scrum.component';
import { PrioriteComponent } from './modules/priorite/priorite.component';
import { PrdSpComponent } from './modules/prd-sp/prd-sp.component';
import { CouvertureComponent } from './modules/couverture/couverture.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: DefaultComponent,
  children:[
    { path:'dashboard',component:DashboardComponent},
    {path:'users', component:UsersComponent},
    {path:'charts', component:ChartsComponent},
    {path:'statut', component:StatutComponent},
    {path:'profilProc', component:ProfilProcComponent},
    {path:'scrum', component:ScrumComponent},
    {path:'priorite', component:PrioriteComponent},
    {path:'prdSp', component:PrdSpComponent},
    {path:'couverture', component:CouvertureComponent},
    {path:'',component:DashboardComponent}
  ],},

  {path:'admin', component:DefaultComponent,
  children:[
    { path:'dashboard',component:DashboardComponent},
    {path:'users', component:UsersComponent},
    {path:'charts', component:ChartsComponent},
    {path:'statut', component:StatutComponent},
    {path:'profilProc', component:ProfilProcComponent},
    {path:'scrum', component:ScrumComponent},
    {path:'priorite', component:PrioriteComponent},
    {path:'prdSp', component:PrdSpComponent},
    {path:'couverture', component:CouvertureComponent},
    {path:'',component:DashboardComponent}
  ]

  },
 
  { path: 'reset', component: ResetPasswordComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
