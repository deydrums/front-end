import { Component, OnInit } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
  providers: [UserService]
})
export class LogoutComponent implements OnInit {
  public page_title: string;
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
    
    this.page_title = 'Cerrando sesion';
   }

  ngOnInit(): void {
    this.logout();
  }

  logout() {
    this._userService.logout(this._userService.getToken()).subscribe(
      response =>{
        console.log(response);
        localStorage.removeItem('identity');
        localStorage.removeItem('token');
        this.identity = null;
        this.token = null;
        //Redireccion a inicio
        this._router.navigate(['inicio']);
      },
      error=>{
        console.log(error);
        this._router.navigate(['inicio']);
      }
    )
  }
}
