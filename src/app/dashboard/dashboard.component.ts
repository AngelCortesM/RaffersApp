import { Component, OnInit } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';
import { Client } from '../core/interfaces/client.interface';
import { User } from '../core/interfaces/user.interface';
import { Raffle } from '../core/interfaces/raffle.interface';
import { ErrorHandlerService } from '../core/services/error-handler.service';
import { ClientService } from '../core/services/clients.service';
import { UserService } from '../core/services/user.service';
import { RaffleService } from '../core/services/raffle.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  clients: Client[] = [];
  users: User[] = [];
  raffles: Raffle[] = [];
  error: string | null = null;

  userRafflesData: ChartData<'bar'> = { datasets: [] };
  userRafflesLabels: string[] = [];
  userRafflesType: ChartType = 'bar';

  userNumbersData: ChartData<'pie'> = { datasets: [] };
  userNumbersLabels: string[] = [];
  userNumbersType: ChartType = 'pie';

  clientRafflesData: ChartData<'doughnut'> = { datasets: [] };
  clientRafflesLabels: string[] = [];
  clientRafflesType: ChartType = 'doughnut';

  constructor(
    private readonly clientService: ClientService,
    private readonly userService: UserService,
    private readonly raffleService: RaffleService,
    private readonly errorHandler: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.loadClients();
    this.loadUsers();
    this.loadRaffles();
  }

  loadClients(): void {
    this.clientService.getClients().subscribe({
      next: (response: { success: boolean; data: Client[] }) => {
        if (response.success) {
          this.clients = response.data;
          this.updateClientRafflesChart();
        }
      },
      error: (error) => {
        this.error = error.message;
      }
    });
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (users: { success: boolean; data: User[] }) => {
        if (users.success) {
          this.users = users.data;
        }
        this.updateUserRafflesChart();
        this.updateUserNumbersChart();
      },
      error: (error) => {
        this.error = error.message;
      }
    });
  }

  loadRaffles(): void {
    this.raffleService.getRaffles().subscribe({
      next: (raffles: { success: boolean; data: Raffle[] }) => {
        this.raffles = raffles.data;
      },
      error: (error) => {
        this.error = error.message;
      }
    });
  }

  updateUserRafflesChart(): void {
    const userRafflesCount = this.users.map((user) => ({
      name: user.name,
      raffles: this.raffles.filter(
        (raffle) => raffle.idClient === user.idClient
      ).length,
    }));

    this.userRafflesLabels = userRafflesCount.map((ur) => ur.name);
    this.userRafflesData = {
      labels: this.userRafflesLabels,
      datasets: [
        {
          data: userRafflesCount.map((ur) => ur.raffles),
          label: 'Sorteos Acumulados',
        },
      ],
    };
  }

  updateUserNumbersChart(): void {
    const userNumbersCount = this.users.map((user) => ({
      name: user.name,
      numbers: this.raffles
        .filter((raffle) => raffle.idClient === user.idClient)
        .reduce((acc, raffle) => acc + (raffle.isActive ? 1 : 0), 0),
    }));

    this.userNumbersLabels = userNumbersCount.map((un) => un.name);
    this.userNumbersData = {
      labels: this.userNumbersLabels,
      datasets: [
        {
          data: userNumbersCount.map((un) => un.numbers),
          label: 'Números Asignados',
        },
      ],
    };
  }

  updateClientRafflesChart(): void {
    const clientRafflesCount = this.clients.map((client) => ({
      name: client.name,
      raffles: this.raffles.filter(
        (raffle) => raffle.idClient === client.idClient
      ).length,
    }));

    this.clientRafflesLabels = clientRafflesCount.map((cr) => cr.name);
    this.clientRafflesData = {
      labels: this.clientRafflesLabels,
      datasets: [
        {
          data: clientRafflesCount.map((cr) => cr.raffles),
          label: 'Sorteos por Cliente',
        },
      ],
    };
  }
}
