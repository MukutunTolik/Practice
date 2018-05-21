import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoriesComponent } from './categories/categories.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { CategoryComponent } from './category/category.component';
import { TransactionComponent } from './transaction/transaction.component';
import { ReportComponent } from './report/report.component';
import { DbdReportComponent } from './dbd-report/dbd-report.component';
import { AuthComponent } from './auth/auth.component';

import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [
	{path: '', canActivate: [AuthGuardService], redirectTo: '/categories', pathMatch: 'full' },
	{path: 'auth', component: AuthComponent},
	{path: 'categories', component: CategoriesComponent, canActivate: [AuthGuardService] },
	{path: 'transactions', component: TransactionsComponent, canActivate: [AuthGuardService] },
	{path: 'category/:action', component: CategoryComponent, canActivate: [AuthGuardService] },
	{path: 'category/:action/:id', component: CategoryComponent, canActivate: [AuthGuardService] },
	{path: 'transaction/:action', component: TransactionComponent, canActivate: [AuthGuardService] },
	{path: 'transaction/:action/:id', component: TransactionComponent, canActivate: [AuthGuardService] },
	{path: 'report', component: ReportComponent, canActivate: [AuthGuardService] },
	{path: 'dbdreport', component: DbdReportComponent, canActivate: [AuthGuardService] }
];
@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule { }
