import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(public toastController:ToastController) { }

  async present(msg:string, col:string, dur:number=2000):Promise<void> {
    const toast = await this.toastController.create({
      message: msg,
      duration: dur,
      color: col,
      showCloseButton: true
    });
    toast.present();
  }
}
