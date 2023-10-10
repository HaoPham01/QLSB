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
  public Email : string = "";
  public userId = localStorage['userId'];
  public fullName: string = "";
  constructor(private api: ApiService, private auth: AuthService, private userStore: UserStoreService) { }
  ngOnInit() {
    this.login = this.auth.isLoggedIn();
    if(this.login==true){
    this.userStore.getEmailFormStore().subscribe(val=>{
      let emailFromToken = this.auth.getEmailFromToken();
      this.Email = val || emailFromToken
    });
    localStorage.setItem('emailUser', this.Email);

    this.userStore.getFullNameFromStore().subscribe(val=>{
      let fullNamefromToken = this.auth.getFullNameFromToken();
      this.fullName = val || fullNamefromToken
    });
    localStorage.setItem('fullName', this.fullName);
    this.api.getIdByEmail(this.Email).subscribe(val=>{
      localStorage.setItem('userId', val);
    });

  }
}
  logout(){
    this.auth.logOut();
  }


}

