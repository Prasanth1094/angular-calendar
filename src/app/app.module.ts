import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from './app.component';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import {MatToolbarModule} from '@angular/material';
import {MatSidenavModule} from '@angular/material';
import {MatButtonModule} from '@angular/material';
import {MatListModule} from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import { TopbarComponent } from './topbar/topbar.component';
import { ContentviewerComponent } from './contentviewer/contentviewer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CalendarComponent } from './calendar/calendar.component';
@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    ContentviewerComponent,
    SidebarComponent,
    DashboardComponent,    
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,    
    RouterModule.forRoot([
      { path: '',redirectTo: '/dashboard',pathMatch: 'full'},
      {path:'dashboard', component:DashboardComponent},
      {path:'calendar', component:CalendarComponent},      
      ]),
      FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
      MatToolbarModule,MatSidenavModule,MatButtonModule,MatIconModule,MatListModule
   ],
   
  providers: [], 
  bootstrap: [AppComponent]
})
export class AppModule { }
