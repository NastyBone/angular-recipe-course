import { Component, OnInit, Input,
 // Output, EventEmitter
 } from '@angular/core';
import { RecipeServiceService } from '../../recipe-service.service';
import { Recipe } from '../../recipe.model';
@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
  //providers: [RecipeServiceService]
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe?: Recipe
  @Input() index?: number
  constructor(private recipeService: RecipeServiceService) { }

  // @Output() contentEmmiter: EventEmitter<Recipe> = new EventEmitter<Recipe>()
  ngOnInit() {
  }

  test(){
    this.recipe = this.recipeService.getRecipe(this.index!)

  }

}
