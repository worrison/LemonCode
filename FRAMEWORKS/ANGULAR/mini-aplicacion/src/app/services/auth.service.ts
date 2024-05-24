import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  loggedIn = !!localStorage.getItem('loggedIn');

  login(username: string, password: string): boolean {
    if (username === 'victor' && password === 'angular') {
      this.loggedIn = true;
      localStorage.setItem('loggedIn', 'true');
      return true;
    }
    this.loggedIn = false;
    localStorage.removeItem('loggedIn');
    return false;
  }

  logout(): void {
    this.loggedIn = false;
    // localStorage.setItem('loggedIn', 'false');
    localStorage.removeItem('loggedIn');
    this.router.navigate(['/login']);
  }

  isLogged(): boolean {
    return this.loggedIn;
  }
  getUsername(): string {
    return 'victor';
  }
}
