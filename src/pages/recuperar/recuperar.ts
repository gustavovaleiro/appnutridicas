import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';

/**
 * Generated class for the RecuperarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recuperar',
  templateUrl: 'recuperar.html',
})
export class RecuperarPage {

  @ViewChild('email') emailDigitado;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public toastCtrl: ToastController, public fire: AngularFireAuth) {
  }

  recuperar(){
    let toast = this.toastCtrl.create({duration: 2500, position: 'bottom'});
    
    this.fire.auth.sendPasswordResetEmail(this.emailDigitado.value)
      .then( () => {
        toast.setMessage("Solicitação enviada para o e-mail informado!");
        toast.present();
        this.navCtrl.pop();
      })
      .catch((error: any) => {
        if(error.code == 'auth/invalid-email')
          toast.setMessage("E-mail inválido.");
        else if (error.code == 'auth/user-not-found')
          toast.setMessage("Usuário não encontrado.");
        
        toast.present();
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecuperarPage');
  }

}
