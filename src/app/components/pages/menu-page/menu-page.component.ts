import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Menu } from '../../../shared/models/Menu';
import { MenuService } from '../../../services/menu.service';
import { NotFoundComponent } from "../../partials/not-found/not-found.component";
import { DefaultButtonComponent } from '../../partials/default-button/default-button.component';

@Component({
  selector: 'app-menu-page',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    NgIf,
    NgFor,
    NotFoundComponent,
    DefaultButtonComponent
  ],
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.css']
})
export class MenuPageComponent implements OnInit {

  menus: Menu[] = [];

  constructor(
    activatedRoute: ActivatedRoute,
    menuService: MenuService,
    private router: Router
  ) {
    activatedRoute.params.subscribe((params) => {
      if (params.id)
        menuService.getMenuByRestaurantId(params.id).subscribe(serverMenu => {
          this.menus = serverMenu;
        });
    })
  }

  ngOnInit(): void { }

}
