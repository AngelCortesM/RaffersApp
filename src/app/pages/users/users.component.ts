import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Client } from '../../core/interfaces/client.interface';
import { User } from '../../core/interfaces/user.interface';
import { ErrorHandlerService } from '../../core/services/error-handler.service';
import { ClientService } from '../../core/services/clients.service';
import { UserService } from '../../core/services/user.service';
import { DeviceService } from '../../core/services/device.service';

@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  createUserForm!: FormGroup;
  clients: Client[] = [];
  users: User[] = [];
  isLoading = false;
  error: string | null = null;
  success: string | null = null;
  isMobile: boolean = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly clientService: ClientService,
    private readonly userService: UserService,
    private readonly errorHandler: ErrorHandlerService,
    private readonly deviceService: DeviceService
  ) {}

  ngOnInit(): void {
    this.createUserForm = this.fb.group({
      idClient: ['', Validators.required],
      name: ['', Validators.required],
      isActive: [true, Validators.required],
    });

    this.loadClients();
    this.loadUsers();
    this.deviceService.isMobile$.subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }

  onSubmit(): void {
    if (this.createUserForm.valid) {
      this.isLoading = true;
      const formValue = this.createUserForm.value;
      formValue.isActive = formValue.isActive === 'true' || formValue.isActive === true;
           this.userService.createUser(this.createUserForm.value).subscribe({
        next: (response: { success: boolean; message: string }) => {
          if (response.success) {
            this.success = response.message;
            this.error = null;
            this.resetForm();
            this.loadUsers();
          } else {
            this.error = response.message;
            this.success = null;
            this.resetForm();
            this.loadUsers();
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.error = error.message;
          this.success = null;
        },
      });
    }
  }

  resetForm(): void {
    this.createUserForm.reset({ isActive: true });
  }

  loadClients(): void {
    this.clientService.getClients().subscribe({
      next: (response: { success: boolean; data: Client[] }) => {
        if (response.success) {
          this.clients = response.data;
        } else {
          this.error = 'Error al cargar los clientes.';
        }
      },
      error: (error) => {
        this.error = error.message;
      },
    });
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (users: { success: boolean; data: User[] }) => {
        this.users = users.data;
      },
      error: (error) => {
        this.error = error.message;
      },
    });
  }

  getClientName(idClient: number): string {
    const client = this.clients.find((c) => c.idClient === idClient);
    return client ? client.name : 'Desconocido';
  }
}
