import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../app/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) { }

  canActivate() {
    if (this.userService.logged) {
      return true;
    }

    this.router.navigate(['login']);
    return false;
  }
}
