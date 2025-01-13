import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { AssignNumberToUserComponent } from './pages/assign-number-to-user/assign-number-to-user.component';
import { AssignRaffleToClientComponent } from './pages/users/assign-raffle-to-client/assign-raffle-to-client.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { RafflesComponent } from './pages/raffles/raffles.component';


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
