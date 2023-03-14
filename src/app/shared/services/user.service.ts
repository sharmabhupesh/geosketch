import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { UserRoles } from '../interfaces/user';
import { MultiUserResponse, User, UserResponse } from '@app/modules/user/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  
  constructor(private http: HttpClient) {}

  public getUserRoles(){
    return this.http.get<UserRoles>(`${environment.apiUrl}/role`);
  }

  public addNewUser(userData:User){
    return this.http.post(`${environment.apiUrl}/user`,userData);
  }

  public getAllUsers(){
    return this.http.get<MultiUserResponse>(`${environment.apiUrl}/user`);
  }

  public removeUser(userId:string){
    return this.http.delete(`${environment.apiUrl}/user/force-delete/${userId}`)
  }

}
