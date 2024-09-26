import { CommonModule, NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../auth/auth.service';

@Component({
  selector: 'default-button',
  standalone: true,
  imports: [
    NgStyle,
    CommonModule,
    RouterModule
  ],
  templateUrl: './default-button.component.html',
  styleUrls: ['./default-button.component.css']
})
export class DefaultButtonComponent implements OnInit {

  @Input()
  type: 'submit' | 'button' = 'submit';
  @Input()
  text: string = 'Submit';
  @Input()
  bgColor = '#e72929';
  @Input()
  color = 'white';
  @Input()
  fontSizeRem = 1.3;
  @Output()
  onClick = new EventEmitter();

  constructor(
    private authService: AuthService,
  ) { }


  ngOnInit(): void { }

}
