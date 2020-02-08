import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapComponent } from './map/map.component';
import { QaComponent } from './qa/qa.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {path: '', redirectTo: 'map', pathMatch:  'full'},
  {path: 'map', component: MapComponent},
  {path: 'qa', component: QaComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
