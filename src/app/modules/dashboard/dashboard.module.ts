import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { dashboardRoutes } from './routes/dashboard.routes';
import { UsersComponent } from './pages/users/users.component';

import { GridJsAngularModule } from 'gridjs-angular';
import { AdduserComponent } from './modals/adduser/adduser.component';

import {ModalModule} from '@shared/components/modal/modal.module';
import { TomselectDirective } from '../../shared/directives/tomselect.directive';
import { ProjectsComponent } from './pages/projects/projects.component';

@NgModule({
  declarations: [
    DashboardComponent,
    UsersComponent,
    AdduserComponent,
    TomselectDirective,
    ProjectsComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    GridJsAngularModule,
    ModalModule,
    RouterModule.forChild(dashboardRoutes),
  ],
  exports: [TomselectDirective],
  providers: [],
})
export class DashboardModule { }
