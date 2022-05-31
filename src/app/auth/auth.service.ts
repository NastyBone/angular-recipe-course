import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, tap, throwError } from 'rxjs';
import { catchError } from 'rxjs';
import { User } from './user.model';
import { environment } from 'src/environments/environment';

//AUTH ENDPOINT: https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=[API_KEY]
// API KEY: AIzaSyCuxAXbmMrdl8u_ExVknHbq1awQxCICXUc
const singInUrlKey = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.FIREBASE_API_KEY

const logInUrlKey = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.FIREBASE_API_KEY
//DO NOT DO THIS

export interface AuthResponseData{
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered:boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private router: Router) { }

  user = new BehaviorSubject<User | null>(null)
  expirationTimer!: any

  signup(_email: string,_password:string){

    return this.http.post<AuthResponseData>(singInUrlKey, {
      email: _email,
      password: _password,
      returnSecureToken: true
    }).pipe(catchError(this.errorHandler),
            tap(responseData => this.authHandler(responseData))
    )
  }

  logIn(_email: string, _password: string){
    return this.http.post<AuthResponseData>(logInUrlKey, {
      email: _email,
      password: _password,
      returnSecureToken: true
    }).pipe(
        catchError(this.errorHandler),
        tap(responseData => this.authHandler(responseData))
    )
  }

  autoLogin(){

    try {
      let userData: {
        email:string,
        id:string,
        _token: string,
        _tokenExpirationDate: string
      } = JSON.parse(localStorage.getItem('userData')!)

      const user = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate))

      if(user.token) {
        this.user.next(user)
        const expirationTimeRemain = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
        this.autoLogOut(expirationTimeRemain)
      }

    } catch (error) {
      //console.log(error)
    }

  }

  logOut(){
    this.user.next(null)
    this.router.navigate(['/auth'])
    localStorage.removeItem('userData')
    if (this.expirationTimer){
      clearInterval(this.expirationTimer)
    }

  }

  autoLogOut(expirationTime: number){
    this.expirationTimer = setTimeout(() =>{
      this.logOut()
      console.log('u r just being trolled', expirationTime)
    }, expirationTime)
  }

  private errorHandler(errorData : HttpErrorResponse){
    let errorMessage = 'An unknow error occurred'
    if (errorData.error && errorData.error.error){
      switch (errorData.error.error.message){
        case 'EMAIL_EXISTS' : errorMessage = 'Email already in use'; break;
        case 'EMAIL_NOT_FOUND': errorMessage = 'Email is not registered'; break;
        case 'INVALID_PASSWORD': errorMessage = 'Email or password incorrect'; break;
        default: errorMessage + ': ' + errorData.error.error.message
      }
    }
    return throwError(() => errorMessage)
  }

  private authHandler(responseData: AuthResponseData){
    const authTimeExpiration = new Date(new Date().getTime() + +responseData.expiresIn * 1000)

    const user = new User(responseData.email, responseData.localId, responseData.idToken, authTimeExpiration)
    this.user.next(user)
    this.autoLogOut(+responseData.expiresIn * 1000)
    localStorage.setItem('userData', JSON.stringify(user))

  }
}
