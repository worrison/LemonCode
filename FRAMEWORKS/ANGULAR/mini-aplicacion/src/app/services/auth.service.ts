import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  loggedIn = false;

  login(username: string, password: string): boolean {
    // Aquí normalmente harías una solicitud HTTP para autenticar al usuario.
    // Por ahora, solo vamos a simularlo.
    if (username === 'curso' && password === 'angular') {
      this.loggedIn = true;
      return true;
    }
    return false;
  }

  logout(): void {
    this.loggedIn = false;
  }

  isLogged(): boolean {
    return this.loggedIn;
  }
  getUsername(): string {
    return 'user';
  }
}
