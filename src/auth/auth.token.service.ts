import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { UserService } from '../app/services/user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {

  constructor(private userService: UserService) { }

  public getToken(): any {
    return this.userService.getToken();
  }

  public decodePayloadJWT(): any {
    try {
      return jwtDecode(this.getToken());
    } catch (Error) {
      return null;
    }
  }
}
