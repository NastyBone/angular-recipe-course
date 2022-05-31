import { Component, OnDestroy, OnInit,
  //ViewChild
 } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListServiceService } from './shopping-list-service.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: []
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  shoppingListSubscription?: Subscription
  ingredients ?: Ingredient[]
  // = [
  //   new Ingredient('Apples', 5),
  //   new Ingredient('Tomatoes', 10),
  // ];

  constructor(private shoppingListService: ShoppingListServiceService) { }


  editItem(id:number){
    this.shoppingListService.editingShopListItem.next(id);
  }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients()
    this.shoppingListSubscription =  this.shoppingListService.ingredientChange.subscribe((ingredients: Ingredient[]) => this.ingredients = ingredients)
    }

    ngOnDestroy(): void {
        this.shoppingListSubscription?.unsubscribe()
    }



}
