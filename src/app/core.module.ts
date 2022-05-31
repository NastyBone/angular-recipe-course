import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { RecipeServiceService } from './recipes/recipe-service.service';
import { ShoppingListServiceService } from './shopping-list/shopping-list-service.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [RecipeServiceService, ShoppingListServiceService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true } ]
})
export class CoreModule { }
