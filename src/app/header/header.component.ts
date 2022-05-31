import { Component, Output, EventEmitter, OnInit, OnDestroy,  } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { HttpService } from '../shared/http.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',

})
export class HeaderComponent implements OnInit, OnDestroy{

  constructor(private http: HttpService, private authService: AuthService){}
  isAuth = false
  loginSubscription?: Subscription

  ngOnInit(): void {
    this.loginSubscription = this.authService.user.subscribe((userStatus) =>{
      this.isAuth = !!userStatus
    })
  }

  uploadData(){
    this.http.sendData()
  }

  getData(){
    this.http.fetchData().subscribe()
  }

  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe()
  }

  toLogout(){
    this.authService.logOut()
  }
}
