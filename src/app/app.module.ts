import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CategoriesComponent } from './categories/categories.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { CategoryComponent } from './category/category.component';
import { TransactionComponent } from './transaction/transaction.component';
import { ReportComponent } from './report/report.component';
import { DbdReportComponent } from './dbd-report/dbd-report.component';
import { AuthComponent } from './auth/auth.component';

import { ToastrModule, ToastNoAnimation, ToastNoAnimationModule } from 'ngx-toastr';
import { ChartModule } from 'angular-highcharts';
import { StorageServiceModule } from "ngx-webstorage-service";

import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    TransactionsComponent,
    CategoryComponent,
    TransactionComponent,
    ReportComponent,
    DbdReportComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ToastNoAnimationModule,
    ToastrModule.forRoot({
      toastComponent: ToastNoAnimation,
    }),
    ChartModule,
    StorageServiceModule
  ],
  providers: [
    AuthService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
