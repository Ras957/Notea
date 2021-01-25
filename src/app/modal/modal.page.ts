import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { note } from '../model/note';
import { TodoservicioService } from '../servicios/todoservicio.service';
import { NavController, ModalController} from '@ionic/angular';
import { LoadingService } from '../servicios/loading.service';
import { ToastService } from '../servicios/toast.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  // Data passed in by componentProps
  @Input() id: string;
  @Input() nota: note;

  todoForm: FormGroup;
  todo: note;

  constructor(private formBuilder: FormBuilder,
    private todoS: TodoservicioService,
    private nav:NavController,private modalCtrl:ModalController,
    public loading: LoadingService,
    public toast: ToastService) {
  }

    ngOnInit() {
      this.todoForm = this.formBuilder.group({
        title: [this.nota.title, Validators.required],
        description: [this.nota.description]
      });
    }

    goOut(){
      this.modalCtrl.dismiss();
    }

    editNote() {
      let data: note;
      data = {
        title: this.todoForm.get('title').value,
        description: this.todoForm.get('description').value
      }
      this.loading.present();
      this.todoS.updateTODO(this.id,data)
      .then((ok)=>{
        this.todoForm.reset();
        this.toast.present("Nota editada",'success');
      })
      .catch((err)=>{
        this.toast.present("Error",'danger',4000);
      })
      .finally(()=>{
        this.loading.dismiss();
        this.modalCtrl.dismiss();
      });
    }

}
