import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Client } from '../interfaces/client.interface';
import { User } from '../interfaces/user.interface';
import { Raffle } from '../interfaces/raffer.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AssignNumberService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getClients(): Observable<Client[]> {
    return this.http
      .get<{ success: boolean; data: Client[] }>(`${this.apiUrl}/Client/list`)
      .pipe(map((response) => response.data));
  }

  getUsersByClientId(clientId: number, name: string = ''): Observable<User[]> {
    let params = new HttpParams().set('clientId', clientId.toString());
    if (name) {
      params = params.set('name', name);
    }
    return this.http
      .get<{ success: boolean; data: User[] }>(`${this.apiUrl}/User/list`, {
        params,
      })
      .pipe(map((response) => response.data));
  }

  getRaffles(): Observable<Raffle[]> {
    return this.http
      .get<{ success: boolean; data: Raffle[] }>(`${this.apiUrl}/Raffle`)
      .pipe(map((response) => response.data));
  }

  assignNumber(data: any): Observable<any> {
    // Asegurarse de que los IDs se envíen como números
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
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ha ocurrido un error desconocido';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // El backend retornó un código de error
      if (error.error && error.error.errors) {
        errorMessage = Object.values(error.error.errors).join('. ');
      } else if (error.error && error.error.message) {
        errorMessage = error.error.message;
      } else {
        errorMessage = `Código de error: ${error.status}, mensaje: ${error.message}`;
      }
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
