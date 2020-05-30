import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { ClarityModule } from '@clr/angular';
import {isNotNullOrUndefined} from 'codelyzer/util/isNotNullOrUndefined';
import {ChartsModule} from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

function getToken(): string {
  let uToken = '';
  if (!!localStorage.getItem('token')) {
    uToken = isNotNullOrUndefined(localStorage.getItem('token')) ? localStorage.getItem('token') : '';
  } else if (!!sessionStorage.getItem('token')) {
    uToken = isNotNullOrUndefined(sessionStorage.getItem('token')) ? sessionStorage.getItem('token') : '';
  }
  return uToken;
}

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        NotFoundComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ClarityModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: getToken,
                whitelistedDomains: [''],
                blacklistedRoutes: ['']
            }
        }),
        ChartsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
