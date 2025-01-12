import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  isMobile$: Observable<boolean>;

  constructor(private readonly breakpointObserver: BreakpointObserver) {
    this.isMobile$ = this.breakpointObserver.observe([Breakpoints.Handset])
      .pipe(
        map(result => result.matches)
      );
  }
}
