import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserItemComponent } from './user-item/user-item.component';
import { UserListComponent } from './user-list/user-list.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {ModalModule} from 'ngx-bootstrap/modal';
import{DataTablesModule} from 'angular-datatables';
import { AccessDeniedComponent } from './errors/access-denied/access-denied.component';
import {JwtInterceptor} from './_helpers/jwt.interceptor';
import { AuthGuardService } from './guards/auth-guard.service';


@NgModule({
  declarations: [
    AppComponent,
    UserItemComponent,
    UserListComponent,
    NavMenuComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AccessDeniedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    DataTablesModule
  ],
  providers: [
    AuthGuardService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
