import { NgModule } from '@angular/core';
import { NgxPermissionsModule } from 'ngx-permissions';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { ThemeModule } from './themes/theme.module';
import { InputsModule } from './components/inputs/inputs.module';
import { AlertModule } from './components/alert/alert.module';
import { ButtonModule } from './components/buttons/button.module';
import { HeadingModule } from './components/headings/heading.module';
import { SkeletonModule } from './components/skeletons/skeleton.module';
import { SnippetModule } from './components/snippets/snippet.module';
import { TextareaModule } from './components/textarea/textarea.module';
import { StatusColorPipe } from './pipes/status-color.pipe';

import { NotificationsModule } from './components/notifications/notifications.module';
import { StatusValuePipe } from './pipes/status-value.pipe';

import { FormsModule , ReactiveFormsModule} from '@angular/forms';

const DECLARATIONS = [StatusColorPipe, StatusValuePipe];
const MODULES = [
  AlertModule,
  ThemeModule,
  ButtonModule,
  InputsModule,
  HeadingModule,
  SkeletonModule,
  SnippetModule,
  TextareaModule,
  NotificationsModule,
  FormsModule,
  ReactiveFormsModule
];

@NgModule({
  declarations: DECLARATIONS,
  imports: [...MODULES,AngularSvgIconModule.forRoot()],
  exports: [...DECLARATIONS, ...MODULES, NgxPermissionsModule],
})
export class SharedModule {}
