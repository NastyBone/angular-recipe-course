import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeServiceService } from '../recipes/recipe-service.service';
import { Recipe } from '../recipes/recipe.model';
import { exhaustMap, map, take, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient,
              private recipeService: RecipeServiceService,
              private auth: AuthService) {}

  sendData(){
    const recipes = this.recipeService.getRecipes();
    console.log(recipes)

    this.http.put('https://ng-please-cantv-dont-go-default-rtdb.firebaseio.com/recipes.json', recipes, {observe: 'response'}).pipe((
      map(recipes =>{

        (recipes.body as Array<Recipe>).map(recipe =>{
          if (!recipe.name) recipe.name = ''
          if (!recipe.description) recipe.description = ''
          if (!recipe.imagePath) recipe.imagePath = ''
          if (!recipe.ingredients) recipe.ingredients = []
        })

        return recipes
    }))
    ).subscribe(dataResponse =>{
      console.log(`STATUS: ${dataResponse.status}\n CONTENT:`)
      console.log(dataResponse.body)
    })


  }

  fetchData(){
      return this.http.get<Recipe[]>('https://ng-please-cantv-dont-go-default-rtdb.firebaseio.com/recipes.json')
    .pipe( tap(responseData =>{
      this.recipeService.putRecipes(responseData)
    }))

  }

}
