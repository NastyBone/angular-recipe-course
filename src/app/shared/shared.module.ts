import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { PlaceholderDirective } from './placeholder.directive';
import { ToggleOptionsDirective } from './toggle-options.directive';




@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    AlertComponent,
    PlaceholderDirective,
    ToggleOptionsDirective],
  imports: [
    CommonModule
  ],
  exports:[
    LoadingSpinnerComponent,
    AlertComponent,
    PlaceholderDirective,
    ToggleOptionsDirective,
    CommonModule
  ],
  entryComponents: [AlertComponent]
})
export class SharedModule { }
