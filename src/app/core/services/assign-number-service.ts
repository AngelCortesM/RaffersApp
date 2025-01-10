import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Client } from '../interfaces/client.interface';
import { User } from '../interfaces/user.interface';
import { Raffle } from '../interfaces/raffle.interface';
import { environment } from '../../../environments/environment';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class AssignNumberService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private errorHandler: ErrorHandlerService) {}

  getClients(): Observable<Client[]> {
    return this.http
      .get<{ success: boolean; data: Client[] }>(`${this.apiUrl}/Client/list`)
      .pipe(map((response) => response.data), catchError(this.errorHandler.handleError));
  }

  getUsersByClientId(clientId: number, name: string = ''): Observable<User[]> {
    let params = new HttpParams().set('clientId', clientId.toString());
    if (name) {
      params = params.set('name', name);
    }
    return this.http
      .get<{ success: boolean; data: User[] }>(`${this.apiUrl}/User/list`, { params })
      .pipe(map((response) => response.data), catchError(this.errorHandler.handleError));
  }

  getRaffles(): Observable<Raffle[]> {
    return this.http
      .get<{ success: boolean; data: Raffle[] }>(`${this.apiUrl}/Raffle`)
      .pipe(map((response) => response.data), catchError(this.errorHandler.handleError));
  }

  assignNumber(data: any): Observable<any> {
    const payload = {
      idClient: Number(data.clientId),
      idUser: Number(data.userId),
      idRaffle: Number(data.raffleId),
      number: '0',
    };

    return this.http
      .post<{ success: boolean; data: { number: string } }>(
        `${this.apiUrl}/AssignedNumbers/AssignRandomNumber`,
        payload
      )
      .pipe(
        map((response) => response.data),
        catchError(this.errorHandler.handleError)
      );
  }
}
