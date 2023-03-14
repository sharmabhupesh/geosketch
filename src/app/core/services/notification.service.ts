import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Notification, Type } from '../interfaces/notification.interface';
import { getNotificationStatusAction } from '../store/notification/notification.actions';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private store: Store) { }

  public showNotification(message:string,type:Type){
    const notification: Notification = {
      message: $localize`${message}`,
      type: type,
    };
    this.store.dispatch(getNotificationStatusAction({ notification }));
  }
}
