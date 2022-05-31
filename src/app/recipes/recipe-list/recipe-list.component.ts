import { Component, OnDestroy, OnInit,
  // Output, EventEmitter
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipeServiceService } from '../recipe-service.service';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  // @Output() eventRecipeEmmiter: EventEmitter<Recipe> = new EventEmitter<Recipe>()

  recipeList?: Recipe[]
  recipeSubscription?: Subscription

  // = [
  //   new Recipe('A Test Recipe 1', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg'),
  //   new Recipe('A Test Recipe 2', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg')
  // ];

  constructor(private recipeService: RecipeServiceService,
              private router: Router,
              private activatedRoute : ActivatedRoute) { }

  ngOnInit() {
    this.recipeList = this.recipeService.getRecipes()
    this.recipeSubscription = this.recipeService.recipeListener.subscribe((recipes: Recipe[]) =>{this.recipeList = recipes;})
  }

  newRecipe(){
    console.log(this.recipeService.getRecipes())
    this.router.navigate(['new'], {relativeTo: this.activatedRoute})
  }

  // recipeEmmiter(recipe: Recipe){
  //  this.eventRecipeEmmiter.emit(recipe)
  // }

  ngOnDestroy(): void {
      this.recipeSubscription?.unsubscribe()
  }
}
