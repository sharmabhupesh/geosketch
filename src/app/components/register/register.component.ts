import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppConfig } from 'src/app/api/appconfig';
import { AuthService } from 'src/app/core/auth.service';
import { ConfigService } from 'src/app/service/app.config.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  valCheck: string[] = ['remember'];

  password: string;
  
  config: AppConfig;
  
  subscription: Subscription;

  constructor(public configService: ConfigService,public authService: AuthService){ }

  ngOnInit(): void {
    this.config = this.configService.config;
    this.subscription = this.configService.configUpdate$.subscribe(config => {
      this.config = config;
    });
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

}
