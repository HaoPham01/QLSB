import { Component, OnInit } from '@angular/core';
import { admin } from 'src/app/adminpage/models/admin.model';
import { AdminStoreService } from 'src/app/adminpage/services/admin-store.service';
import { AuthService } from 'src/app/adminpage/services/auth.service';
import { DataService } from 'src/app/adminpage/services/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public Email : string = "";
  public role: string = "";
  constructor(private dataService: DataService, private auth: AuthService, private adminStore: AdminStoreService) { }
  ngOnInit() {
  this.adminStore.getEmailFormStore().subscribe(val=>{
    let emailFromToken = this.auth.getEmailFromToken();
    this.Email = val || emailFromToken
  });

  this.adminStore.getRoleFromStore().subscribe(val=>{
    let roleFromToken = this.auth.getRoleFromToken();
    this.role = val || roleFromToken
  }) ;
  localStorage.setItem('emailAdmin', this.Email);
  }
  
  logout(){
    this.auth.logOut();
  }
}
