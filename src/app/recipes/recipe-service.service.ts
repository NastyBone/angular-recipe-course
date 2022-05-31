import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListServiceService } from '../shopping-list/shopping-list-service.service';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})

export class RecipeServiceService  {
  recipeListener: Subject<Recipe[]> = new Subject<Recipe[]>()


  recipes: Recipe[]  = [
    // new Recipe('A Test Recipe 1', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
    // [new Ingredient('test1', 2), new Ingredient ('test2',2)]),

    // new Recipe('A Test Recipe 2', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg', [new Ingredient('test3', 2), new Ingredient ('test4',2)])
  ];


putRecipes(recipes: Recipe[]){
  this.recipes = recipes;
  this.recipeListener.next(this.recipes.slice())

}

getRecipes(){
  return this.recipes.slice()

}

sendRecipes(ingredients?: Ingredient[]){
  this.shoppingListService.addManyIngredients(ingredients)
}

getRecipe(id: number){
  return this.recipes[id]
}

addRecipes(recipe: Recipe){
  this.recipes.push(new Recipe(recipe.name, recipe.description, recipe.imagePath, recipe.ingredients))
  this.recipeListener.next(this.recipes.slice())
}

updateRecipe(id: number, newRecipe: Recipe){
  this.recipes[id] = newRecipe
  this.recipeListener.next(this.recipes.slice())

}

deleteRecipe(id:number){
  this.recipes.splice(id,1);
  console.log(this.recipes)
  this.recipeListener.next(this.recipes.slice())

}
  constructor(private shoppingListService: ShoppingListServiceService) { }
}
