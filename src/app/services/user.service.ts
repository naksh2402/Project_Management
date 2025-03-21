// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from 'src/environment/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private firebaseDbUrl = environment.firebaseConfig.databaseURL;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getUsers(): Observable<User[]> {
    return this.http.get<{ [key: string]: User }>(`${this.firebaseDbUrl}/users.json`)
      .pipe(
        map(data => data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [])
      );
  }

  getUser(userId: string): Observable<User> {
    return this.http.get<User>(`${this.firebaseDbUrl}/users/${userId}.json`);
  }

  updateUser(user: User): Observable<any> {
    if (!user.id) throw new Error('User ID is required');
    return this.http.patch(`${this.firebaseDbUrl}/users/${user.id}.json`, user);
  }

  addUser(userId: string, userData: any): Observable<any> {
    return this.http.put(`${this.firebaseDbUrl}/users/${userId}.json`, userData);
  }
  deleteUser(userId:string,userData:any):Observable<any>{
    return this.http.delete(`${this.firebaseDbUrl}/users/${userId}.json`);
  }


}



