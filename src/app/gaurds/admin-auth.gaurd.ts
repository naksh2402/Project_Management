import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const user=this.authService.getCurrentUser();
    if(user && user.role==='admin'){
      return true;
    }
    this.router.navigate(['/auth']);
    return false;
}
}

// canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//   return this.authService.getCurrentUser().pipe(
//     map(user => {
//       if (user && user.role === 'admin') {
//         return true;
//       }
//       this.router.navigate(['/auth']);
//       return false;
//     })
//   );
// }