import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../../../shared/models/Restaurant';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { NotFoundComponent } from '../../partials/not-found/not-found.component';
import { RestaurantService } from '../../../services/restaurant.service';
import { Observable } from 'rxjs';
import { SearchComponent } from "../../partials/search/search.component";
import { AuthService } from '../../../../auth/auth.service';
import { DefaultButtonComponent } from '../../partials/default-button/default-button.component';

@Component({
  selector: 'app-restaurant-page',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    NgIf,
    NgFor,
    NotFoundComponent,
    SearchComponent,
    DefaultButtonComponent
  ],
  templateUrl: './restaurant-page.component.html',
  styleUrls: ['./restaurant-page.component.css']
})
export class RestaurantPageComponent implements OnInit {

  restaurants: Restaurant[] = [];

  constructor(
    activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private restaurantService: RestaurantService,
    private router: Router
  ) {
    activatedRoute.params.subscribe((params) => {
      let restaurantsObservable: Observable<Restaurant[]>;

      if (params.searchTerm) {
        restaurantsObservable = this.restaurantService.getAllRestaurantsBySearchTerm(params.searchTerm);

      } else if (params.id) {
        this.restaurantService.getRestaurantById(params.id).subscribe((restaurant) => {
          this.restaurants = [restaurant];
        });
        return;
      } else {
        restaurantsObservable = this.restaurantService.getAll();
      }

      restaurantsObservable.subscribe((serverRestaurants) => {
        this.restaurants = serverRestaurants;

      });
    });
  }

  ngOnInit(): void { }

  logout() {
    this.authService.logout();
  }

}
