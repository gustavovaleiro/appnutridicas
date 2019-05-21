import { Injectable } from "@angular/core";
import {Http} from '@angular/http'
import { WORDPRESS_REST_API_URL } from "../config";
import { Observable } from "rxjs";
@Injectable()

export class WordpressService{

    constructor(public http: Http){}

    //puxando posts recentes da url usada
    getRecentsPosts(page: number = 1){
        return this.http.get(WORDPRESS_REST_API_URL + "posts?page="+page)
        .map(res => res.json());
    }


    //pegando author de cada post;
    getAuthor(author){
        return this.http.get(WORDPRESS_REST_API_URL+"users/"+author)
        .map(res => res.json());
    }

    //laço de captura das categorias de todos os posts
    getPostCategories(post){
         let observableBatch = [];
         post.categories.forEach(category => {
             observableBatch.push(this.getCategory(category));
         });

         return Observable.forkJoin(observableBatch);
    }

    //operação de captura da categoria do post
    getCategory(category){
        return this.http.get(WORDPRESS_REST_API_URL+"categories/"+category)
        .map(res => res.json());
    }
}