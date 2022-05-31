import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { RecipeServiceService } from './recipes/recipe-service.service';
import { Recipe } from './recipes/recipe.model';
import { HttpService } from './shared/http.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeResolveService implements Resolve<Recipe[]> {

  constructor(private http : HttpService,
              private recipeService: RecipeServiceService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {

    const recipes = this.recipeService.getRecipes()

    if (recipes.length === 0){

      return this.http.fetchData()

    } else {
      return recipes
    }

  }
}
