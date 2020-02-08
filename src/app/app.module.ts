import {BrowserModule} from '@angular/platform-browser';
import {NgModule, APP_INITIALIZER} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {ClarityModule} from '@clr/angular';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MapComponent} from './map/map.component';
import {ProfileComponent} from './profile/profile.component';
import {AngularYandexMapsModule} from 'angular8-yandex-maps';
import {environment} from 'src/environments/environment';
import {LoginComponent} from './login/login.component';
import {HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';
import {configurationFactory} from './util/hooks';
import {AccountService} from './services/account.service';
import {ReactiveFormsModule} from '@angular/forms';
import {JwtInterceptor} from "./util/jwt.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MapComponent,
    ProfileComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule,
    AngularYandexMapsModule.forRoot(environment.api_key),
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: configurationFactory,
      multi: true,
      deps: [HttpClient, AccountService]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],

  bootstrap: [AppComponent]
})
export class AppModule {
}
