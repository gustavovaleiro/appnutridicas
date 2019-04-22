import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { DicasPage } from '../dicas/dicas';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  @ViewChild('usuario') email;
  @ViewChild('senha') password;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public fire: AngularFireAuth, 
     public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  registrar(){
    //config da notificação
    let toast = this.toastCtrl.create({duration: 3000, position: 'bottom'});
    this.fire.auth.createUserWithEmailAndPassword(this.email.value, this.password.value)
      .then( data => {
        //caso email e senha esteja valido
        console.log('Data do login: ', data);
        toast.setMessage('Usuario registrado com sucesso');
        toast.present();
        this.navCtrl.setRoot(DicasPage);
      })
      .catch((error: any) => {
        if(error.code == 'auth/email-already-in-use'){
          toast.setMessage('E-mail digitado ja esta em uso.');
        } else if(error.code == 'auth/invalid-email'){
          toast.setMessage('E-mail digitado é invalido.');
        } else if(error.code == 'auth/operation-not-allowed'){
          toast.setMessage('Operação não permitida');
        } else if(error.code == 'auth/weak-password'){
          toast.setMessage('Senha muito fraca.');
        }
        toast.present();
      });

  }

}
