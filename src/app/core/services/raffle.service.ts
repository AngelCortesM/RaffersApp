import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Raffle } from '../interfaces/raffle.interface';
import { environment } from '../../../environments/environment';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class RaffleService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient, private readonly errorHandler: ErrorHandlerService) {}

  createRaffle(raffle: Partial<Raffle>): Observable<Raffle> {
    return this.http.post<Raffle>(this.apiUrl + '/Raffle', raffle).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleError(error))
    );
  }

  getRaffles(): Observable<Raffle[]> {
    return this.http.get<Raffle[]>(this.apiUrl + '/Raffle').pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleError(error))
    );
  }
}
