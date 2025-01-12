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

  getRaffleAssignments(clientId: number, raffleId: number): Observable<any[]> {
    let params = new HttpParams()
      .set('idClient', clientId.toString())
      .set('idRaffle', raffleId.toString());

    return this.http
      .get<{ success: boolean; data: any[] }>(
        `${this.apiUrl}/RaffleAssignment/list`,
        { params }
      )
      .pipe(
        map((response) => response.data),
        catchError(this.errorHandler.handleError)
      );
  }

}
