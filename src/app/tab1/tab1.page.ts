import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { note } from '../model/note';
import { TodoservicioService } from '../servicios/todoservicio.service';
import { Vibration } from '@ionic-native/vibration/ngx';
import { LoadingService } from '../servicios/loading.service';
import { ToastService } from '../servicios/toast.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  todoForm: FormGroup;
  todo: note;


  constructor(private formBuilder: FormBuilder,
    private todoS: TodoservicioService,
    public loading: LoadingService,
    public toast: ToastService,
    private vibration: Vibration) {

  }

  ngOnInit() {
    this.todoForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['']
    });
  }

  addNote() {
    let data: note;
    data = {
      title: this.todoForm.get('title').value,
      description: this.todoForm.get('description').value,
    }
    this.loading.present();
    this.todoS.addTODO(data)
    .then((ok)=>{
      this.todoForm.reset();
      this.toast.present("Nota agregada",'success');
      this.vibration.vibrate(1000);
    })
    .catch((err)=>{
      this.toast.present("Error",'danger',4000);
    })
    .finally(()=>{
      this.loading.dismiss();
    });
  }

}
