import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import {ModalComponent} from '@shared/components/modal/modal.component';
import {ModalService} from '@shared/components/modal/modal.service';
import {UserService} from '@shared/services/user.service';
import {Role} from '@shared/interfaces/user';
import { Store } from '@ngrx/store';
import { selectLoading } from '@app/modules/authentication/store/auth.selectors';
import { Observable } from 'rxjs';
import { addNewUserAction } from '@app/modules/authentication/store/auth.actions';
import { NotificationService } from '@app/core/services/notification.service';
@Component({
  selector: 'admin-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent implements OnInit {

  public loading$: Observable<boolean> = this.store.select(selectLoading);
  
  public form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    newPassword: ['', Validators.required],
    confirmNewPassword: [''],
    isActive: [true],
    fullname:['',Validators.required],
    phone:[''],
    RoleId:['']
  });;

  public userRoles:Role[] = [];
  
  @ViewChild('addUserModal') modal:ModalComponent<AdduserComponent> | undefined;
  
  constructor(private notificationService:NotificationService,private fb: FormBuilder,private userService:UserService,private store: Store) { }

  ngOnInit(): void {
    var that = this;
    this.userService.getUserRoles().subscribe((roles)=>{
      that.userRoles = roles.data;
      that.form.controls['RoleId'].setValue(this.userRoles[0].id,Validators.required);
    },(error)=>{
      console.log(error);
    });
  }

  async close(): Promise<void> {
    await this.modal?.close();
  }

  public addUser() {
    if(this.form.valid){
      this.form.controls['confirmNewPassword'].setValue(this.form.get('newPassword')?.value);
      this.userService.addNewUser(this.form.getRawValue()).subscribe({
        next:(response) => {
          this.notificationService.showNotification("User Added Successfully","success");
          this.close();
        },
        error:(error)=>{
          this.notificationService.showNotification(error.message,"error");
        }
      })
    }
  }

}
