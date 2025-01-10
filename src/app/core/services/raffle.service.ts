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

  constructor(
    private readonly http: HttpClient,
    private readonly errorHandler: ErrorHandlerService
  ) {}

  createRaffle(
    raffle: Partial<Raffle>
  ): Observable<{ success: boolean; message: string }> {
    return this.http
      .post<{ success: boolean; message: string }>(
        this.apiUrl + '/Raffle',
        raffle
      )
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.errorHandler.handleError(error)
        )
      );
  }

  getRaffles(): Observable<{ success: boolean; data: Raffle[] }> {
    return this.http
      .get<{ success: boolean; data: Raffle[] }>(this.apiUrl + '/Raffle')
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.errorHandler.handleError(error)
        )
      );
  }
}
