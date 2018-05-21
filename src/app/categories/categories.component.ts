import { Component, OnInit } from '@angular/core';

import { Category } from '../category';

import { CategoriesService } from '../categories.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
	categories: Category[] = [];
  constructor(
    private categoriesService: CategoriesService,
    private toastr: ToastrService) { }

  ngOnInit() {
  	this.getCategories();
  }

  getCategories(): void{
  	this.categoriesService.getCategories()
  	    .subscribe(categories => this.categories = categories);
  }

  removeCategory(categoryId: string): void{
    this.categoriesService.removeCategory(categoryId)
        .subscribe( () => {
          this.toastr.success("Category was removed succesfully", "Success");
          this.getCategories();
          });
  }

}
