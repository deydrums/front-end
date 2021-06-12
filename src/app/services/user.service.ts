import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { global } from './global';

@Injectable()

export class UserService {

    public url: string;
    public identity!: any;
    public token!: any;

    constructor(public _http: HttpClient){
        this.url = global.url;
    }

    signup(user:any, gettoken:any = null):Observable<any>{
        if(gettoken != null){
            user.gettoken = 'true';
        }
        let json = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url+'auth/login',json,{headers:headers});
    }
    // logout(gettoken:any = null):Observable<any>{
    //     this.token = 'Bearer ' + this.getToken();
    //     console.log(this.token);
    //     let headers = new HttpHeaders().set('Authorization',  this.token);
    //     console.log(headers);
    //     return this._http.post(this.url+'auth/logout',{headers:headers});
    // }
    logout(gettoken:any = null):Observable<any>{
        this.token = 'Bearer ' + this.getToken();
        console.log(this.token);
        let headers = new HttpHeaders().set('Authorization',  this.token);
        console.log(headers);
        
        return this._http.get(this.url+'auth/logout',{headers:headers});
    }
    getIdentity(){
        let identity = JSON.parse(localStorage.getItem('identity') || '{}');
        if(identity && identity != "undefined"){
            this.identity = identity;
        }else{
            this.identity = null;
        }
        return this.identity;
    }

    getToken(){
        let token = localStorage.getItem('token');
        if(token && token != "undefined"){
            this.token = token;
        }else{
            this.token = null;
        }
        return this.token;
    }
}