import { Component, OnDestroy,OnInit } from '@angular/core';
import { AppMainComponent } from './app.main.component';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent  implements OnInit {

    items: MenuItem[];

    constructor(public appMain: AppMainComponent) { }
    
    ngOnInit(): void {
        
        this.items = [
            {
                label: 'Profile',
                icon: 'pi pi-fw pi-user'
            },
            {
                label: 'Setting',
                icon: 'pi pi-fw pi-cog'
            },
            {
                label: 'Log Out',
                icon: 'pi pi-fw pi-sign-out'
            },
        ];
    }
}
