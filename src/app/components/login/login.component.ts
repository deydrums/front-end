import { Component, OnInit } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  public page_title: string;
  public user:User;
  public status!:string;
  public token:any;
  public identity:any;
  public error!:any;
  public name!: string;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.page_title = 'Identificate';
    this.user = new User(1,'','','ROLE_USER','','','','');
   }

  ngOnInit(): void {
  }
  onSubmit(form:any){
    this._userService.signup(this.user).subscribe(
      response =>{
        //TOKEN
        this.token = response.token;
        this.identity = response.user;
        console.log(this.token);
        console.log(this.identity);
        this.status = 'success';
        //Persistir datos usuario identificado
        localStorage.setItem('token', this.token);
        localStorage.setItem('identity', JSON.stringify(this.identity));
        //Redireccion a inicio
        this.name = this.identity['name'] + ' ' + this.identity['surname'];
        this._router.navigate(['inicio']);
      },
      error =>{
        console.log(error);
        this.status = 'error';
        this.error = error.error.message;
      }
    );
  }
}
