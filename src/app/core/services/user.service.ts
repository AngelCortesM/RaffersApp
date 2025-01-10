import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../interfaces/user.interface';
import { environment } from '../../../environments/environment';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient, private readonly errorHandler: ErrorHandlerService) {}

  createUser(user: Partial<User>): Observable<User> {
    return this.http.post<User>(this.apiUrl + '/User', user).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleError(error))
    );
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + '/User/list').pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleError(error))
    );
  }
}
