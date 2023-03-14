import { createReducer, on } from '@ngrx/store';

import * as AuthActions from './auth.actions';
import { AuthState } from '../interfaces/state.interface';
import { User } from '@app/modules/user/interfaces/user.interface';
import { CommonResponse } from '@app/shared/interfaces/common';

export const authState: AuthState = {
  isLoggedIn: false,
  user: null,
  roles: [],
  permissions: [],
  error: null,
  message: null,
  loading: false,
};

export const authFeatureKey = 'auth';

export const authReducer = createReducer(
  authState,
  on(
    AuthActions.authenticateAction,
    AuthActions.forgotPasswordAction,
    AuthActions.resetPasswordAction,
    AuthActions.logoutAction,
    AuthActions.addNewUserAction,
    (state: AuthState): AuthState => {
      return {
        ...state,
        loading: true,
      };
    }
  ),
  on(
    AuthActions.fetchAuthenticateSuccessAction,
    (
      state: AuthState,
      {
        user
      }: { user: User | null;}
    ): AuthState => {
      return {
        ...state,
        user,
        isLoggedIn: user ? true : false,
        loading: false,
        error: null,
        message: null,
      };
    }
  ),
  on(
    AuthActions.fetchCurrentUserSuccessAction,
    (state: AuthState, { user }: { user: User | null }): AuthState => {
      return {
        ...state,
        user,
        loading: false,
        message: null,
        error: null,
      };
    }
  ),
  on(
    AuthActions.fetchAuthenticateFailureAction,
    AuthActions.fetchForgotPasswordFailureAction,
    AuthActions.fetchResetPasswordFailureAction,
    AuthActions.fetchAddNewUserFailureAction,
    (state: AuthState, { error }: { error: string }): AuthState => {
      return {
        ...state,
        loading: false,
        error,
        message: null,
      };
    }
  ),
  on(
    AuthActions.fetchForgotPasswordSuccessAction,
    (state: AuthState, { message }: { message: string }): AuthState => {
      return {
        ...state,
        loading: false,
        error: null,
        message,
      };
    }
  ),
  on(
    AuthActions.fetchResetPasswordSuccessAction,
    (state: AuthState, { message }: { message: string }): AuthState => {
      return {
        ...state,
        loading: false,
        error: null,
        message,
      };
    }
  ),
  on(AuthActions.fetchLogoutSuccessAction, (state: AuthState): AuthState => {
    return {
      ...state,
      isLoggedIn: false,
      loading: false,
      user: null,
      error: null,
      message: null,
    };
  }),
  on(
    AuthActions.fetchUserRolesAndPermissionsSuccessAction,
    (
      state: AuthState
    ): AuthState => {
      return {
        ...state,
        message: null,
        loading: false,
      };
    }
  ),
  on(
    AuthActions.fetchAddNewUserSuccessAction,
    (
      state: AuthState,
      {
        response
      }: { response: CommonResponse | null;}
    ): AuthState => {
      return {
        ...state,
        loading: false,
        error: null,
        message: null,
      };
    }
  ),
);
