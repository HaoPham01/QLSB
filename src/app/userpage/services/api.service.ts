import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResetPassword } from 'src/app/adminpage/models/reset-password.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl:string = 'https://localhost:7199/User/'
  private baseUrlBooking:string = 'https://localhost:7199/Booking/'
  private baseUrlFootballField:string = 'https://localhost:7199/Footballfield/'
  private baseUrlVnpay:string = 'https://localhost:7199/VnPayment/'
  constructor(private http: HttpClient) { }

  // ------------------------------AuthUser-----------------------------------------------
  getUsers(){
    return this.http.get<any>(this.baseUrl);
  }

  sendResetPasswordLink(email: string){
    return this.http.post<any>(`${this.baseUrl}send-reset-email/${email}`, {})
  }

  resetPassword(resetPasswordObj: ResetPassword){
    return this.http.post<any>(`${this.baseUrl}reset-password`, resetPasswordObj);
  }

  public getIdByEmail(payload: string){
    return this.http.get<any>(`${this.baseUrl}get-id-by-email/${payload}`);
  }
  // ------------------------------AuthUser-----------------------------------------------

  // ------------------------------Calendar-----------------------------------------------
  getBookingFromFieldId(payload: any){
    return this.http.get<any>(`${this.baseUrlBooking}get-booking/${payload}`);
  }
  getBooking(){
    return this.http.get<any>(`${this.baseUrlBooking}get-booking`);
  }
  getFieldList(){
    return this.http.get<any>(`${this.baseUrlBooking}get-field-list`);
  }
  getPriceField(field1: number, start1: string, end1: string){
    return this.http.get<any>(`${this.baseUrlBooking}get-price-from-time/${field1}/${start1}/${end1}`);
  }
  addBooking(payload: any){
    return this.http.post<any>(`${this.baseUrlBooking}add-booking`, payload);
  }
  getNameFieldById(id: number){
    return this.http.get<any>(`${this.baseUrlFootballField}get-name-field-by-id/${id}`);
  }
  // ------------------------------Calendar-----------------------------------------------



  // ------------------------------CheckOut-----------------------------------------------
  getBookingById(bookingId: any){
    return this.http.get<any>(`${this.baseUrlBooking}get-booking-by-bookingid/${bookingId}`);
  }



  // ------------------------------CheckOut-----------------------------------------------
  // ------------------------------VNPAy--------------------------------------------------
  // getVnpay(typePaymentVN: number, orderCode: number){
  //   console.log(typePaymentVN, orderCode);
  //   return this.http.get<any>(`${this.baseUrlVnpay}get-url/${typePaymentVN}/${orderCode}`);
  // }

  // getVnpay(typePaymentVN: number, orderCode: number){
  //   return this.http.get<any>(`${this.baseUrlVnpay}get-url/${typePaymentVN}/${orderCode}`);
  // }
  getVnpay(typePaymentVN: number, orderCode: number): Observable<string> {
    return this.http.get<string>(`${this.baseUrlVnpay}get-url/${typePaymentVN}/${orderCode}`);
  }
}
