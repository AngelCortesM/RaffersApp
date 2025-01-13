import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ChartData, ChartType } from 'chart.js';
import { Client } from '../core/interfaces/client.interface';
import { User } from '../core/interfaces/user.interface';
import { Raffle } from '../core/interfaces/raffle.interface';
import { DeviceService } from '../core/services/device.service';
import { RaffleByClient } from '../core/interfaces/rafleByClient.interface';
import { DashboardService } from '../core/services/dashboard.service';

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
  raffleAssignments: RaffleByClient[] = [];
  assignedNumbers: any[] = [];
  error: string | null = null;
  isMobile = false;
  isBrowser = false;

  userRafflesData: ChartData<'bar'> = { datasets: [] };
  userRafflesLabels: string[] = [];
  userRafflesType: ChartType = 'bar';

  userNumbersData: ChartData<'pie'> = { datasets: [] };
  userNumbersLabels: string[] = [];
  userNumbersType: ChartType = 'pie';

  clientRafflesData: ChartData<'doughnut'> = { datasets: [] };
  clientRafflesLabels: string[] = [];
  clientRafflesType: ChartType = 'doughnut';

  clientAssignmentsData: ChartData<'bar'> = { datasets: [] };
  clientAssignmentsLabels: string[] = [];
  clientAssignmentsType: ChartType = 'bar';

  constructor(
    private readonly dashboardService: DashboardService,
    private readonly deviceService: DeviceService,
    @Inject(PLATFORM_ID) private readonly platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.loadDashboardData();
      this.deviceService.isMobile$.subscribe((isMobile) => {
        this.isMobile = isMobile;
      });
    }
  }

  loadDashboardData(): void {
    if (this.isBrowser) {
      this.dashboardService.getDashboardData().subscribe({
        next: (data) => {
          this.clients = data.clients;
          this.users = data.users;
          this.raffles = data.raffles;
          this.raffleAssignments = data.raffleAssignments;
          this.assignedNumbers = data.assignedNumbers;
          this.updateCharts();
        },
        error: (error) => {
          this.error = error.message;
        },
      });
    }
  }

  updateCharts(): void {
    if (this.isBrowser) {
      this.updateUserRafflesChart();
      this.updateUserNumbersChart();
      this.updateClientRafflesChart();
      this.updateClientAssignmentsChart();
    }
  }

  updateUserRafflesChart(): void {
    const userRafflesCount = this.assignedNumbers
      .reduce((acc, number) => {
        const user = acc.find(
          (u: { name: string; raffles: number }) => u.name === number.userName
        );
        if (user) {
          user.raffles += 1;
        } else {
          acc.push({ name: number.userName, raffles: 1 });
        }
        return acc;
      }, [])
      .filter((user: { name: string; raffles: number }) => user.raffles > 0);

    this.userRafflesLabels = userRafflesCount.map(
      (ur: { name: string; raffles: number }) => ur.name
    );
    this.userRafflesData = {
      labels: this.userRafflesLabels,
      datasets: [
        {
          data: userRafflesCount.map(
            (ur: { name: string; raffles: number }) => ur.raffles
          ),
          label: 'Sorteos Acumulados',
          backgroundColor: [
            '#FFB6C1',
            '#ADD8E6',
            '#FFD700',
            '#90EE90',
            '#DDA0DD',
            '#FFA07A',
            '#E6E6FA',
            '#B0E0E6',
            '#FF69B4',
            '#98FB98',
            '#AFEEEE',
            '#DB7093',
          ],
          borderColor: '#1E88E5',
          borderWidth: 1,
        },
      ],
    };
  }

  updateUserNumbersChart(): void {
    const userNumbersCount = this.assignedNumbers
      .reduce((acc, number) => {
        const user = acc.find(
          (u: { name: string; numbers: number }) => u.name === number.userName
        );
        if (user) {
          user.numbers += 1;
        } else {
          acc.push({ name: number.userName, numbers: 1 });
        }
        return acc;
      }, [])
      .filter((user: { name: string; numbers: number }) => user.numbers > 0);

    this.userNumbersLabels = userNumbersCount.map(
      (un: { name: string; numbers: number }) => un.name
    );
    this.userNumbersData = {
      labels: this.userNumbersLabels,
      datasets: [
        {
          data: userNumbersCount.map(
            (un: { name: string; numbers: number }) => un.numbers
          ),
          label: 'Números Asignados',
          backgroundColor: [
            '#FFB6C1',
            '#ADD8E6',
            '#FFD700',
            '#90EE90',
            '#DDA0DD',
            '#FFA07A',
            '#E6E6FA',
            '#B0E0E6',
            '#FF69B4',
            '#98FB98',
            '#AFEEEE',
            '#DB7093',
          ],
          hoverBackgroundColor: [
            '#FFB6C1',
            '#ADD8E6',
            '#FFD700',
            '#90EE90',
            '#DDA0DD',
            '#FFA07A',
            '#E6E6FA',
            '#B0E0E6',
            '#FF69B4',
            '#98FB98',
            '#AFEEEE',
            '#DB7093',
          ],
        },
      ],
    };
  }

  updateClientRafflesChart(): void {
    const clientRafflesCount = this.clients
      .map((client) => ({
        name: client.name,
        raffles: this.raffleAssignments.filter(
          (assignment) => assignment.idClient === client.idClient
        ).length,
      }))
      .filter((client) => client.raffles > 0);

    this.clientRafflesLabels = clientRafflesCount.map((cr) => cr.name);
    this.clientRafflesData = {
      labels: this.clientRafflesLabels,
      datasets: [
        {
          data: clientRafflesCount.map((cr) => cr.raffles),
          label: 'Sorteos por Cliente',
          backgroundColor: [
            '#FFB6C1',
            '#ADD8E6',
            '#FFD700',
            '#90EE90',
            '#DDA0DD',
            '#FFA07A',
            '#E6E6FA',
            '#B0E0E6',
            '#FF69B4',
            '#98FB98',
            '#AFEEEE',
            '#DB7093',
          ],
          hoverBackgroundColor: [
            '#FFB6C1',
            '#ADD8E6',
            '#FFD700',
            '#90EE90',
            '#DDA0DD',
            '#FFA07A',
            '#E6E6FA',
            '#B0E0E6',
            '#FF69B4',
            '#98FB98',
            '#AFEEEE',
            '#DB7093',
          ],
        },
      ],
    };
  }

  updateClientAssignmentsChart(): void {
    const clientAssignmentsCount = this.clients
      .map((client) => ({
        name: client.name,
        assignments: this.raffleAssignments.filter(
          (assignment) => assignment.idClient === client.idClient
        ).length,
      }))
      .filter((client) => client.assignments > 0);

    this.clientAssignmentsLabels = clientAssignmentsCount.map((ca) => ca.name);
    this.clientAssignmentsData = {
      labels: this.clientAssignmentsLabels,
      datasets: [
        {
          data: clientAssignmentsCount.map((ca) => ca.assignments),
          label: 'Asignaciones por Cliente',
          backgroundColor: [
            '#FFB6C1',
            '#ADD8E6',
            '#FFD700',
            '#90EE90',
            '#DDA0DD',
            '#FFA07A',
            '#E6E6FA',
            '#B0E0E6',
            '#FF69B4',
            '#98FB98',
            '#AFEEEE',
            '#DB7093',
          ],
          borderColor: '#1E88E5',
          borderWidth: 1,
        },
      ],
    };
  }
}
