import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  private email$ = new BehaviorSubject<string>("");
  private fullName$ = new BehaviorSubject<string>("");
  constructor() { }
  
  public getFullNameFromStore(){
    return this.fullName$.asObservable();
  }

  public setFullNameForStore(fullName: string){
    this.fullName$.next(fullName);
  }

  public getEmailFormStore(){
    return this.email$.asObservable();
  }

  public setEmailForStore(Email:string){
    this.email$.next(Email);
  }

  
}
