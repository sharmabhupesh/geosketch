import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { AuthService } from '../services/auth.service';
import {AuthResponse, User, UserResponse} from '../../user/interfaces/user.interface';
import { getNotificationStatusAction } from '../../../core/store/notification/notification.actions';
import { Notification } from '../../../core/interfaces/notification.interface';
import { Credentials } from '../interfaces/credentials.interface';
import { NgxPermissionsService } from 'ngx-permissions';
import { CommonResponse } from '@app/shared/interfaces/common';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private authService: AuthService,
    private router: Router,
    private ngxPermissionsService: NgxPermissionsService
  ) {}

  authenticateEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.authenticateAction),
      switchMap(({ credentials }: { credentials: Credentials }) => 
        this.authService.authenticate(credentials).pipe(switchMap((authResponse) => this.authService.verifyUserSession())).pipe(
          map((userResponse:UserResponse)=>{
            
            this.authService.setAuthorites(userResponse.data.id);

            this.ngxPermissionsService.loadPermissions([userResponse.data.Role.name]);

            this.router.navigate([
             '/dashboard'
            ]);
            
            const notification: Notification = {
              message: $localize`You are now connected!`,
              type: 'success',
            };
            this.store.dispatch(getNotificationStatusAction({ notification }));
            
            return AuthActions.fetchAuthenticateSuccessAction({
              user: userResponse.data
            });
            
          }),
          catchError(error => {
            this.authService.clearAuthorites();
            return of(
              AuthActions.fetchAuthenticateFailureAction({
                error:
                  error.error?.message ?? $localize`Une erreur est survenue`,
              })
            );
          })
        )
      )
    )
  );

  logoutEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logoutAction),
      switchMap(({userId}) => {
          if(userId){
            return this.authService.logout(userId).pipe(
              map(() => {
                const notification: Notification = {
                  message: $localize`Thank you!You are successfully logged out.`,
                  type: 'success',
                };
                this.store.dispatch(getNotificationStatusAction({ notification }));
                this.router.navigate(['/auth/login']);
                return AuthActions.fetchLogoutSuccessAction();
              }),
              catchError(() => EMPTY)
            )
          }
          else{
            const notification: Notification = {
              message: $localize`Thank you!You are successfully logged out.`,
              type: 'success',
            };
            this.store.dispatch(getNotificationStatusAction({ notification }));
            this.router.navigateByUrl('/auth/login');
            return of(AuthActions.fetchLogoutSuccessAction()); 
          }
        }
      )
    )
  );

  addNewUserEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.addNewUserAction),
      switchMap(({ user }: { user: User }) =>
        this.authService.addNewUser(user).pipe(
          map((addUserResponse: CommonResponse) => {

            const notification: Notification = {
              message: $localize`User Added Successfully`,
              type: 'success',
            };

            this.store.dispatch(getNotificationStatusAction({ notification }));

            return AuthActions.fetchAddNewUserSuccessAction({
              response:addUserResponse
            });
          }),
          catchError(error => {
            console.log('error',error)
            return of(
              AuthActions.fetchAddNewUserFailureAction({
                error:
                  error.error?.message ?? $localize`Unable To Add New User`,
              })
            );
          })
        )
      )
    )
  );

}
