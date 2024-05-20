import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/components/header/header.component';
import { HeaderPrivateComponent } from './core/components/header-private/header-private.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { AuthService } from './services/auth.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent,FooterComponent,HeaderPrivateComponent,NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'mini-aplicacion';
  constructor(public authService: AuthService) { }

}
