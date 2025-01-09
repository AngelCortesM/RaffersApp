import {
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';
import { navbarData } from './nav-data';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidenav',
  standalone: false,

  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
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
    this.screemWidth = window.innerWidth;
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
