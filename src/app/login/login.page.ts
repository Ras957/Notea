import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../servicios/auth.service";
import { User } from "../model/user.class";
import { ToastService } from '../servicios/toast.service';
import { LoadingService } from '../servicios/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user:User = new User();

  constructor(private router: Router, private authSvc:AuthService,
    private toast:ToastService, private loading: LoadingService) { }

  ngOnInit() {
  }

  async onLogin(){
    const user = await this.authSvc.onLogin(this.user);
    if (user){
      console.log('Successfully logged in!');
      this.loading.present();
      this.router.navigateByUrl('/');
    }else{
      this.toast.present("Error de inicio de sesión, si no tiene cuenta registrese",
      "danger",10000);
    }
  }

}
