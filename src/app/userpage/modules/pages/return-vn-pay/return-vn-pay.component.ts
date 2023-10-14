import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/adminpage/services/auth.service';
import { DataService } from 'src/app/adminpage/services/data.service';
import { ApiService } from 'src/app/userpage/services/api.service';
import { UserStoreService } from 'src/app/userpage/services/user-store.service';


@Component({
  selector: 'app-return-vn-pay',
  templateUrl: './return-vn-pay.component.html',
  styleUrls: ['./return-vn-pay.component.scss']
})
export class ReturnVnPayComponent implements OnInit {
  constructor(private route: ActivatedRoute ,private api: ApiService, private auth: AuthService, private userStore: UserStoreService, private messageService: MessageService) { }
  
  payload ={
    vnp_Amount: 0,
    vnp_BankCode: '',
    vnp_BankTranNo: '',
    vnp_CardType: '',
    vnp_OrderInfo: '',
    vnp_PayDate: Date.now(),
    vnp_TmnCode: '',
    vnp_TransactionNo: 0,
  }
  payloadPost = {
    vnp_SecureHash: '',
    vnp_ResponseCode: '',
    vnp_TransactionStatus: '',
    vnp_TxnRef: 0,
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.payload.vnp_Amount = params['vnp_Amount'];
      this.payload.vnp_BankCode = params['vnp_BankCode'];
      this.payload.vnp_BankTranNo = params['vnp_BankTranNo'];
      this.payload.vnp_CardType = params['vnp_CardType'];
      this.payload.vnp_OrderInfo = params['vnp_OrderInfo'];
      this.payload.vnp_PayDate = params['vnp_PayDate'];
      this.payloadPost.vnp_ResponseCode = params['vnp_ResponseCode'];
      this.payload.vnp_TmnCode = params['vnp_TmnCode'];
      this.payload.vnp_TransactionNo = params['vnp_TransactionNo'];
      this.payloadPost.vnp_TransactionStatus = params['vnp_TransactionStatus'];
      this.payloadPost.vnp_TxnRef = params['vnp_TxnRef'];
      this.payloadPost.vnp_SecureHash  = params['vnp_SecureHash'];
      // ... Lấy các tham số khác tương tự
      console.log(this.payload);
    });
    if(this.payloadPost.vnp_SecureHash == null)
      console.log('loi')
    else{
      this.api.postResult(this.payloadPost).subscribe(
        response => {
          // Xử lý kết quả từ API tại đây
          console.log(response.message);
        },
        error => {
          // Xử lý lỗi tại đây
          console.log(error.message);
        }
      );
    }
  
  }
}

