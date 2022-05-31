import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListServiceService {
  ingredientChange: Subject<Ingredient[]> = new Subject<Ingredient[]>()
  editingShopListItem : Subject<number> = new Subject<number>()

  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  getIngredients(){
    return this.ingredients.slice()
  }

  getIngredient(id:number){
    return this.ingredients[id]
  }

  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient)
    this.ingredientChange.next(this.ingredients.slice())
  }

  addManyIngredients(ingredient :Ingredient[] = [new Ingredient('',NaN)]){
    this.ingredients = this.ingredients.concat(ingredient)
    this.ingredientChange.next(this.ingredients.slice())
  }

  updateIngredient(id:number, newIngredient:Ingredient){
    this.ingredients[id] = newIngredient;
    this.ingredientChange.next(this.ingredients.slice())

  }

  onDeleteItem(id:number){
    console.log(id)
    this.ingredients.splice(id,1)
    this.ingredientChange.next(this.ingredients.slice())

  }

  constructor() { }
}
