import { Injectable } from '@angular/core';
import { AngularFireAuthModule, AngularFireAuth } from "@angular/fire/auth";
import { User } from "../model/user.class";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isLogged: any = false;

  constructor(public afAuth: AngularFireAuth) {
    afAuth.authState.subscribe(user => (this.isLogged = user));
  }

  async onLogin(user:User): Promise<firebase.auth.UserCredential> {
    try {
      return await this.afAuth.auth.signInWithEmailAndPassword(
        user.email,
        user.password
      );
    } catch (error) {
      console.log('Error on login user', error);
    }
  }

  async onRegistrer(user:User): Promise<firebase.auth.UserCredential>{
    try{
      return await this.afAuth.auth.createUserWithEmailAndPassword(
        user.email,
        user.password
      );
    }catch (error){
      console.log('Error on register user', error)
    }
  }

}
