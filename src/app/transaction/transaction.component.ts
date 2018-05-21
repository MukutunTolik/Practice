import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Category } from '../category';
import { Transaction } from '../transaction';

import { CategoriesService } from '../categories.service';
import { TransactionsService } from '../transactions.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  action: string;
  categories: Category[];
  transaction: Transaction = new Transaction();
  constructor(
  	private categoriesService: CategoriesService,
  	private transactionsService: TransactionsService,
  	private toastr: ToastrService,
  	private route: ActivatedRoute,
  	private location: Location) { }

  ngOnInit() {
  	this.parseAction();
  	this.getCategories();
  }

  parseAction (): void{
  	this.action = this.route.snapshot.paramMap.get('action');
  	if(this.action == 'view')return this.getTransaction();
  }

  getCategories (): void{
  	this.categoriesService.getCategories()
  	    .subscribe(categories => this.categories = categories);
  }

  getTransaction (): void{
  	const id = this.route.snapshot.paramMap.get('id');
  	this.transactionsService.getTransaction(id)
  	    .subscribe(transaction => this.transaction = transaction);
  }

  submit (transaction: Transaction): void{
  	if(transaction.category.length == 0){
  		this.toastr.error('Category is wrong', 'Something goes wrong!');
  		return;
  	}
  	if(transaction.total <= 0){
  		this.toastr.error('Total can not be zero or less', 'Something goes wrong!');
  		return;  		
  	}
    if(this.action == 'add')
    {
      if(!transaction.date_created)transaction.date_created = new Date();
      
      this.transactionsService.addTransaction(transaction)
        .subscribe(transaction => this.toastr.success('Transaction created successfully', 'Success!'));
      this.transaction = new Transaction();
    }

  	if(this.action == 'view')
      this.transactionsService.putTransaction(transaction)
  	    .subscribe(transaction => this.toastr.success('Transaction saved successfully', 'Success!'));
  }

}
