import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder.directive';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit , OnDestroy{

  constructor(private authService: AuthService, private router: Router,
              private componentFactoryResolver : ComponentFactoryResolver) { }

  loggedIn = false;
  isLoading = false;
  anError: string | null = null

  @ViewChild(PlaceholderDirective) alertHost!: PlaceholderDirective
  closeSub!: Subscription


  ngOnInit(): void {
  }

  logSwitch(){
    this.loggedIn = !this.loggedIn
  }

  toAuth(form : NgForm){
    this.isLoading = true
    let authObs: Observable<AuthResponseData>

    if (!form){
      return
    } else {
      const email = form.value.email;
      const password = form.value.password
      if (this.loggedIn){
        authObs = this.authService.signup(email,password)
      } else {
       authObs = this.authService.logIn(email,password)
      }
    }

    authObs.subscribe(
      {
        next: (responseData)=> {
          this.isLoading = false
          this.router.navigate(['/recipes'])

        },
        error: (errorMessage) => {
        this.showError(errorMessage)
        this.anError = errorMessage
        this.isLoading = false
        }
      }
    )
    form.reset()

  }

  errorHandler(){
    this.anError = null
    console.log(this.anError)

  }

  private showError(error:string){

    const factoryComponent = this.componentFactoryResolver.resolveComponentFactory(AlertComponent)
    const hostViewContainerRef = this.alertHost.viewContainerRef
    hostViewContainerRef.clear()
    const componentRef = hostViewContainerRef.createComponent(factoryComponent)
    componentRef.instance.message = error;

    this.closeSub =  componentRef.instance.close.subscribe(()=>{
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear()
    })


  }
  ngOnDestroy(): void {
      if (this.closeSub){
        this.closeSub.unsubscribe()
      }
  }


}
