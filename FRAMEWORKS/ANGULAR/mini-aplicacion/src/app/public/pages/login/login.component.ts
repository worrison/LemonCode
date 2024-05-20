import {Component} from '@angular/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule,MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  userNameFormControl = new FormControl('', [Validators.required, Validators.minLength(4)]);
  userPasswordFormControl = new FormControl('', [Validators.required, Validators.minLength(6)]);

  constructor(private authService: AuthService, private router: Router) { } // Inyecta el servicio de autenticación
  login(): void {
    if (this.authService.login(this.userNameFormControl.value ?? '', this.userPasswordFormControl.value ?? '')) {
      console.log('Login correcto');
      this.router.navigate(['/dashboard']);
    } else {
      console.log('Login incorrecto');
    }
  }
}
