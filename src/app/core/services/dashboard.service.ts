import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { Client } from '../interfaces/client.interface';
import { User } from '../interfaces/user.interface';
import { Raffle } from '../interfaces/raffle.interface';
import { environment } from '../../../environments/environment';
import { ErrorHandlerService } from './error-handler.service';
import { RaffleByClient } from '../interfaces/rafleByClient.interface';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly apiUrl = environment.apiUrl;

  constructor(
    private readonly http: HttpClient,
    private readonly errorHandler: ErrorHandlerService
  ) {}

  getDashboardData(): Observable<{
    clients: Client[];
    users: User[];
    raffles: Raffle[];
    raffleAssignments: RaffleByClient[];
    assignedNumbers: any[];
  }> {
    return forkJoin({
      clients: this.http
        .get<{ success: boolean; data: Client[] }>(`${this.apiUrl}/Client/list`)
        .pipe(map((response) => response.data)),
      users: this.http
        .get<{ success: boolean; data: User[] }>(`${this.apiUrl}/User/list`)
        .pipe(map((response) => response.data)),
      raffles: this.http
        .get<{ success: boolean; data: Raffle[] }>(`${this.apiUrl}/Raffle`)
        .pipe(map((response) => response.data)),
      raffleAssignments: this.http
        .get<{ success: boolean; data: RaffleByClient[] }>(
          `${this.apiUrl}/RaffleAssignment/list`
        )
        .pipe(map((response) => response.data)),
      assignedNumbers: this.http
        .get<{ success: boolean; data: any[] }>(
          `${this.apiUrl}/ListNumber/GetAssignedNumbersPaged?pageNumber=1&pageSize=10`
        )
        .pipe(map((response) => response.data)),
    });
  }
}
