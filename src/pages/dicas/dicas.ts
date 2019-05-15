import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { HomePage } from '../home/home';
import { WordpressService } from '../../services/wordpress.services';
import { PostPage } from '../post/post';

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
  posts: Array<any> =  new Array<any>();
  morePagesAvailable: boolean = true;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public fire: AngularFireAuth,
    public loadingCtrl: LoadingController,
    public wordpressService: WordpressService) {


  }

  ionViewWillEnter(){
    this.morePagesAvailable = true;
    if(!(this.posts.length > 0)){
      let loading = this.loadingCtrl.create();
      loading.present();
      this.wordpressService.getRecentsPosts()
       .subscribe(data =>{
         for (let post of data){
           post.excerpt.rendered = post.excerpt.rendered.split('<a')[0] + "<p>"
           this.posts.push(post)
          }
          loading.dismiss();
       })
    }
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
  postTapped($event, post){
    this.navCtrl.push(PostPage,{item: post});
  }
  doInfinite(infiniteScroll){
    let page = (Math.ceil(this.posts.length/10))+1;
    let loading = true;

    this.wordpressService.getRecentsPosts(page)
      .subscribe(data =>{
        for( let post of data){
          if(!loading){
            infiniteScroll.complete();
          }
          this.posts.push(post);
          loading=false;
        }
      }, err => {
        this.morePagesAvailable = false;
      });
  }
  doRefresh(refresher){
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }
}
