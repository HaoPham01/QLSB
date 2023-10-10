import { Component, OnInit } from '@angular/core';
import { Calendar, CalendarOptions } from '@fullcalendar/core';
import { ApiService } from 'src/app/userpage/services/api.service';
import { AuthService } from 'src/app/userpage/services/auth.service';
import { UserStoreService } from 'src/app/userpage/services/user-store.service';
import { ViewChild } from '@angular/core';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  
  public Email : string = "";
  public user: any = [];
  constructor(private api: ApiService, private auth: AuthService, private userStore: UserStoreService) { }
  ngOnInit() {
  }



}

