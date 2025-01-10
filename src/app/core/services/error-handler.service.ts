import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ha ocurrido un error desconocido';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else if (error.error?.errors) {
      errorMessage = Object.values(error.error.errors).join('. ');
    } else if (error.error?.message) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Código de error: ${error.status}, mensaje: ${error.message}`;
    }

    return throwError(() => new Error(errorMessage));
  }
}
