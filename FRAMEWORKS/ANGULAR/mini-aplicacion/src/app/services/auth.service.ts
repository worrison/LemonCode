import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }
  loggedIn = false;

  login(username: string, password: string): boolean {
    // Aquí normalmente harías una solicitud HTTP para autenticar al usuario.
    // Por ahora, solo vamos a simularlo.
    if (username === 'victor' && password === 'angular') {
      this.loggedIn = true;
      return true;
    }
    return false;
  }

  logout(): void {
    this.loggedIn = false;
    this.router.navigate(['/login']);
  }

  isLogged(): boolean {
    return this.loggedIn;
  }
  getUsername(): string {
    return 'victor';
  }
}
