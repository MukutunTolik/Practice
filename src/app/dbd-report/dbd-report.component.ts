import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';

import { Category } from '../category';
import { Transaction } from '../transaction';
import { Report } from '../report';

import { CategoriesService } from '../categories.service';
import { TransactionsService } from '../transactions.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dbd-report',
  templateUrl: './dbd-report.component.html',
  styleUrls: ['./dbd-report.component.css']
})
export class DbdReportComponent implements OnInit {
  isChartReady: boolean = false;
  report: Report = new Report();
  reportCategoriesData = [];
  categories: Category[];
  transactions: Transaction[];

  chart: Chart;

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
  	let reportCategoriesData = [];
  	this.transactions.forEach(transaction => {
  		if(reportData[transaction.date_created.toString()] === undefined)
  			reportData[transaction.date_created.toString()] = {
  				'date': transaction.date_created,
  				'y': transaction.total
  			};
  		else
  			reportData[transaction.date_created.toString()].y += transaction.total;
  	});
  	for(let key in reportData){
  		let date = new Date(reportData[key].date);
  		this.reportCategoriesData.push([
  			Date.UTC(date.getFullYear(),
  			         date.getUTCMonth() + 1,
  			         date.getUTCDate()),
  			reportData[key]['y']]);
  	}

  	this.chart = new Chart({
      title: {
        text: 'Chart of '+this.report.type+' for period'
      },
      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
            month: '%e. %b',
            year: '%b'
        },
        title: {
            text: 'Date'
        }
      },
      series: [{
      	name: this.getCategoryName(this.report.category),
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
  	if(this.report.category == null){
  		this.toastr.error("Category can not be empty", "Something wrong");
  		return;
  	}
  	this.getTransactions(this.report);
  }

  regenerateReport (): void{
  	this.report = new Report();
  	this.reportCategoriesData = [];
  	this.isChartReady = false;
  	this.transactions = [];
  }

}
