import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from '../../guards/auth.guard';
import { FootballfieldComponent } from './footballfield/footballfield.component';
import { UserComponent } from './user/user.component';
import { NewsComponent } from './news/news.component';

const routes: Routes = [
  // { path: '', component: DashboardComponent},
  { path: 'qladmin', component: AdminComponent,},
  { path: 'qlfield', component: FootballfieldComponent,},
  { path: 'qluser', component: UserComponent,},
  { path: 'qlnews', component: NewsComponent,}
  // { path: 'admin', loadChildren: () => import('./admin/admin.module').then((m) => m.AdminMoudle) },

//   { path: 'quan-ly-nhan-su', loadChildren: () => import('./quan-ly-nhan-su/quan-ly-nhan-su.module').then((m) => m.QuanLyNhanSuModule) },
//   { path: 'quan-ly-dao-tao', loadChildren: () => import('./quan-ly-dao-tao/quan-ly-dao-tao.module').then((m) => m.QuanLyDaoTaoModule) },
//   { path: 'quan-ly-sinh-vien', loadChildren: () => import('./quan-ly-sinh-vien/quan-ly-sinh-vien.module').then((m) => m.QuanLySinhVienModule) },
//   { path: 'quan-ly-thiet-bi', loadChildren: () => import('./quan-ly-thiet-bi/quan-ly-thiet-bi.module').then((m) => m.QuanLyThietBiModule) },
//   { path: 'tai-chinh-ke-toan', loadChildren: () => import('./tai-chinh-ke-toan/tai-chinh-ke-toan.module').then((m) => m.TaiChinhKeToanModule) },
//   { path: 'giao-vien', loadChildren: () => import('./giao-vien/giao-vien.module').then((m) => m.GiaoVienModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
