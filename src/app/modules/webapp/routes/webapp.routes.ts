import { Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { AuthGuard } from '@app/core/guards/auth.guard';
import { ADMIN_ROLE, USER_ROLE,SUPER_ADMIN_ROLE } from '@app/core/guards/user.roles';
import { WebappComponent } from '../pages/webapp/webapp.component';
import { UpanelComponent } from '@app/shared/themes/layouts/upanel/upanel.component';

export const webappRoutes: Routes = [
  {
    path: '',
    component: UpanelComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: WebappComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: [ADMIN_ROLE,SUPER_ADMIN_ROLE,USER_ROLE],
          },
        },
      }
    ],
  }
];
