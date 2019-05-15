import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

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
}
