import { Component, OnInit } from '@angular/core';

import { Transaction } from '../transaction';
import { Category } from '../category';

import { TransactionsService } from '../transactions.service';
import { CategoriesService } from '../categories.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  transactions: Transaction[] = [];
  categories: Category[] = [];

  constructor(
    private transactionsService: TransactionsService,
    private categoriesService: CategoriesService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.getCategories();
  	this.getTransactions();
  }

  getTransactions (): void{
  	this.transactionsService.getTransactions()
  	    .subscribe(transactions => this.transactions = transactions);
  }

  getCategories (): void{
    this.categoriesService.getCategories()
        .subscribe(categories => this.categories = categories);
  }

  getCategoryName (categoryId: string): string{
    if(this.categories === undefined)return "undefined";
    const category = this.categories.find(cat => cat._id === categoryId);
    return (category === undefined?"undefined":category.name);
  }

  removeTransaction(transactionId: string): void{
    this.transactionsService.removeTransaction(transactionId)
        .subscribe( () => {
          this.toastr.success("Transaction was removed succesfully", "Success");
          this.getTransactions();
          });
  }

  onFilterChanged(categoryId: string): void{
    if(categoryId === "all"){
      this.transactionsService.getTransactions()
        .subscribe(transactions => this.transactions = transactions);
        return;
    }
    this.transactionsService.getTransactions({'category': categoryId})
        .subscribe(transactions => this.transactions = transactions);
  }

}
