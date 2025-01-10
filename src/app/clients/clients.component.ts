import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Client } from '../core/interfaces/client.interface';
import { ErrorHandlerService } from '../core/services/error-handler.service';
import { ClientService } from '../core/services/clients.service';
import { DeviceService } from '../core/services/device.service';

@Component({
  selector: 'app-clients',
  standalone: false,
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit {
  createClientForm!: FormGroup;
  clients: Client[] = [];
  isLoading = false;
  error: string | null = null;
  success: string | null = null;
  isMobile: boolean = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly clientService: ClientService,
    private readonly errorHandler: ErrorHandlerService,
    private readonly deviceService: DeviceService
  ) {}

  ngOnInit(): void {
    this.createClientForm = this.fb.group({
      name: ['', Validators.required],
      isActive: [true, Validators.required],
    });

    this.loadClients();
    this.deviceService.isMobile$.subscribe((isMobile) => {
      this.isMobile = isMobile;
    });
  }
  onSubmit(): void {
    if (this.createClientForm.valid) {
      this.isLoading = true;
      const formValue = this.createClientForm.value;
      formValue.isActive = formValue.isActive === 'true' || formValue.isActive === true;
      this.clientService.createClient(this.createClientForm.value).subscribe({
        next: (response: { success: boolean; message: string }) => {
          this.isLoading = false;
          if (response.success) {
            this.success = response.message;
            this.error = null;
            this.resetForm();
            this.loadClients();
          } else {
            this.error = response.message;
            this.success = null;
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
    this.createClientForm.reset({ isActive: true });
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
}
