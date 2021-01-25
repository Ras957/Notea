import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit () {
    firebase.initializeApp({
    apiKey: 'AIzaSyC0CRx56sDOsQUb-ZZPFUVHqm25Lc2AU1o',
    authDomain: 'notea-7ffb6.firebaseapp.com',
    projectId: "notea-7ffb6",
    });
    }
}
