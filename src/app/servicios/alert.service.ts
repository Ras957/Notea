import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  myPromiseAlert:Promise<boolean>;

  constructor(public alertController:AlertController) { }

  async presentAlertConfirm() {
    let ok:boolean = false;
    const alert = await this.alertController.create({
      header: 'Confirmación ',
      message: '¿Desea borrar esta nota?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ok',
          handler: () => {
            ok = true;
            console.log('Confirm Okay');
          }
        }
      ]
    });
    await alert.present();

    return this.myPromiseAlert = new Promise((result, error) =>{
      alert.onWillDismiss().then(()=>{
        result(ok);
      }).catch((err) =>{
        error(err);
      });
    });
  }
}
