import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Menu } from '../shared/models/Menu';
import { Observable } from 'rxjs';
import { MENUS_URL, MENUS_BY_SEARCH_URL, MENUS_BY_ID_URL, MENUS_RESTAURANT_BY_ID_URL } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Menu[]> {
    return this.http.get<Menu[]>(MENUS_URL);
  }

  getAllMenusBySearchTerm(searchTerm: string) {
    return this.http.get<Menu[]>(MENUS_BY_SEARCH_URL + searchTerm);
  }

  getMenuById(menuId: string): Observable<Menu> {
    return this.http.get<Menu>(MENUS_BY_ID_URL + menuId);
  }

  getMenuByRestaurantId(restaurantId: string): Observable<Menu[]> {
    return this.http.get<Menu[]>(MENUS_RESTAURANT_BY_ID_URL + restaurantId);
  }

}
