import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { HomePage } from '../home/home';

/**
 * Generated class for the DicasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dicas',
  templateUrl: 'dicas.html',
})
export class DicasPage {

  email: string;
  fotoPerfil: boolean = false;
  facebook = {
    nome: '',
    fotoURL: '',
  }
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public fire: AngularFireAuth) {

    this.email = fire.auth.currentUser.email;

    this.facebook.nome = fire.auth.currentUser.displayName;
    this.facebook.fotoURL = fire.auth.currentUser.photoURL;
    if(this.facebook.fotoURL == null)
      this.fotoPerfil = false;
    else
      this.fotoPerfil = true;
  }

  logout(){
    let toast = this.toastCtrl.create({duration: 3000, position: 'bottom'})
    this.fire.auth.signOut();
    toast.setMessage('Deslogado com sucesso!');
    toast.present();
    this.navCtrl.setRoot(HomePage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad DicasPage');
  }

}
