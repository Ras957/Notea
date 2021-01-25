import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../servicios/auth.service";
import { User } from "../model/user.class";
import { ToastService } from '../servicios/toast.service';
import { LoadingService } from '../servicios/loading.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user:User = new User();

  constructor(private authSvc:AuthService,
      private router: Router,
      private toast: ToastService,
      private loading: LoadingService) { }

  ngOnInit() {
  }

  async onRegister(): Promise<void>{
    const user = await this.authSvc.onRegistrer(this.user);
    if (user){
      console.log('Successfully created user!');
      this.router.navigateByUrl('/');
      this.loading.present();
    }else{
      this.toast.present("Introduzca un email válido y una contraseña con 6 caráteres o más",
      "danger",10000);
    }
  }
}
