import { Component, OnDestroy, OnInit, ViewChild,
  // Output, EventEmitter,
  // ViewChild, ElementRef
 } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { RecipeServiceService } from 'src/app/recipes/recipe-service.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListServiceService } from '../shopping-list-service.service';
//import {}

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @Output() ingredientEmmiter: EventEmitter<Ingredient> = new EventEmitter<Ingredient>()
  // @ViewChild('nameInput', {static: false}) nameInput?: ElementRef
  // @ViewChild('amountInput', {static: false}) amountInput?: ElementRef

  // inputName? : string
  // inputAmount? : number

  editSubscription!:Subscription
  editMode = false;
  index!: number
  editingIngredient!: Ingredient;

  @ViewChild('f', {static: false}) shopListForm! : NgForm;
  constructor(private shoppingListService : ShoppingListServiceService) { }




  ngOnInit() {
    this.editSubscription = this.shoppingListService.editingShopListItem.subscribe((id: number) =>{
      this.editMode = true;
      this.index = id;
      this.editingIngredient = this.shoppingListService.getIngredient(id)
      this.shopListForm.setValue({
        "name": this.editingIngredient.name,
        "amount": this.editingIngredient.amount
      })

    })
  }

  ngOnDestroy(): void {
      this.editSubscription.unsubscribe()
  }

  // addToList(){
  //   this.inputName = this.nameInput?.nativeElement.value;
  //   this.inputAmount = parseInt(this.amountInput?.nativeElement.value)
  //   if (this.inputName && this.inputAmount){
  //     this.shoppingListService.addIngredient(new Ingredient(this.inputName, this.inputAmount))
  //   }
  // }

  changeList(myForm: NgForm){
    const value = myForm.value
    if(this.editMode){
      this.shoppingListService.updateIngredient(this.index, new Ingredient(value.name, value.amount))
    } else {
      this.shoppingListService.addIngredient(new Ingredient(value.name, value.  amount))
    }
    this.resetForm()
  }

  resetForm(){
    this.editMode = false
    this.shopListForm.reset();
  }

  deleteItem(){
    this.shoppingListService.onDeleteItem(this.index)
    this.resetForm()
  }
}
