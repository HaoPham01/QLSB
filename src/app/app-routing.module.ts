import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DefaultComponent } from './adminpage/layouts/default/default.component';
import { LoginComponent } from './adminpage/auth/login/login.component';
import { AuthGuard } from './adminpage/guards/auth.guard';
import { UserLoginComponent } from './userpage/auth/login/user-login.component';
import { SignUpComponent } from './userpage/auth/sign-up/sign-up.component';
import { UserAuthGuard } from './userpage/guards/userauth.guard';
import { HomepageComponent } from './userpage/modules/pages/homepage/homepage.component';
import { ResetPasswordComponent } from './userpage/auth/reset-password/reset-password.component';
import { PagenotfoundComponent } from './userpage/auth/pagenotfound/pagenotfound.component';
import { BookingComponent } from './userpage/modules/pages/booking/booking.component';
import { ContactComponent } from './userpage/modules/pages/contact/contact.component';
import { CheckoutComponent } from './userpage/modules/pages/checkout/checkout.component';


const routes: Routes = [
  {
    path: 'admin',
    component: DefaultComponent, 
    children: [
      { path: 'pages', loadChildren: () => import('./adminpage/modules/pages/pages.module').then((m) => m.PagesModule) }
    ], 
    canActivate:[AuthGuard]
  },

// ----------------------PublicRouter---------------------------
  { path: '', component: HomepageComponent},
  { path: 'booking', component: BookingComponent},
  { path: 'contact', component: ContactComponent},
// ----------------------PrivateRouter---------------------------
  { path: 'booking/checkout/:id', component: CheckoutComponent, canActivate:[UserAuthGuard]},
// ----------------------AuthRouter------------------------------
  { path: 'login', component: LoginComponent },
  { path: 'userLogin', component: UserLoginComponent},
  { path: 'userSignup', component: SignUpComponent},
  { path: 'reset', component: ResetPasswordComponent},

// ----------------------NotFoundRouter---------------------------
  { path: 'not-found', component: PagenotfoundComponent},
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
