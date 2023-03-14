import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import {SimplebarDirective} from '../../directives/simplebar.directive';


@NgModule({
  declarations: [
    ModalComponent,
    SimplebarDirective
  ],
  imports: [
    CommonModule
  ],
  exports:[ModalComponent]
})
export class ModalModule { }
