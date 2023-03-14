import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from 'environments/environment';
import {
  AuthResponse,
  MultiUserResponse,
  Role,
  User,
  UserResponse,
} from '@app/modules/user/interfaces/user.interface';
import {
  Credentials,
  ResetPasswordCredentials,
} from '../interfaces/credentials.interface';
import { fetchAuthenticateSuccessAction } from '../store/auth.actions';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  public readonly INITIAL_PATH = "/app";
  public readonly ADMIN_PATH = "/admin";
  public readonly LOGIN_PATH = "/login";

  private readonly authorities = new BehaviorSubject<Set<string>>(new Set<string>());
  readonly authoritiesObservable = this.authorities.asObservable();
  
  constructor(private store: Store,private http: HttpClient) {}

  public authenticate(credentials: Credentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${environment.apiUrl}/auth/sign-in`,
      credentials
    );
  }

  public getInitialPathForRole(role: Role): string {
    return (role.name === "admin" || role.name === "super admin")? this.ADMIN_PATH : this.INITIAL_PATH;
  }
  
  async checkLogin(): Promise<boolean> {
    try {
      const response = await this.verifyUserSession().toPromise();
      if(response?.code && response.code=='200' && response.data && response.data.id){
        this.authorities.next(new Set<string>(response.data.id));
        this.store.dispatch(
          fetchAuthenticateSuccessAction({ user: response.data })
        );
        return true;
      }
      else{
        this.clearAuthorites();
        return false;
      }
    } catch {
      return false;
    }
  }

  public verifyUserSession():Observable<UserResponse>{
    return this.http.get<UserResponse>(`${environment.apiUrl}/auth/verify-session`);
  }

  public forgotPassword(email: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/forgot-password`, { email });
  }

  public resetPassword(credentials: ResetPasswordCredentials): Observable<any> {
    return this.http.post(`${environment.apiUrl}/reset-password`, credentials);
  }

  public getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/user/me`);
  }

  public getAllUsers(): Observable<MultiUserResponse> {
    return this.http.get<MultiUserResponse>(`${environment.apiUrl}/user`);
  }

  public getUserRolesPermissions(): Observable<{
    roles: string[];
    permissions: string[];
  }> {
    return this.http.get<{ roles: string[]; permissions: string[] }>(
      `${environment.apiUrl}/user/roles`
    );
  }

  public logout(userId:string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/logout`, {UserId:userId});
  }

  loggedIn(): boolean {
    return this.authorities.value.size > 0;
  }
  
  public setAuthorites(response:string):void{
    this.authorities.next(new Set<string>(response));
  }

  public clearAuthorites(): void {
    this.authorities.next(new Set<string>());
  }

  public addNewUser(user:User):Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/user`,user);
  }
}
