import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomepageComponent} from './homepage/homepage.component';
import {DiscoverComponent} from './discover/discover.component';
import {LoginComponent} from './login/login.component';
import {ApartmentDetailComponent} from './common/apartment-detail/apartment-detail.component';

const routes: Routes = [
  { path: '', component: HomepageComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'discover/:id', component: ApartmentDetailComponent },
  { path: 'discover', component: DiscoverComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
