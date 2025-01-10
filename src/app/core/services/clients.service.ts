import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { Client } from '../interfaces/client.interface';
import { environment } from '../../../environments/environment';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient, private errorHandler: ErrorHandlerService) {}

  createClient(client: Partial<Client>): Observable<Client> {
    return this.http.post<Client>(this.apiUrl + '/Client', client).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleError(error))
    );
  }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.apiUrl + '/Client/list').pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleError(error))
    );
  }
}
