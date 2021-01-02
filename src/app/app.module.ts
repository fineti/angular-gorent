import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApartmentListComponent } from './components/apartment-list/apartment-list.component';
import {HttpClientModule} from '@angular/common/http';
import {ApartmentService} from './services/apartment.service';
import { HeaderComponent } from './header/header.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HomepageComponent } from './homepage/homepage.component';
import { DiscoverComponent } from './discover/discover.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import { ApartmentDetailComponent } from './common/apartment-detail/apartment-detail.component';
import {MaterialElevationDirective} from './common/directives/material-elevation.directive';
import { DetailListComponent } from './common/apartment-detail/detail-list/detail-list.component';
import { ReviewListComponent } from './common/apartment-detail/review-list/review-list.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDialogModule} from '@angular/material/dialog';
import { AgmCoreModule } from '@agm/core';
import { ManageApartmentsComponent } from './components/manage-apartments/manage-apartments.component';
import { ManageBookingsComponent } from './components/manage-bookings/manage-bookings.component';
import {MatSelectModule} from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCheckboxModule} from '@angular/material/checkbox';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    ApartmentListComponent,
    HeaderComponent,
    HomepageComponent,
    DiscoverComponent,
    LoginComponent,
    SignupComponent,
    ApartmentDetailComponent,
    MaterialElevationDirective,
    DetailListComponent,
    ReviewListComponent,
    ManageApartmentsComponent,
    ManageBookingsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyByN7fJoMAUvy17eWplS7Km9K3NyppgAYU'
    }),
    BrowserAnimationsModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatCheckboxModule,
    NgbModule
  ],
  providers: [ApartmentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
