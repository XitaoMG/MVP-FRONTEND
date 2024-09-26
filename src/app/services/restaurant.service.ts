import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Restaurant } from '../shared/models/Restaurant';
import { Observable } from 'rxjs';
import { RESTAURANTS_BY_ID_URL, RESTAURANTS_BY_SEARCH_URL, RESTAURANTS_URL } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(RESTAURANTS_URL);
  }

  getAllRestaurantsBySearchTerm(searchTerm: string) {
    return this.http.get<Restaurant[]>(RESTAURANTS_BY_SEARCH_URL + searchTerm);
  }

  getRestaurantById(restaurantId: string): Observable<Restaurant> {
    return this.http.get<Restaurant>(RESTAURANTS_BY_ID_URL + restaurantId);
  }

}
