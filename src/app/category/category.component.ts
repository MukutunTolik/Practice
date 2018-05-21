import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Category } from '../category';

import { CategoriesService } from '../categories.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  action: string;
  category: Category = new Category();
  constructor(
  	private route: ActivatedRoute,
  	private location: Location,
  	private categoriesService: CategoriesService,
  	private toastr: ToastrService ) { }

  ngOnInit() {
  	this.parseAction();
  }

  parseAction (): void{
  	this.action = this.route.snapshot.paramMap.get('action');
  	if(this.action == 'view')return this.getCategory();
  }

  getCategory (): void{
  	const id = this.route.snapshot.paramMap.get('id');
  	this.categoriesService.getCategory(id)
  	    .subscribe(category => this.category = category);
  }

  submit (category: Category): void{
  	if(category.name.length == 0){
  		this.toastr.error('Category name can not be empty', 'Something goes wrong!');
  		return;
  	}
    if(this.action == 'add')
    {
      this.categoriesService.addCategory(category)
        .subscribe(category => this.toastr.success('Category created successfully', 'Success!'));
      this.category = new Category();
    }

  	if(this.action == 'view')
      this.categoriesService.putCategory(category)
  	    .subscribe(category => this.toastr.success('Category saved successfully', 'Success!'));
  }

}
