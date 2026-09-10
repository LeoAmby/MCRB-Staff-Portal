import { Component, inject, OnInit } from '@angular/core';

import {
  Router,
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
  NavigationEnd
} from '@angular/router';

import { filter } from 'rxjs';

@Component({
  selector: 'app-layout',

  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],

  templateUrl: './layout.html',
  styleUrl: './layout.css'
})

export class Layout implements OnInit {

  private router = inject(Router);

  sidebarCollapsed = false;

  pageTitle = 'Dashboard';
  pageSubtitle = "Welcome back. Here's what's happening today.";

  loggedInUser: any = null;


  constructor() {

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe((event) => {

        const url = (event as NavigationEnd).urlAfterRedirects;

        this.updatePageTitle(url);

      });

  }


  ngOnInit(): void {

    this.loadUser();

  }


  private loadUser(): void {

    const storedUser = localStorage.getItem('emp_user');

    if (storedUser) {

      this.loggedInUser = JSON.parse(storedUser);

      console.log('Logged in user:', this.loggedInUser);

    }

  }


  toggleSidebar(): void {

    this.sidebarCollapsed = !this.sidebarCollapsed;

  }


  private updatePageTitle(url: string): void {

    if (url.includes('/admin/dashboard')) {

      this.pageTitle = 'Dashboard';
      this.pageSubtitle =
        "Welcome back. Here's what's happening today.";

    } else if (url.includes('/admin/employee-list')) {

      this.pageTitle = 'Employees';
      this.pageSubtitle =
        'Manage employees and their information.';

    } else if (url.includes('/admin/new-employee')) {

      this.pageTitle = 'New Employee';
      this.pageSubtitle =
        'Add a new employee to the system.';

    } else if (url.includes('/admin/projects')) {

      this.pageTitle = 'Projects';
      this.pageSubtitle =
        'Manage projects and ongoing activities.';

    } else {

      this.pageTitle = 'Staff Portal';
      this.pageSubtitle =
        'Manage your staff portal.';

    }

  }

}