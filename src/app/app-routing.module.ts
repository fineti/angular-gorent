import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomepageComponent} from './homepage/homepage.component';
import {DiscoverComponent} from './discover/discover.component';
import {LoginComponent} from './login/login.component';
import {ApartmentDetailComponent} from './common/apartment-detail/apartment-detail.component';
import {SignupComponent} from './signup/signup.component';
import {ManageApartmentsComponent} from './components/manage-apartments/manage-apartments.component';
import {ManageBookingsComponent} from './components/manage-bookings/manage-bookings.component';
import {AuthGuardService} from './services/auth-guard.service';

const routes: Routes = [
  { path: '', component: HomepageComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'signup', component: SignupComponent, pathMatch: 'full' },
  { path: 'discover/:id', component: ApartmentDetailComponent },
  { path: 'discover/search/by', component: DiscoverComponent },
  { path: 'discover', component: DiscoverComponent },
  { path: 'manage/apartments', component: ManageApartmentsComponent, canActivate: [AuthGuardService], data: { expectedRole: 'host'} },
  { path: 'manage/bookings', component: ManageBookingsComponent, canActivate: [AuthGuardService], data: { expectedRole: 'client'}},
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
