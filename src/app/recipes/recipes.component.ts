import { Component, OnInit } from '@angular/core';
//import { ActivatedRoute, Route } from '@angular/router';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit {
  actualRecipe?: Recipe

  constructor(
    //private recipeSerivce: RecipeServiceService
    ) { }

  ngOnInit() {
    // this.recipeSerivce.recipeEmitter.subscribe((recipe:Recipe) => {
    //   this.actualRecipe = recipe})
  }

  // eventRecipeListener(recipe:Recipe){
  //   this.actualRecipe = recipe
  // }

}
