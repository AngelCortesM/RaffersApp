import {
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';
import { navbarData } from './nav-data';
import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidenav',
  standalone: false,

  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('350ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 0 }),
        animate('350ms', style({ opacity: 0 })),
      ]),
    ]),
    trigger('rotate', [
      transition(':enter', [
        animate(
          '1000ms',
          keyframes([
            style({ transform: 'rotate(0deg)', offset: '0' }),
            style({ transform: 'rotate(2turn)', offset: '1' }),
          ])
        ),
      ]),
    ]),
  ],
})
export class SidenavComponent implements OnInit {
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collased = false;
  screemWidth = 0;
  navData = navbarData;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screemWidth = window.innerWidth;
    if (this.screemWidth <= 768) {
      this.collased = false;
      this.onToggleSideNav.emit({
        collapsed: this.collased,
        screenWidth: this.screemWidth,
      });
    }
  }

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.screemWidth = window.innerWidth;
    }
  }

  toggleCollapse(): void {
    this.collased = !this.collased;
    this.onToggleSideNav.emit({
      collapsed: this.collased,
      screenWidth: this.screemWidth,
    });
  }

  toggleSidenav(): void {
    this.collased = false;
    this.onToggleSideNav.emit({
      collapsed: this.collased,
      screenWidth: this.screemWidth,
    });
  }
}
