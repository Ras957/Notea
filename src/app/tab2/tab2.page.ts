import { Component } from '@angular/core';
import { TodoservicioService } from '../servicios/todoservicio.service';
import { LoadingController, ToastController, AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { analytics } from 'firebase';
import { Subscription } from 'rxjs';
import { note } from '../model/note';
import { ModalPage } from '../modal/modal.page';
import { AngularFireAuth } from "@angular/fire/auth";
import { AuthService } from "../servicios/auth.service";
import { Vibration } from '@ionic-native/vibration/ngx';
import { LoadingService } from '../servicios/loading.service';
import { ToastService } from '../servicios/toast.service';
import { AlertService } from '../servicios/alert.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public listadoPanel;
  public listado$;
  public textoBuscado='';

  constructor(private todoS: TodoservicioService,
    public loading: LoadingService,
    public toast: ToastService,
    private router:Router,
    public alert: AlertService,
    public modalCtrl: ModalController,
    private authSvc: AuthService,
    private afAuth: AngularFireAuth,
    private vibration: Vibration) { }

  onLogout(){
    console.log('Logout!');
    this.afAuth.auth.signOut();
    this.router.navigateByUrl('/login');
  }

  ngOnInit() {
    this.refrescar();
  }

  ionViewDidEnter() {
    //this.refrescar();
  }



  public borrarNota(id: string) {
    console.log("BORRANDO...");
    this.todoS.deleteTODO(id).then((salida) => {
      this.refrescar();
      this.toast.present("Nota borrada",'dark');
    }).catch((err) => {
      console.log(err);
      this.toast.present("Error",'danger',4000);
      this.vibration.vibrate(1000);
    });
  }

  public borrar(id:string){
    this.alert.presentAlertConfirm().then((success:boolean)=>{
      if(success){
        this.borrarNota(id);
      }
      
    })
  }

  private async refrescar() {
    await this.loading.present();
    let subscripcion:Subscription;
    let tempo:any;
    try {
      this.todoS.readTODO2().subscribe((lista)=>{
        this.listadoPanel = lista;
        this.loading.dismiss();
        },
        error => {

        });
    } catch (err) {
      this.loading.dismiss();
    }
    console.log("Solicitada la petición");
  }

  public doRefresh(e: any) {
    this.listadoPanel = [];
    console.log("Cargando notas");
    let myObservable = this.todoS.readTODO();
    myObservable.subscribe((lista) => {
      this.listadoPanel = [];
      lista.docs.forEach((nota) => {
        this.listadoPanel.push({ id: nota.id, ...nota.data() });
      });
      e.target.complete();
    });
    
  }

  async openModal(id:string,data:note) {
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      componentProps: {
        'id': id,
        'nota': data
      }
    });
    return await modal.present();
  }


  public toAdd():void{
    this.router.navigateByUrl('/tabs/tab1');
  }

  public buscarNota(e:any){
    const texto = e.target.value;
    this.textoBuscado = texto;
  }

}
