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
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { NgChartsModule } from 'ng2-charts';
import { UsersComponent } from './pages/users/users.component';
import { AssignRaffleToClientComponent } from './pages/assign-raffle-to-client/assign-raffle-to-client.component';
import { AssignNumberToUserComponent } from './pages/assign-number-to-user/assign-number-to-user.component';
import { ErrorHandlerService } from './core/services/error-handler.service';
import { RafflesComponent } from './pages/raffles/raffles.component';
import { ClientService } from './core/services/clients.service';
import { UserService } from './core/services/user.service';
import { RaffleService } from './core/services/raffle.service';

@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    SidenavComponent,
    DashboardComponent,
    ClientsComponent,
    RafflesComponent,
    UsersComponent,
    AssignRaffleToClientComponent,
    AssignNumberToUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgChartsModule,
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    ErrorHandlerService,
    ClientService,
    UserService,
    RaffleService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
