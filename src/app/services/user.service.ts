import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { USER_LOGIN_URL, USER_REGISTER_URL } from '../shared/constants/urls';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { User } from '../shared/models/User';
import { IUserRegister } from '../shared/interfaces/IUserRegister';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

interface TokenData {
  value: string;
  expiry: number;
}

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private userSubject = new BehaviorSubject<User>(new User());
  public userObservable: Observable<User>;
  private isLocalStorageAvailable(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router,
    private toastrService: ToastrService,
  ) {
    this.userObservable = this.userSubject.asObservable();
  }

  public get currentUser(): User {
    return this.userSubject.value;
  }

  login(userLogin: IUserLogin): Observable<User> {
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) => {
          this.userSubject.next(user);
          this.toastrService.success(
            'Welcome!',
            'Login Successful'
          )

          setWithExpiry('token', user['access_token'], 12);
        },
        error: (errorResponse) => {
          const errorMessage = this.getErrorMessage(errorResponse);
          this.toastrService.error(errorMessage, 'Login Failed');
        }
      })
    );
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  register(userRegister: IUserRegister): Observable<User> {
    return this.http.post<User>(USER_REGISTER_URL, userRegister).pipe(
      tap({
        next: (user) => {
          this.userSubject.next(user);
          this.toastrService.success(
            'Welcome!',
            'Register Successful'
          )
        },
        error: (errorResponse) => {
          const errorMessage = this.getErrorMessage(errorResponse);
          this.toastrService.error(errorMessage,
            'Register Failed')
        }
      })
    );
  }

  private getErrorMessage(errorResponse: any): string {
    if (errorResponse.error && typeof errorResponse.error === 'string') {
      return errorResponse.error;
    } else if (errorResponse.error && errorResponse.error.message) {
      return errorResponse.error.message;
    } else {
      return 'An unexpected error occurred';
    }
  }

  get logged(): boolean {
    return getWithExpiry('token') ? true : false;
  }

  getToken(): TokenData | null {
    if (this.isLocalStorageAvailable()) {
      const item = localStorage.getItem('token');
      if (item) {
        return JSON.parse(item) as TokenData;
      }
    }
    return null;
  }
}

function setWithExpiry(key: string, value: any, time: number) {

  const now = new Date();
  const item = {
    value: value,
    expiry: now.setTime(now.getTime() + time * 60 * 60 * 1000),
  };
  localStorage.setItem(key, JSON.stringify(item));
}

function getWithExpiry(key: string) {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
}
