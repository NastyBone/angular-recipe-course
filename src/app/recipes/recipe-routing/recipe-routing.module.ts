import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { RecipeResolveService } from 'src/app/recipe-resolve.service';
import { RecipeDetailComponent } from '../recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from '../recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from '../recipe-start/recipe-start.component';
import { RecipesComponent } from '../recipes.component';


const recipeRoutes: Routes = [
  { path: '', component: RecipesComponent,
  canActivate: [AuthGuard],
  children: [
    {path: '', component: RecipeStartComponent, pathMatch:'full', resolve: [RecipeResolveService]},
    {path: 'new', component: RecipeEditComponent, resolve: [RecipeResolveService]},
    {path: ':id', component: RecipeDetailComponent, resolve: [RecipeResolveService]},
    {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipeResolveService]}
  ]}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(recipeRoutes)
  ],
  exports: [RouterModule]
})
export class RecipeRoutingModule { }
