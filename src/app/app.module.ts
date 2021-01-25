import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from "angularfire2";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { environment } from 'src/environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms' ;
import { ModalPage } from './modal/modal.page';
import { HttpClientModule } from '@angular/common/http';
import { Vibration } from '@ionic-native/vibration/ngx';
import { LoadingService } from './servicios/loading.service';
import { ToastService } from './servicios/toast.service';
import { AlertService } from './servicios/alert.service';

@NgModule({
  declarations: [AppComponent, ModalPage],
  entryComponents: [ModalPage],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    HttpClientModule,
    AppRoutingModule,
    AngularFireModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule
  ],
    
  providers: [
    StatusBar,
    SplashScreen,
    Vibration,
    LoadingService,
    ToastService,
    AlertService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
