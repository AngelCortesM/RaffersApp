import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ErrorHandlerService } from './error-handler.service';
import { RaffleByClient } from '../interfaces/rafleByClient.interface';

@Injectable({
  providedIn: 'root',
})
export class RaffleAssignmentService {
  private readonly apiUrl = environment.apiUrl;

  constructor(
    private readonly http: HttpClient,
    private readonly errorHandler: ErrorHandlerService
  ) {}

  assignRaffleToClient(
    data: Partial<RaffleByClient>
  ): Observable<{ success: boolean; message: string }> {
    return this.http
      .post<{ success: boolean; message: string }>(
        `${this.apiUrl}/RaffleAssignment`,
        data
      )
      .pipe(
        map((response) => response),
        catchError((error: HttpErrorResponse) =>
                  this.errorHandler.handleError(error)
                )
      );
  }

  getRaffleAssignments(idClient?: number, idRaffle?: number): Observable<RaffleByClient[]> {
    let params = new HttpParams();
    if (idClient) {
      params = params.set('idClient', idClient.toString());
    }
    if (idRaffle) {
      params = params.set('idRaffle', idRaffle.toString());
    }

    return this.http
      .get<{ success: boolean; data: RaffleByClient[] }>(
        `${this.apiUrl}/RaffleAssignment/list`,
        { params }
      )
      .pipe(
        map((response) => response.data),
        catchError(this.errorHandler.handleError)
      );
  }
}
