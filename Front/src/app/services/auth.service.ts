import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  isAdmin(): boolean {
    return localStorage.getItem('role') === 'admin';
  }

  getRole(): string {
    return localStorage.getItem('role') || 'user';
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('role');
  }
}