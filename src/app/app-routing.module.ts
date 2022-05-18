// route guard
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppMainComponent } from './app.main.component';
import { LoginComponent } from './components/login/login.component';
import { MapComponent } from './components/map/map.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './core/auth.guard';

const routes: Routes = [
    { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
    { path: 'sign-in', component: LoginComponent },
    { path: 'register-user', component: RegisterComponent },
    { path: 'dashboard', component: AppMainComponent,canActivate: [AuthGuard],
        children: [
            {path: '', component: MapComponent},
        ]
    }
];

@NgModule({
    
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],

})

export class AppRoutingModule {}