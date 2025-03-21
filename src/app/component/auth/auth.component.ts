import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLoginMode: boolean = true; 
  email: string = '';
  password: string = '';
  role: string = ''; 
  phone: string = '';
  otp: string = '';
  sessionInfo: string = '';
  showOTPInput: boolean = false;
  verified: boolean = false;
  error: string | null = null;
  
  recaptchaToken: string = 'dummy-token';

  constructor(private authService: AuthService,private router:Router,private userService:UserService) {}

  // Toggle between login and signup modes
  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.showOTPInput = false;
  }

  // Handle form submission
  onSubmit() {
  if (this.isLoginMode) {
    // Email/password login flow
    this.authService.loginWithEmail(this.email, this.password).subscribe(
      response => {
        const userId = response.localId; // Firebase returns a 'localId' as the user id
                
        this.userService.getUser(userId).subscribe(
          (userData: any) => {
        const fullUser = { ...response, ...userData };
        this.authService.setCurrentUser(fullUser);
        this.redirectBasedOnRole(fullUser.role);
        alert('Login successful!');
          },
          (error:any) => {
            console.error('Error fetching user data:', error);
            // Fallback if error occurs, use the default role (not recommended)
            this.redirectBasedOnRole(this.role);
          }
        );
      },
      error => {
        alert('Invalid email or password!');
        console.error('Login error:', error);
      }
    );
  } else {
    // Signup flow (unchanged)
    if (this.error) {
      alert("Signup failed! Please try again.");
      return;
    } else if (!this.sessionInfo && !this.verified) {
      alert("OTP verification failed! Please try again.");
      return;
    } else {
      this.authService.signUpWithEmail(this.email, this.password, this.role).subscribe(
        response => {
          this.authService.setCurrentUser(response);
          console.log('Signup successful via email:', response);
          const userId = response.localId;
          console.log('New userId:', response.localId);
          const userData = { email: this.email, role: this.role, createdAt: new Date().toISOString() };
          // For signup, we add the user record only once
          this.userService.addUser(userId, userData).subscribe(
            res => console.log('User record added successfully:', res),
            err => console.error('Error adding user record:', err)
          );
          alert('Signup successful! Please log in.');
          this.router.navigate(['/auth']);
        },
        error => {
          alert('Signup failed! Please try again.');
          console.error('Signup error:', error);
        }
      );
    }
  }
}
  // Request OTP for the provided phone number
  sendOTP() {
    this.authService.sendOtp(this.phone, this.recaptchaToken).subscribe(
      response => {
        this.sessionInfo = response.sessionInfo;
        this.showOTPInput = true;
        alert('OTP sent successfully!');
        console.log('OTP sent successfully:', response);
      },
      error => {
        this.error=error.message;
        alert('Failed to send OTP! Please login with testing credentials only.');
        console.error('Error sending OTP, falling back to email signup:', error);
        
      }
    );
  }

  // Verify the OTP entered by the user
  verifyOTP() {
    this.authService.verifyOtp(this.sessionInfo, this.otp).subscribe(
      response => {
        this.authService.setCurrentUser(response);
        alert('OTP verification successful!');
         this.verified=true;
         this.error=null;
        console.log('OTP verification successful:', response);
      },
      error => {
          this.error=error.message;
        alert('OTP verification failed! Please with testing credentials only.');
        console.error('OTP verification failed:', error);
      }
    );
  }
 

  redirectBasedOnRole(userRole: string) {
  console.log('Redirecting user with role:', userRole);
  if (userRole === 'admin') {
    this.router.navigate(['/admin']);
  } else if (userRole === 'team') {
    this.router.navigate(['/team']);
  } else {
    console.error('Unknown role, redirecting to auth page');
    this.router.navigate(['/auth']);
  }
}
}
