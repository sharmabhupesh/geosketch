import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '@app/modules/authentication/services/auth.service';
import { fetchAuthenticateSuccessAction } from '@app/modules/authentication/store/auth.actions';
import { Store } from '@ngrx/store';
import { NgxPermissionsService } from 'ngx-permissions';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private store: Store,
    private authService: AuthService,
    private ngxPermissionsService: NgxPermissionsService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>  {
    if(this.authService.loggedIn()){
      return of(true)
    }
    return this.authService.verifyUserSession().pipe(
      map(e => {
        if (e.data) {
          this.authService.setAuthorites(e.data.id);
          this.store.dispatch(
            fetchAuthenticateSuccessAction({ user: e.data })
          );
          this.ngxPermissionsService.loadPermissions([e.data.Role.name]);
          return true;
        } else {
          this.authService.clearAuthorites();
          this.router.navigateByUrl('auth/sign-in');
          return false;
        }
      }),catchError((error)=>{ 
        this.authService.clearAuthorites();
        this.router.navigateByUrl('auth/sign-in');
        return of(false)
    }));
  }
}
