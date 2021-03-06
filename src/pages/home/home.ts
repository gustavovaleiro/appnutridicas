import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { DicasPage} from '../dicas/dicas';
import { RegisterPage } from '../register/register';
import { Users } from './users';
import { AngularFireAuth } from '@angular/fire/auth';
import { RecuperarPage } from '../recuperar/recuperar';
import fireBase from 'firebase';
import { TabsPage } from '../tabs/tabs';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('usuario') email;
  @ViewChild('senha') password;
  
  users: Users = new Users();
  tabBarElement: any;

  constructor(public navCtrl: NavController, 
    public toastCtrl: ToastController,
    public fire: AngularFireAuth) {
    this.tabBarElement = document.querySelector('.show-tabbar');
  }

  ionViewWillLeave(){
    let tabs = document.querySelectorAll('.show-tabbar');
    if(tabs!==null){
      Object.keys(tabs).map((key) =>{
        tabs[key].style.display='none';
      });
    }
  }

  ngAfterViewInit(){
  let tabs = document.querySelectorAll('.show-tabbar');
    if(tabs!==null){
      Object.keys(tabs).map((key) =>{
        tabs[key].style.display='none';
      });
    }
  }
  entrar(){
    let toast = this.toastCtrl.create({duration: 3000, position: 'bottom'});
    this.fire.auth.signInWithEmailAndPassword(this.email.value, this.password.value)
    .then( data =>{
      console.log('Data de login: ', data);
      this.users.email = this.email.value;
      this.users.senha = this.password.value;
      this.navCtrl.setRoot(TabsPage);
    })
    .catch((error: any) => {

      if(error.code == 'auth/invalid-email'){
        toast.setMessage('E-mail digitado é inválido.');
      } if(error.code == 'auth/user-disabled'){
        toast.setMessage('Usuário desativado.');
      } else if (error.code == 'auth/user-not-found'){
        toast.setMessage('Usuário não encontrado.');
      } else if (error.code == 'auth/wrong-password'){
        toast.setMessage('Senha errada.');
      }
      toast.present();
    });
  }
  cadastrar(){
    this.navCtrl.push(RegisterPage);
  }

  recuperar(){
    this.navCtrl.push(RecuperarPage);
  }

  loginWithFacebook(){
    this.fire.auth.signInWithPopup(new fireBase.auth.FacebookAuthProvider())
    .then(res => {
      this.navCtrl.setRoot(TabsPage);
    });
  }
  loginVisitante(){
    let toast = this.toastCtrl.create({duration: 3000, position: 'bottom'});
    this.fire.auth.signInAnonymously()
    .then( data =>{
      this.navCtrl.setRoot(TabsPage);
    })
    .catch((error: any) => {

      if(error.code == 'auth/operation-not-allowed'){
        toast.setMessage('Operação não permitida');
      } else {
        console.log('Error', error);
      }
      toast.present();
    });
  }
}
