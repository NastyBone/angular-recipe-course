import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appToggleOptions]'
})
export class ToggleOptionsDirective {
  @HostBinding('class.open') toggleOpen = false;

  @HostListener('click') changeStatus(){
    this.toggleOpen = !this.toggleOpen
  }

  constructor() { }

}
