import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  HttpClientModule,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import {
  BrowserModule,
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyComponent } from './body/body.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClientsComponent } from './clients/clients.component';
import { RaffersComponent } from './raffles/raffles.component';
import { UsersComponent } from './users/users.component';
import { AssignRaffleToClientComponent } from './assign-raffle-to-client/assign-raffle-to-client.component';
import { AssignNumberToUserComponent } from './assign-number-to-user/assign-number-to-user.component';
import { PagesComponent } from './pages/pages.component';
import { ErrorHandlerService } from './core/services/error-handler.service';

@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    SidenavComponent,
    DashboardComponent,
    ClientsComponent,
    RaffersComponent,
    UsersComponent,
    AssignRaffleToClientComponent,
    AssignNumberToUserComponent,
    PagesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    ErrorHandlerService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
