import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Project Management Portal';
  constructor(private authService: AuthService, private router: Router) {}

  logout(): void {
    this.authService.logout();
    // Redirect to login page after logout
    this.router.navigate(['/auth']);
  }
}
