import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MapComponent} from './map/map.component';
import {QaComponent} from './qa/qa.component';
import {ProfileComponent} from './profile/profile.component';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {QuestionComponent} from './qa/question/question.component';
import { MutableProfileComponent } from './mutable-profile/mutable-profile.component';


const routes: Routes = [
  {path: '', redirectTo: 'map', pathMatch: 'full'},
  {path: 'map', component: MapComponent},
  {path: 'qa', component: QaComponent},
  {path: 'qa/:id', component: QuestionComponent},
  {path: 'profile/:username', component: ProfileComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'mutable-profile/:username', component: MutableProfileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
