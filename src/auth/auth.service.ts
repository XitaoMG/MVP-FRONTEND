import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false;

  constructor(private router: Router) { }

  login(email: string, password: string): boolean {

    if (email === 'email' && password === 'password') {
      this.isAuthenticated = true;
      return true;
    }
    return false;
  }

  logout() {

    this.isAuthenticated = false;
    this.router.navigate(['/login']);

  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}