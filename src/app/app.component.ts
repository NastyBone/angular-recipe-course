
import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
//https://ng-please-cantv-dont-go-default-rtdb.firebaseio.com/ ROUTE DATA
//
//import { Observable } from 'rxjs';
// API KEY: AIzaSyCuxAXbmMrdl8u_ExVknHbq1awQxCICXUc

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private auth: AuthService){
  }

  ngOnInit(): void {
      this.auth.autoLogin()
  }

}
