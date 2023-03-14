import { Pagination } from '@app/shared/interfaces/response.interface';
import { DefaultState } from '@app/shared/interfaces/state.interfaces';
import { CommonResponse } from '@app/shared/interfaces/common';

export interface UserState extends DefaultState {
  pagination: Pagination;
}

export class AuthResponse implements CommonResponse{
  code!: string;
  message!: string;
  uuid!: string;
}

export type RoleType = "user" | "admin" | "super admin";

export class Role {
  id!: string;
  name!:RoleType;
  aliasName?:string;
  bgClass?:string;
}

export interface FromDate {
  date: Date;
  timezone_type: number;
  timezone: string;
}

export class User {
  id!: string;
  fullname!:string;
  email!: string;
  phone?:string;
  isActive!:boolean;
  Role!: Role;
  RoleId!:string;
  newPassword?:string;
  confirmNewPassword?:string;
}

export class UserResponse implements CommonResponse{
  code!:string;
  message!:string;
  data!:User
}

export class MultiUserResponse implements CommonResponse{
  code!:string;
  message!:string;
  data!:User[];
  total!:number;
}
