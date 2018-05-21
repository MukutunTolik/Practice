import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';

import { Category } from '../category';
import { Transaction } from '../transaction';
import { Report } from '../report';

import { CategoriesService } from '../categories.service';
import { TransactionsService } from '../transactions.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  isChartReady: boolean = false;
  report: Report = new Report();
  reportCategoriesData = [];
  reportTotalSum: number = 0;
  categories: Category[];
  transactions: Transaction[];

  chart = new Chart({
      chart: {
        type: 'line'
      },
      title: {
        text: 'Linechart'
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'Line 1',
        data: [1, 2, 3]
      }]
  });

  constructor(
  	private categoriesService: CategoriesService,
  	private transactionsService: TransactionsService,
  	private toastr: ToastrService) { }

  ngOnInit() {
  	this.getCategories();
  }

  getCategories (): void{
  	this.categoriesService.getCategories()
  	    .subscribe(categories => this.categories = categories);
  }

  getTransactions (report: Report): void{
  	this.transactionsService.getTransactions(report)
  	    .subscribe(transactions => {
  	    	this.transactions = transactions
  	    	this.generateReport();
  	    });
  }

  generateReport (): void{
  	let reportData = {};
  	let sum = 0;
  	this.transactions.forEach(transaction => {
  		this.reportTotalSum += transaction.total;
  		if(reportData[transaction.category] === undefined)
  			reportData[transaction.category] = {
  				'name': this.getCategoryName(transaction.category),
  				'y': transaction.total
  			};
  		else
  			reportData[transaction.category].y += transaction.total;
  	});
  	for(let key in reportData){
  		reportData[key].y = (reportData[key].y/this.reportTotalSum)*100;
  		this.reportCategoriesData.push(reportData[key]);
  	}
  	this.chart = new Chart({
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Chart of '+this.report.type+' by categories till period'
      },
      tooltip: {
        pointFormat: '{point.name}: <b>{point.percentage:.2f}%</b>'
      },
      credits: {
        enabled: false
      },
      series: [{
      	name: 'Categories',
      	data: this.reportCategoriesData
      }]
    });
    this.isChartReady = true;
  	this.toastr.success("Report generated", "Success");
  }

  getCategoryName (categoryId: string): string{
  	let category = this.categories.find(category => category._id == categoryId);
  	if(category == null)return "undefined";
  	else return category.name;
  }

  submit (): void{
  	if(this.report.date_created_from > this.report.date_created_till){
  		this.toastr.error("'Date from' can not be more then 'date till'", "Something wrong");
  		return;
  	}
  	this.getTransactions(this.report);
  }

  regenerateReport (): void{
  	this.report = new Report();
  	this.reportCategoriesData = [];
  	this.reportTotalSum = 0;
  	this.isChartReady = false;
  	this.transactions = [];
  }

}
