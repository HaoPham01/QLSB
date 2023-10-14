import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/userpage/services/api.service';
import { AuthService } from 'src/app/userpage/services/auth.service';
import { UserStoreService } from 'src/app/userpage/services/user-store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  public login: boolean = false;
  public tokenPayload = "";
  public Email : string = "";
  public userId = localStorage['userId'];
  public fullName= "";
  constructor(private api: ApiService, private auth: AuthService, private userStore: UserStoreService) { }
  ngOnInit() {
    this.login = this.auth.isLoggedIn();
    this.tokenPayload = this.auth.decodedToken().role;
    this.fullName = this.auth.decodedToken().unique_name;
    localStorage.setItem('fullName', this.fullName);
    if(this.login==true && this.tokenPayload == null){
    this.userStore.getEmailFormStore().subscribe(val=>{
      let emailFromToken = this.auth.getEmailFromToken();
      this.Email = val || emailFromToken
      this.api.getIdByEmail(this.Email).subscribe(res=>{
        localStorage.setItem('userId', res);
      });
      localStorage.setItem('emailUser', this.Email);
    });
  }
}
  logout(){
    this.auth.logOut();
  }
}

