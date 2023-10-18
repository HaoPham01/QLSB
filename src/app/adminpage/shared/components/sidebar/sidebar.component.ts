import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/adminpage/services/auth.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  constructor(private router: Router, private auth: AuthService) { }
  items!: MenuItem[];

  ngOnInit() {
    const tokenPayload = this.auth.decodedToken();
    if (tokenPayload.role == 'admin') {
      this.items = [
        {
          label: 'Dashboard',
          icon: 'pi pi-fw pi-home',
          command: () => this.router.navigate(['admin'])
        },
        {
          label: 'Quản lý tài khoản Admins',
          icon: 'pi pi-fw pi-user',
          command: () => this.router.navigate(['admin/pages/qladmin'])
        },
        {
          label: 'Quản lý tài khoản khách hàng',
          icon: 'pi pi-fw pi-users',
          command: () => this.router.navigate(['admin/pages/qluser'])
        },
        {
          label: 'Quản lý sân bóng',
          icon: 'pi pi-fw pi-money-bill',
          command: () => this.router.navigate(['admin/pages/qlfield'])
        },
        {
          label: 'Quản lý tin tức sân bóng',
          icon: 'pi pi-fw pi-book',
          command: () => this.router.navigate(['admin/pages/qlnews'])
        },
        {
          label: 'Quản lý phản hồi',
          icon: 'pi pi-fw pi-comments',
          command: () => this.router.navigate([''])
        },
        {
          label: 'Xem lịch sử đặt sân',
          icon: 'pi pi-fw pi-calendar',
          command: () => this.router.navigate([''])
        },
        {
          label: 'Xem lịch sử hóa đơn',
          icon: 'pi pi-fw pi-file',
          command: () => this.router.navigate([''])
        },
        {
          label: 'Thống kê doanh thu sân bóng',
          icon: 'pi pi-fw pi-chart-line',
          command: () => this.router.navigate([''])
        },
      ];
    } else if (tokenPayload.role == 'staff') {
      this.items = [
        {
          label: 'Lịch đặt sân',
          icon: 'pi pi-fw pi-calendar',
          //command: () => this.router.navigate(['staff/pages/qlbooking'])
          items: [
            {
                label: 'Lịch sân hôm nay',
                icon: 'pi pi-fw pi-money-bill',
                command: () => this.router.navigate(['staff/pages/qlbooking'])
            },
            {
                label: 'Lịch sân tổng',
                icon: 'pi pi-fw pi-money-bill',
                command: () => this.router.navigate(['staff/pages/qlbookingall'])
            }
        ]
        },
        {
          label: 'Lịch sử hóa đơn',
          icon: 'pi pi-fw pi-file',
          command: () => this.router.navigate(['staff/pages/qlinvoice'])
        },
        {
          label: 'Kết toán danh thu',
          icon: 'pi pi-fw pi-dollar',
          command: () => this.router.navigate(['staff/pages/qlbooking'])
        },
      ];
    }
  }
}
