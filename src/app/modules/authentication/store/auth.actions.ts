import { createAction, props } from '@ngrx/store';
import {
  Credentials,
  ResetPasswordCredentials,
} from '../interfaces/credentials.interface';

import { User } from '@app/modules/user/interfaces/user.interface';
import { CommonResponse } from '@app/shared/interfaces/common';

export const authenticateAction = createAction(
  '[Auth] Authenticate',
  props<{ credentials: Credentials }>()
);

export const fetchAuthenticateSuccessAction = createAction(
  '[Auth] Authenticate Success',
  props<{ user: User;}>()
);

export const fetchAuthenticateFailureAction = createAction(
  '[Auth] Authenticate Failure',
  props<{ error: string }>()
);

export const forgotPasswordAction = createAction(
  '[Auth] Forgot Password',
  props<{ email: string }>()
);

export const fetchForgotPasswordSuccessAction = createAction(
  '[Auth] Forgot Password Success',
  props<{ message: string }>()
);

export const fetchForgotPasswordFailureAction = createAction(
  '[Auth] Forgot Password Failure',
  props<{ error: string }>()
);

export const resetPasswordAction = createAction(
  '[Auth] Reset Password',
  props<{ credentials: ResetPasswordCredentials }>()
);

export const fetchResetPasswordSuccessAction = createAction(
  '[Auth] Reset Password Success',
  props<{ message: string }>()
);

export const fetchResetPasswordFailureAction = createAction(
  '[Auth] Reset Password Failure',
  props<{ error: string }>()
);

export const getCurrentUserAction = createAction('[Auth] Get Current User');

export const fetchCurrentUserSuccessAction = createAction(
  '[Auth] Get Current User Success',
  props<{ user: User | null }>()
);

export const getUserRolesAndPermissionsAction = createAction(
  '[Auth] Get User Roles & Permissions'
);

export const fetchUserRolesAndPermissionsSuccessAction = createAction(
  '[Auth] Get User Roles & Permissions Success',
  props<{ roles: string[]; permissions: string[] }>()
);

export const logoutAction = createAction('[Auth] Logout',props<{userId:string | null}>());

export const fetchLogoutSuccessAction = createAction('[Auth] Logout Success');

export const addNewUserAction = createAction(
  '[Auth] Add New User',
  props<{ user: User }>()
);

export const fetchAddNewUserSuccessAction = createAction(
  '[Auth] Add New User Success',
  props<{ response: CommonResponse;}>()
);

export const fetchAddNewUserFailureAction = createAction(
  '[Auth] Add New User Failure',
  props<{ error: string }>()
);
