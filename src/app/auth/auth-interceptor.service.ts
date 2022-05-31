import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { exhaustMap, Observable, take } from 'rxjs';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private auth : AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.auth.user.pipe(take(1), exhaustMap((user) =>{



      let token: any
      if (user && user.token) {
         token = user.token
      }
      if (token == null){
        return next.handle(req)
      }

      const modifiedReq = req.clone(
      {
        params: new HttpParams().set('auth', token)
      })
      return next.handle(modifiedReq)
    }))


  }
}
