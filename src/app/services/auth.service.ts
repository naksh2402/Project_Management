import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import firebase from 'firebase/compat/app';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: User | null = null;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        // Retrieve user role from Realtime Database
        this.db.object(`users/${user.uid}`).valueChanges().subscribe((data: any) => {
          this.currentUser = { uid: user.uid, phoneNumber: user.phoneNumber || '', role: data?.role || 'teamMember' };
          localStorage.setItem('user', JSON.stringify(this.currentUser));
          localStorage.setItem('role', this.currentUser.role);
        });
      } else {
        this.currentUser = null;
        localStorage.removeItem('user');
        localStorage.removeItem('role');
      }
    });
  }

  // OTP-based Signup/Login Methods
  signInWithPhone(phoneNumber: string, recaptchaVerifier: firebase.auth.RecaptchaVerifier): Promise<firebase.auth.ConfirmationResult> {
    return this.afAuth.signInWithPhoneNumber(phoneNumber, recaptchaVerifier);
  }

  verifyOTP(otp: string, confirmationResult: firebase.auth.ConfirmationResult): Promise<any> {
    return confirmationResult.confirm(otp).then(userCredential => {
      this.router.navigate(['/dashboard']);
      return userCredential;
    });
  }

  // Email/Password Signup with Role (stores role in Realtime Database)
  async signUpWithEmail(email: string, password: string, role: string): Promise<void> {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      await this.db.object(`users/${userCredential.user?.uid}`).set({ email, role });
      localStorage.setItem('role', role);
      this.router.navigate(['/dashboard']);
    } catch (error: any) {
      console.error('Signup Failed:', error);
      alert(error.message);
    }
  }

  // Email/Password Login
  async loginWithEmail(email: string, password: string): Promise<void> {
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password);
      this.router.navigate(['/dashboard']);
    } catch (error: any) {
      console.error('Login Failed:', error);
      alert(error.message);
    }
  }

  // Sign out
  async signOut(): Promise<void> {
    await this.afAuth.signOut();
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    this.router.navigate(['/auth']);
  }

  // Helper methods
  isAuthenticated(): boolean {
    return !!localStorage.getItem('user');
  }

  getUserRole(): string | null {
    return localStorage.getItem('role');
  }

  getCurrentUser(): Observable<User | null> {
    return this.currentUser ? of(this.currentUser) :of(null);
}
}
