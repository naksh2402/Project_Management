import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['expectedRole'];
    const role = this.authService.getUserRole(); // Retrieves from localStorage

    if (this.authService.isAuthenticated() && role === expectedRole) {
      return true;
    }
    this.router.navigate(['/auth']);
    return false;
}
}