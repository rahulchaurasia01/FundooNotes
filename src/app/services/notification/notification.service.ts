import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from "../user/user.service";
import { take } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Notification } from 'src/app/Model/notification';

@Injectable()
export class NotificationService {

  chckError: string;
  currentMessage = new BehaviorSubject(null);

  constructor(private angularFireDB: AngularFireDatabase, private angularFireAuth: AngularFireAuth,
    private angularFireMessaging: AngularFireMessaging, private _snackBar: MatSnackBar,
    private user: UserService) {
    try {


      this.angularFireMessaging.messaging.subscribe(
        (_messaging) => {
          _messaging.onMessage = _messaging.onMessage.bind(_messaging);
          _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
        }
      )
    } catch (error) {
      console.log('error in catch ', error);

    }
  }

  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {

        if (localStorage.getItem("fundooNotification") == null) {

          localStorage.setItem("fundooNotification", token);

          var notificationToken: Notification = {
            Token: token
          };

          this.user.notification(notificationToken).
            subscribe(data => {
              if (!data.status) {
                this._snackBar.open(data.message, "Close", {
                  duration: 5000,
                });
              }
            },
              error => {
                if (error.error.message)
                  this.chckError = error.error.message;
                else
                  this.chckError = "Connection to the Server Failed";

                this._snackBar.open(this.chckError, "Close", {
                  duration: 3000,
                });
              }
            )
        }

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
