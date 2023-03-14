import { Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { AuthGuard } from '@app/core/guards/auth.guard';
import { CpanelComponent } from '@app/shared/themes/layouts/cpanel/cpanel.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';

import { ADMIN_ROLE, USER_ROLE,SUPER_ADMIN_ROLE } from '@app/core/guards/user.roles';
import { UsersComponent } from '../pages/users/users.component';
import { ProjectsComponent } from '../pages/projects/projects.component';

export const dashboardRoutes: Routes = [
  {
    path: '',
    component: CpanelComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: [ADMIN_ROLE,SUPER_ADMIN_ROLE],
          },
        },
      },
      {
        path: 'users',
        component: UsersComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: [ADMIN_ROLE,SUPER_ADMIN_ROLE],
          },
        },
      },
      {
        path: 'projects',
        component: ProjectsComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: [ADMIN_ROLE,SUPER_ADMIN_ROLE],
          },
        },
      },
    ],
  }
];
