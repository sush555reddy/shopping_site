import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpHeaders} from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthinterceptorService  implements  HttpInterceptor {

  constructor(private _authservice: AuthService ) { }

intercept(req, next ) {

  const  token = this._authservice.checkUserstatus() ;
  const authRequest = req.clone({
    headers : new HttpHeaders().set('authtoken', token)

  });
  return next.handle(authRequest);
  }
}
