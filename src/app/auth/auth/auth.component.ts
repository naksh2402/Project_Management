import { Component,OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import firebase from 'firebase/compat/app';
import { getAuth, RecaptchaVerifier } from "firebase/auth";
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
isLoginMode:boolean=true;
isOtpSent=false;
confirmationResult:any=null;

constructor(private authService:AuthService){}
ngOnInit(): void {
this.loadRecaptcha();   
}
loadRecaptcha() {
  setTimeout(() => {
   (window as any).recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container',{
    size:'invisible',
  }); 
  },500);
}

onSendOtp(form:NgForm){
if(!form.value.phoneNumber){
  return;
}

this.authService.loginWithPhone(form.value.phoneNumber,(window as any).recaptchaVerifier)
.then((confirmationResult) => {
  this.confirmationResult = confirmationResult;
  this.isOtpSent = true;
  alert('OTP sent successfully');
})
}

onSubmit(form:NgForm){  
if(!form.valid){
  return;
}  

const email=form.value.email; 
const password=form.value.password;
const role=form.value.role;

if(this.isLoginMode){
  this.authService.loginWithEmail(email,password);
}else{
  this.authService.signUpWithEmail(email,password,role);
}
}


onVerifyOtp(form:NgForm){
if(!form.value.otp){
  return;
}
this.authService.verifyOtp(form.value.otp,this.confirmationResult);
}

toggleMode(){
  this.isLoginMode=!this.isLoginMode;
}

}
