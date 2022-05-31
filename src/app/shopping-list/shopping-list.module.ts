import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';



const shopRoute: Routes = [
  { path: '', component: ShoppingListComponent},
]

@NgModule({
  declarations: [
    ShoppingEditComponent,
    ShoppingListComponent,
  ],
  imports: [
    RouterModule.forChild(shopRoute),
    SharedModule,
    RouterModule,
    FormsModule,
  ]
})
export class ShoppingListModule { }
