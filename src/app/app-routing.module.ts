import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { AssignNumberToUserComponent } from './assign-number-to-user/assign-number-to-user.component';
import { AssignRaffleToClientComponent } from './assign-raffle-to-client/assign-raffle-to-client.component';
import { ClientsComponent } from './clients/clients.component';
import { RafflesComponent } from './raffles/raffles.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: 'clients',
    component: ClientsComponent,
  },
  {
    path: 'raffers',
    component: RafflesComponent,
  },
  {
    path: 'assign-raffle-to-client',
    component: AssignRaffleToClientComponent,
  },
  {
    path: 'assign-number-to-user',
    component: AssignNumberToUserComponent,
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
