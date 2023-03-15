import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebappComponent } from './pages/webapp/webapp.component';
import { RouterModule } from '@angular/router';
import { webappRoutes } from './routes/webapp.routes';



@NgModule({
  declarations: [
    WebappComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(webappRoutes),
  ]
})
export class WebappModule { }
