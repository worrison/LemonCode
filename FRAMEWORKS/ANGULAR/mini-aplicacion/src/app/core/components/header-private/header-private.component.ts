import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';

import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-header-private',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule,RouterModule],
  templateUrl: './header-private.component.html',
  styleUrl: './header-private.component.scss'
})
export class HeaderPrivateComponent {
  constructor(private authService: AuthService, private router: Router) { }
  logout(): void{
    this.authService.logout();
  }
  getUsername(): string {
    return this.authService.getUsername();
  }
}
