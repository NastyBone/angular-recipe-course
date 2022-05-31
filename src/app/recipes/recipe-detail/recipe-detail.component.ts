import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { RecipeServiceService } from '../recipe-service.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
  //providers: [RecipeServiceService]
})
export class RecipeDetailComponent implements OnInit {

  displayRecipe?: Recipe
  id!: number

  constructor(private recipeService: RecipeServiceService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params:Params) => {
      this.id = +params['id']
      this.displayRecipe = this.recipeService.getRecipe(this.id!)})


  }

  addToShoppingList(ingredients?: Ingredient[]){
    this.recipeService.sendRecipes(ingredients)
  }

  editRecipe(){
    this.router.navigate(['edit'], {relativeTo: this.activatedRoute})
  }

  deleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/'])
  }
}
