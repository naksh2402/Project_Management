import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environment/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiKey = environment.firebaseConfig.apiKey;
  private currentUserSubject = new BehaviorSubject<any>(null);
    currentUser$ = this.currentUserSubject.asObservable();
    
  constructor(private http: HttpClient) {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }

  // Email/password sign up
  signUpWithEmail(email: string, password: string, role: string): Observable<any> {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`;
    const payload = { email, password, returnSecureToken: true };
    return this.http.post(url, payload);
  }

  // Email/password login
  loginWithEmail(email: string, password: string): Observable<any> {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`;
    const payload = { email, password, returnSecureToken: true };
    return this.http.post(url, payload);
  }

  // Save user data after login/signup
  setCurrentUser(user: any): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }
 
  sendOtp(phoneNumber:string,recaptchaToken:string):Observable<any>{
    const url=`https://identitytoolkit.googleapis.com/v1/accounts:sendVerificationCode?key=${this.apiKey}`;
    const payload={
      phoneNumber:phoneNumber,
      recaptchaToken:recaptchaToken
    }
    return this.http.post(url,payload);
  }
  verifyOtp(sessionInfo: string, code: string): Observable<any> {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPhoneNumber?key=${this.apiKey}`;
    const payload = {
      sessionInfo: sessionInfo,
      code: code,
      returnSecureToken: true
    };
    return this.http.post(url, payload);
  }

   getCurrentUser(): any {
    return this.currentUserSubject.value;
  }
  
  getToken(): string | null {
    const user = this.getCurrentUser();
    return user ? user.idToken : null;
  }
   logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}

