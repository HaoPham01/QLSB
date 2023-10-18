import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { admin } from '../models/admin.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private REST_API_SERVER = environment.api;
  private httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json'
  }),
};
  constructor(private httpClient: HttpClient) {}

  // ------------------QUAN LY ADMIN------------------
  public getAllAdmins(): Observable<any>{
    const url = `${this.REST_API_SERVER}/Admin/get-admin`;
    return this.httpClient.get<any>(url, this.httpOptions);
  }
  public postAdmins(payload: any): Observable<any>{
    const url = `${this.REST_API_SERVER}/Admin/add-admin`;
    return this.httpClient.post<any>(url, payload, this.httpOptions);
  }
  public putAdmins(payload: any): Observable<any>{
    const url = `${this.REST_API_SERVER}/Admin/put-admin`;
    return this.httpClient.put<any>(url, payload, this.httpOptions);
  }
  public deleteAdmins(payload: any): Observable<any>{
    const url = `${this.REST_API_SERVER}/Admin/delete-admin`;
    return this.httpClient.post<any>(url, payload, this.httpOptions);
  }

  public search(payload: string): Observable<any>{
    const url = `${this.REST_API_SERVER}/Admin/search/${payload}`;
    return this.httpClient.get<any>(url, this.httpOptions);
  }

  public getIdByEmail(payload: string): Observable<any>{
    const url = `${this.REST_API_SERVER}/Admin/get-id-by-email/${payload}`;
    return this.httpClient.get<any>(url, this.httpOptions);
  }

  public getEmailById(payload: string): Observable<any>{
    const url = `${this.REST_API_SERVER}/Admin/get-email-by-id/${payload}`;
    return this.httpClient.get<any>(url, this.httpOptions);
  }

  public getNameByEmail(payload: string): Observable<any>{
    const url = `${this.REST_API_SERVER}/Admin/get-name-by-email/${payload}`;
    return this.httpClient.get<any>(url, this.httpOptions);
  }
  // ------------------QUAN LY ADMIN------------------



  // ------------------QUAN LY FIELD------------------
  public getAllField(): Observable<any>{
    const url = `${this.REST_API_SERVER}/Footballfield/get-footballfield`;
    return this.httpClient.get<any>(url, this.httpOptions);
  }
  public postField(payload: any): Observable<any>{
    const url = `${this.REST_API_SERVER}/Footballfield/add-footballfield`;
    return this.httpClient.post<any>(url, payload, this.httpOptions);
  }
  public putField(payload: any): Observable<any>{
    const url = `${this.REST_API_SERVER}/Footballfield/put-footballfield`;
    return this.httpClient.put<any>(url, payload, this.httpOptions);
  }
  public deleteField(payload: any): Observable<any>{
    const url = `${this.REST_API_SERVER}/Footballfield/delete-footballfield`;
    return this.httpClient.post<any>(url, payload, this.httpOptions);
  }

  public searchField(payload: string): Observable<any>{
    const url = `${this.REST_API_SERVER}/Footballfield/search/${payload}`;
    return this.httpClient.get<any>(url, this.httpOptions);
  }

  public getPrice(payload: number): Observable<any>{
    const url = `${this.REST_API_SERVER}/Price/get-price-field/${payload}`;
    return this.httpClient.get<any>(url, this.httpOptions);
  }
  public putPrice(payload: any): Observable<any>{
    const url = `${this.REST_API_SERVER}/Price/put-price`;
    return this.httpClient.put<any>(url, payload,this.httpOptions);
  }
   // ------------------QUAN LY FIELD------------------


   // ------------------QUAN LY USER------------------
   public getAllUsers(): Observable<any>{
    const url = `${this.REST_API_SERVER}/User/get-user`;
    return this.httpClient.get<any>(url, this.httpOptions);
  }
  public postUser(payload: any): Observable<any>{
    const url = `${this.REST_API_SERVER}/User/register`;
    return this.httpClient.post<any>(url, payload, this.httpOptions);
  }
  public putUser(payload: any): Observable<any>{
    const url = `${this.REST_API_SERVER}/User/put-user`;
    return this.httpClient.put<any>(url, payload, this.httpOptions);
  }
  public deleteUser(payload: any): Observable<any>{
    const url = `${this.REST_API_SERVER}/User/delete-user`;
    return this.httpClient.post<any>(url, payload, this.httpOptions);
  }

  public searchUser(payload: string): Observable<any>{
    const url = `${this.REST_API_SERVER}/User/search/${payload}`;
    return this.httpClient.get<any>(url, this.httpOptions);
  }

  // ------------------QUAN LY USER------------------



  // ------------------QUAN LY NEWS------------------
  uploadImage(image: File) {
    const formData = new FormData();
    formData.append('image', image);
    const url = `${this.REST_API_SERVER}/api/images`;
    return this.httpClient.post(url, formData);
  }

  // ------------------QUAN LY NEWS------------------



  // -------------------------------------STAFF---------------------------------------------------------------
  // ------------------BOOKING FIELD------------------
  getBookingField(){
    const url = `${this.REST_API_SERVER}/Booking/staff-get-booking`;
    return this.httpClient.get<any>(url, this.httpOptions);
  }
  getBookingFieldById(fieldId: any){
    const url = `${this.REST_API_SERVER}/Booking/staff-get-booking/${fieldId}`;
    return this.httpClient.get<any>(url, this.httpOptions);
  }
  getInvoice(BookingId: number){
    const url = `${this.REST_API_SERVER}/Invoice/staff-get-booking/${BookingId}`;
    return this.httpClient.get<any>(url, this.httpOptions);
  }
  getPriceInvoice(BookingId: number){
    const url = `${this.REST_API_SERVER}/Invoice/get-price-invoice/${BookingId}`;
    return this.httpClient.get<any>(url, this.httpOptions);
  }
  confirmInvoice(payload: any){
    const url = `${this.REST_API_SERVER}/Invoice/confirm-invoice`;
    return this.httpClient.post<any>(url, payload, this.httpOptions);
  }
  cancelInvoice(payload: any){
    const url = `${this.REST_API_SERVER}/Invoice/confirm-cancel-invoice`;
    return this.httpClient.post<any>(url, payload, this.httpOptions);
  }
  searchBookingByPhone(keyword: string): Observable<any>{
    const url = `${this.REST_API_SERVER}/Booking/staff-search-booking/${keyword}`;
    return this.httpClient.get<any>(url, this.httpOptions);
  }



  getService(BookingId: number){
    const url = `${this.REST_API_SERVER}/Service/get-service/${BookingId}`;
    return this.httpClient.get<any>(url, this.httpOptions);
  }
  addService(payload: any): Observable<any>{
    console.log('payload',payload);
    const url = `${this.REST_API_SERVER}/Service/add-service`;
    return this.httpClient.post<any>(url, payload, this.httpOptions);
  }
  removeService(svId: number){
    const url = `${this.REST_API_SERVER}/Service/remove-service/${svId}`;
    return this.httpClient.get<any>(url, this.httpOptions);
  }
  // ------------------BOOKING FIELD------------------

  // ------------------INVOICE-----------------------
  staffGetInvoice(day: any){
    console.log(day);
    const url = `${this.REST_API_SERVER}/Invoice/staff-get-invoice`;
    return this.httpClient.post<any>(url, day,this.httpOptions);
  }
}
