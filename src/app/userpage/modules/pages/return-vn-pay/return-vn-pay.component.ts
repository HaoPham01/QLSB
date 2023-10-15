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
  title = '';
  content = '';
  iconStatus = false;
  payload ={
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
    vnp_Amount: 0,
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.payloadPost.vnp_Amount = params['vnp_Amount'];
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
      if (this.payloadPost.vnp_TransactionStatus === "00") {
        this.title = "Giao dịch thành công";
        this.iconStatus = true;
      } else if (this.payloadPost.vnp_TransactionStatus === "01") {
        this.title = "Giao dịch chưa hoàn tất";
      } else if (this.payloadPost.vnp_TransactionStatus === "02") {
        this.title = "Giao dịch bị lỗi";
      } else if (this.payloadPost.vnp_TransactionStatus === "04") {
        this.title = "Giao dịch đảo";
      } else if (this.payloadPost.vnp_TransactionStatus === "05") {
        this.title = "VNPAY đang xử lý giao dịch này (GD hoàn tiền)";
      } else if (this.payloadPost.vnp_TransactionStatus === "06") {
        this.title = "VNPAY đã gửi yêu cầu hoàn tiền sang Ngân hàng (GD hoàn tiền)";
      } else if (this.payloadPost.vnp_TransactionStatus === "07") {
        this.title = "Giao dịch bị nghi ngờ gian lận";
      } else if (this.payloadPost.vnp_TransactionStatus === "09") {
        this.title = "GD Hoàn trả bị từ chối";
      } else {
        this.title = "Trạng thái giao dịch không hợp lệ";
      }
      if (this.payloadPost.vnp_ResponseCode === "00") {
        
      } else if (this.payloadPost.vnp_ResponseCode === "07") {
        this.content = "Trừ tiền thành công. Giao dịch bị nghi ngờ (liên quan tới lừa đảo, giao dịch bất thường).";
      } else if (this.payloadPost.vnp_ResponseCode === "09") {
        this.content = "Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng chưa đăng ký dịch vụ InternetBanking tại ngân hàng.";
      } else if (this.payloadPost.vnp_ResponseCode === "10") {
        this.content = "Giao dịch không thành công do: Khách hàng xác thực thông tin thẻ/tài khoản không đúng quá 3 lần";
      } else if (this.payloadPost.vnp_ResponseCode === "11") {
        this.content = "Giao dịch không thành công do: Đã hết hạn chờ thanh toán. Xin quý khách vui lòng thực hiện lại giao dịch.";
      } else if (this.payloadPost.vnp_ResponseCode === "12") {
        this.content = "Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng bị khóa.";
      } else if (this.payloadPost.vnp_ResponseCode === "13") {
        this.content = "Giao dịch không thành công do Quý khách nhập sai mật khẩu xác thực giao dịch (OTP). Xin quý khách vui lòng thực hiện lại giao dịch.";
      } else if (this.payloadPost.vnp_ResponseCode === "24") {
        this.content = "Giao dịch không thành công do: Khách hàng hủy giao dịch";
      } else if (this.payloadPost.vnp_ResponseCode === "51") {
        this.content = "Giao dịch không thành công do: Tài khoản của quý khách không đủ số dư để thực hiện giao dịch.";
      } else if (this.payloadPost.vnp_ResponseCode === "65") {
        this.content = "Giao dịch không thành công do: Tài khoản của Quý khách đã vượt quá hạn mức giao dịch trong ngày.";
      } else if (this.payloadPost.vnp_ResponseCode === "75") {
        this.content = "Ngân hàng thanh toán đang bảo trì.";
      } else if (this.payloadPost.vnp_ResponseCode === "79") {
        this.content = "Giao dịch không thành công do: KH nhập sai mật khẩu thanh toán quá số lần quy định. Xin quý khách vui lòng thực hiện lại giao dịch";
      } else if (this.payloadPost.vnp_ResponseCode === "99") {
        this.content = "Các lỗi khác (lỗi còn lại, không có trong danh sách mã lỗi đã liệt kê)";
      } else {
        this.content = "Trạng thái giao dịch không hợp lệ";
      }
      
    }
    }
}

