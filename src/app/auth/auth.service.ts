import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {Subject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  $authObservable: Subject<any> = new Subject();
constructor(private _http: HttpClient, private _cookieService: CookieService, private _router: Router) { }
login(auth_detail: any) {
this._http.post('http://localhost:3000/authenticate', auth_detail).subscribe((data: any) => {
if (data.isLoggedIn) {
  this._cookieService.set('token', data.token);
  this.$authObservable.next(data.token);
this._router.navigate(['/home']);
} else {
  alert('invalid credentials!!');
}
});
}
  register(auth_register: any) {
    this._http.post('http://localhost:3000/register', auth_register).subscribe((data: any) => {
      if (data.isRegisterIn) {
        this._router.navigate(['/login']);
      } else {
        alert('registration failed');
      }
    });
  }
  checkUserstatus() {
    return this._cookieService.get('token');
  }
  logout() {
    this._cookieService.delete('token');
    this.$authObservable.next(false);
    this._router.navigate(['/login']);
  }
}
