import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Client } from '../core/interfaces/client.interface';
import { User } from '../core/interfaces/user.interface';
import { ErrorHandlerService } from '../core/services/error-handler.service';
import { ClientService } from '../core/services/clients.service';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-users',
  standalone:false,
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  createUserForm!: FormGroup;
  clients: Client[] = [];
  users: User[] = [];
  isLoading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private userService: UserService,
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.createUserForm = this.fb.group({
      idClient: ['', Validators.required],
      name: ['', Validators.required],
      isActive: [true, Validators.required]
    });

    this.loadClients();
    this.loadUsers();
  }

  onSubmit(): void {
    if (this.createUserForm.valid) {
      this.isLoading = true;
      this.userService.createUser(this.createUserForm.value).subscribe(
        response => {
          this.isLoading = false;
          this.resetForm();
          this.loadUsers(); // Reload the list of users
        },
        error => {
          this.isLoading = false;
          this.error = error.message;
        }
      );
    }
  }

  resetForm(): void {
    this.createUserForm.reset({ isActive: true });
  }

  loadClients(): void {
    this.clientService.getClients().subscribe(
      (clients: Client[]) => {
        this.clients = clients;
      },
      error => {
        this.error = error.message;
      }
    );
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (users: User[]) => {
        this.users = users;
      },
      error => {
        this.error = error.message;
      }
    );
  }

  getClientName(idClient: number): string {
    const client = this.clients.find(c => c.idClient === idClient);
    return client ? client.name : 'Desconocido';
  }
}
