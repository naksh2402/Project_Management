import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
   if (localStorage.getItem('token')) {
    // User is authenticated
    return true;
    }
    this.router.navigate(['/auth']);
    return false;
  }
}
