import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Client } from '../core/interfaces/client.interface';
import { ErrorHandlerService } from '../core/services/error-handler.service';
import { ClientService } from '../core/services/clients.service';

@Component({
  selector: 'app-clients',
  standalone: false,
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  createClientForm!: FormGroup;
  clients: Client[] = [];
  isLoading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.createClientForm = this.fb.group({
      name: ['', Validators.required],
      isActive: [true, Validators.required]
    });

    this.loadClients();
  }

  onSubmit(): void {
    if (this.createClientForm.valid) {
      this.isLoading = true;
      this.clientService.createClient(this.createClientForm.value).subscribe(
        response => {
          this.isLoading = false;
          this.resetForm();
          this.loadClients();
        },
        error => {
          this.isLoading = false;
          this.error = error.message;
        }
      );
    }
  }

  resetForm(): void {
    this.createClientForm.reset({ isActive: true });
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
}
