import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  RecaptchaVerifier, 
  signInWithPhoneNumber, 
  UserCredential 
} from 'firebase/auth';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { environment } from 'src/environment/environment'; 

const firebaseApp = initializeApp(environment.firebase);
const auth = getAuth(firebaseApp);

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any = null;

  constructor(private router: Router, private firestore: Firestore) {
    // Listen for authentication state changes
    auth.onAuthStateChanged(user => {
      this.user = user;
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        this.fetchUserRole(user.uid);
      }
    });
  }

  // Email/Password Login
  async loginWithEmail(email: string, password: string): Promise<void> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      await this.fetchUserRole(userCredential.user.uid);
      this.router.navigate(['/dashboard']);
    } catch (error: any) {
      console.error('Login Failed:', error);
      alert(error.message);
    }
  }

  // Email/Password Signup with Role
  async signUpWithEmail(email: string, password: string, role: string): Promise<void> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Store user role in Firestore under 'users/{uid}'
      await setDoc(doc(this.firestore, 'users', userCredential.user.uid), { email, role });
      localStorage.setItem('role', role);
      this.router.navigate(['/dashboard']);
    } catch (error: any) {
      console.error('Signup Failed:', error);
      alert(error.message);
    }
  }

  // Phone OTP Login
  async loginWithPhone(phoneNumber: string, recaptchaVerifier: RecaptchaVerifier): Promise<any> {
    try {
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
      return confirmationResult;
    } catch (error: any) {
      console.error('OTP Send Failed:', error);
      alert(error.message);
    }
  }

  // Verify OTP for Phone Login
  async verifyOtp(otp: string, confirmationResult: any): Promise<void> {
    try {
      const userCredential: UserCredential = await confirmationResult.confirm(otp);
      this.router.navigate(['/dashboard']);
    } catch (error: any) {
      console.error('OTP Verification Failed:', error);
      alert('Invalid OTP');
    }
  }

  // Logout
  logout() {
    signOut(auth);
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    this.router.navigate(['/auth']);
  }

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem('user');
  }

  // Fetch user role from Firestore and store it locally
  async fetchUserRole(uid: string): Promise<void> {
    const userDoc = doc(this.firestore, 'users', uid);
    const docSnap = await getDoc(userDoc);
    if (docSnap.exists()) {
      const role = docSnap.data()?.['role'];
      localStorage.setItem('role', role);
    }
  }
}














// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { initializeApp } from '@angular/fire/app';
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
//   signInWithPhoneNumber,
//   RecaptchaVerifier,
//   UserCredential
// } from 'firebase/auth';
// import { Firestore,doc,getDoc,setDoc } from '@angular/fire/firestore';
// import { EnvironmentInjector } from '@angular/core';
// import { environment } from 'src/environment/environment';

// const firebaseApp=initializeApp(environment.firebase);
// const auth=getAuth(firebaseApp);

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   // private userRole:string|null=null;
//   user:any=null;
//   constructor(private router:Router,private firestore:Firestore) { 
//    auth.onAuthStateChanged((user)=>{
//       this.user=user;
//        if(user){
//       localStorage.setItem('user',JSON.stringify(this.user));
//       this.fetchUserRole(user.uid);
//      }
//    })
//   }

//   fetchUserRole(uid:string){
//   this.firestore.collection('users').doc(uid).get().subscribe((doc)=>{
//     if(doc.exists){
//       const role=doc.data()?.role;
//       localStorage.setItem('role',role);
//     }
//   });
//   }
//   //login with firebase
//   async loginWithEmail(email:string,password:string){
//     try {
//      const userCredentials=await this.afAuth.signInWithEmailAndPassword(email,password);
//      this.fetchUserRole(userCredentials.user?.uid|| '')   
//      this.router.navigate(['/dashboard']);
//     } catch (error) {
//       console.log("Login Failed",error);
//       alert(error);
//       // alert(error.message);
//     }
//   }

//   async signUpWithEmail(email:string,password:string,role:string){
//     try {
//       const userCredentials= await this.afAuth.createUserWithEmailAndPassword(email,password);
//       await this.firestore.collection('users').doc(userCredentials.user?.uid).set({
//         email,
//         role
//       });
//       localStorage.setItem('role',role);  
//       this.router.navigate(['/dashboard']);
//     } catch (error) {
//       console.log("SignUp failed",error);
//       // alert(error.message);
//       alert(error);
//     }
//   }
//    async loginWithPhone(phoneNumber:string,recaptchaVerifier:firebase.auth.RecaptchaVerifier){
//     try {
//       const confirmation=await this.afAuth.signInWithPhoneNumber(phoneNumber,recaptchaVerifier);
//       return confirmation;
//     } catch (error) {
//       console.log("OTP Send Failed",error);
//       // alert(error.message);
//       alert(error);
//       //check
//       return error;
//     }
//   }
  
//   async verifyOtp(otp:string,confirmation:firebase.auth.ConfirmationResult){
//     try {
//       await confirmation.confirm(otp);
//       this.router.navigate(['/dashboard'])
//     } catch (error) {
//       console.log('OTP Verifivation Failed',error);
//       alert('Invalid OTP');
//     }
//   }
//   logout(){
//     this.afAuth.signOut();
//     localStorage.removeItem('user');
//     localStorage.removeItem('role');
//     this.router.navigate(['/auth']);
//   }
//   isAuthenticated():boolean{
//     return !!localStorage.getItem('user');
//   }
// }
