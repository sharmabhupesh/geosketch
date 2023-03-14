import { Component, OnInit,AfterViewInit } from '@angular/core';
import { AuthService } from '@app/modules/authentication/services/auth.service';
import { User } from '@app/modules/user/interfaces/user.interface';
import { ModalService } from '@app/shared/components/modal/modal.service';
import { h, html, Row, UserConfig } from "gridjs";
import { AdduserComponent } from '../../modals/adduser/adduser.component';
import {GridJsAngularComponent} from 'gridjs-angular';
import {NotificationService} from '@core/services/notification.service'
import { UserService } from '@app/shared/services/user.service';
@Component({
  selector: 'admin-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit,AfterViewInit {
  usersData!:any[];
  
  public usersGridConfig!: UserConfig;
  
  constructor(private userService:UserService,private notificationService:NotificationService,private authService:AuthService,private modalService: ModalService<AdduserComponent>) { }
  
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.authService.getAllUsers().subscribe((users)=>{
        this.usersData = users.data;
        this.usersData = this.usersData.map((user,index)=>{
          if(user.Role.name.toLowerCase() === "admin"){
            user.Role.aliasName = 'Admin';
            user.Role.bgClass = 'badge rounded-full bg-secondary/10 text-secondary dark:bg-secondary-light/15 dark:text-secondary-light';
          }
          else if(user.Role.name.toLowerCase()==="super admin"){
            user.Role.aliasName = 'Superadmin';
            user.Role.bgClass = 'badge rounded-full bg-secondary/10 text-secondary dark:bg-secondary-light/15 dark:text-secondary-light';
          }
          else{
            user.Role.aliasName = 'User';
            user.Role.bgClass = 'badge rounded-full bg-info/10 text-info dark:bg-info/15 dark:text-info';
          }
          user.sno = index+1;
          user.roleName = html(`<div class="${user.Role.bgClass}">${user.Role.aliasName}</div>`);
          return user;
        })
        this.usersGridConfig = {
          columns: [
            {
              id: "id",
              name: "UID",
              hidden:true
            },
            {
              id: "sno",
              name: "ID",
              formatter: (cell) => html(`<span class="mx-2">${cell}</span>`),
            },
            {
              id: "fullname",
              name: "Full Name",
              formatter: (cell) =>
                html(
                  `<span class="text-slate-700 dark:text-navy-100 font-medium">${cell}</span>`
                ),
            }, {
              id: "email",
              name: "Email",
            },
            {
              id: "phone",
              name: "Phone Number",
            },
            {
              id: "roleName",
              name: "Role"
            },
            {
              name: "Actions",
              sort: false,
              formatter: (cell,row) => {
                return h('div',{
                  className:'flex justify-center space-x-2',
                  children:[
                    h('button',{
                      className:'btn h-8 w-8 p-0 text-info hover:bg-info/20 focus:bg-info/20 active:bg-info/25',
                      children:[
                        h('i',{
                          className:'fa fa-edit'
                        })
                      ]
                    }),
                    h('button',{
                      className:'btn h-8 w-8 p-0 text-error hover:bg-error/20 focus:bg-error/20 active:bg-error/25',
                      children:[
                        h('i',{
                          className:'fa fa-trash-alt'
                        })
                      ],
                      onClick: () => this.deleteUser(row)
                    })
                  ]
                })
              } 
            }
          ],
          data :this.usersData,
          sort: true,
          search: true,
          fixedHeader: true,
          height: '250px',
          pagination: {
            enabled: true,
            limit: 10,
          },
          language:{
            'search':{
              'placeholder':'Search User By Name & Email....'
            }
          },
          className: {
            header: 'users-table-header'
          }
        };
        setTimeout(() => {
          let user_grid_js_head = document.getElementsByClassName('users-table-header');
          let addUserButtonContainer = document.getElementById('addUserButtonConatiner');
          if(user_grid_js_head.length>0 && addUserButtonContainer){
            user_grid_js_head[0].appendChild(addUserButtonContainer);
          }
        });
      },(error)=>{
      });
    });
  }

  ngOnInit(): void {
    this.usersData = [];
  }

  async showAddUser(): Promise<void> {
    const {AdduserComponent} = await import(
      '../../modals/adduser/adduser.component'
    );
    await this.modalService.open(AdduserComponent);
  }

  async deleteUser(row:Row){
    if(row.length>0 && this.usersGridConfig && this.usersData){
      var _uid = row.cells[0].data?row.cells[0].data:'';
      var _index = this.usersData.findIndex((x)=> x.id === _uid);
      if(_index>=0){
        this.userService.removeUser(_uid.toString()).subscribe((response)=>{
          console.log(response);
          this.usersData.splice(_index,1);
          this.usersGridConfig = {
            ...this.usersGridConfig,...{data:this.usersData.map((value,index)=>{
              value.sno = index+1;
              return value;
            })}
          }
          this.notificationService.showNotification("User Removed Successfully","success");
        },(error)=>{
          this.notificationService.showNotification(error.message,"error");
        })
      }
      else{
        this.notificationService.showNotification("User Id Not Valid","info");
      }
    }
  }
}
