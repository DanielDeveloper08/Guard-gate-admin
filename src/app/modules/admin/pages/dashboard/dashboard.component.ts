import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/modules/auth/interfaces/auth.interface';
import { IOperation } from 'src/app/shared/interfaces/role.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  operations!: IOperation[];

  user!: IUser;

  constructor() {
    this.operations = [
      { id: 2, name: 'Dashboard Visitas', route: '/admin/visit-dashboard' },
      { id: 3, name: 'Usuarios', route: '/admin/users' },
      { id: 4, name: 'Residentes', route: '/admin/residents' },
      { id: 1, name: 'Configuración', route: '/admin/roles' },
    ];
  }

  logOut() {
    localStorage.clear();
    location.reload();
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user')!);
  }
}
