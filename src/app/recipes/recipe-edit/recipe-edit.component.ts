import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeServiceService } from '../recipe-service.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  @Input() id: number = 0;
  editMode : boolean = false
  recipeForm!: FormGroup

  constructor(private activatedRoute : ActivatedRoute,
              private recipeService: RecipeServiceService,
              private route: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params : Params) =>{
      this.id = params['id'];
      this.editMode = params['id'] != null;
      console.log(this.editMode)
      this.initForm()
    })

  }

  private initForm(){
    let recipeName = ''
    let recipePath = ''
    let recipeDescription = ''
    let recipeIngredients = new FormArray([])

    if(this.editMode){
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name
      recipePath = recipe.imagePath
      recipeDescription = recipe.description
      if (recipe.ingredients){
        for (let ingredient of recipe.ingredients){
          recipeIngredients.push(new FormGroup({
            "name": new FormControl(ingredient.name, Validators.required) ,
            "amount": new FormControl(ingredient.amount, [Validators.required,
                                                          Validators.pattern(/^[1-9]+[0-9]*$/)])}))
        }
      }
    }
    this.recipeForm = new FormGroup({
      "name": new FormControl(recipeName, Validators.required),
      "imagePath": new FormControl(recipePath, Validators.required),
      "description": new FormControl(recipeDescription, Validators.required),
      "ingredients": recipeIngredients
    })

  }

  addIngredientEdit(){
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      "name": new FormControl(null, Validators.required),
      "amount": new FormControl(null, [Validators.required,
                                      Validators.pattern(/^[1-9]+[0-9]*$/)])
    }))
  }

  deleteIngredient(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index)
  }

  submitForm(){
    if(!this.editMode){
      this.recipeService.addRecipes(this.recipeForm.value)
    } else {
      this.recipeService.updateRecipe(this.id,this.recipeForm.value)
    }
    this.navigateAway()
  }

  getControls(){
    return (<FormArray>this.recipeForm.get('ingredients')).controls
  }

 navigateAway(){
    this.route.navigate(['../'], {relativeTo: this.activatedRoute})
  }
}
