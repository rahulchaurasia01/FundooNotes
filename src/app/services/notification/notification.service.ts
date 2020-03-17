import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { take } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class NotificationService {

  currentMessage = new BehaviorSubject(null);

  constructor(private angularFireDB: AngularFireDatabase, private angularFireAuth: AngularFireAuth,
    private angularFireMessaging: AngularFireMessaging) {
try {
  

      this.angularFireMessaging.messaging.subscribe(
        (_messaging) => {
          _messaging.onMessage = _messaging.onMessage.bind(_messaging);
          _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
        }
      )
    } catch (error) {
  console.log('error in catch ',error);
  
    }
  }

  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        console.log(token);
        // this.updateToken(token);
      },
      error => {
        console.error("Unable to get permission to notify.", error);
      }
    )
  }

  receiveMessage() {
    this.angularFireMessaging.messages.subscribe(
      (payload) => {
        console.log("new message received: ", payload);
        this.currentMessage.next(payload);
      }
    )
  }

  updateToken(token) {
    this.angularFireAuth.authState.pipe(take(1)).subscribe(
      () => {
        const data = {};
        // data[userId] = token;
        this.angularFireDB.object('fcm/Tokens').update(data)
      }
    )
  }


}
