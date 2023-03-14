import {CommonResponse} from './common';

export interface Role{
  id:string;
  name:string;
}

export interface UserRoles extends CommonResponse{
  data:Role[];
}
