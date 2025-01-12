import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RaffleAssignmentService } from '../core/services/raffle-assignment.service';
import { ClientService } from '../core/services/clients.service';
import { RaffleService } from '../core/services/raffle.service';
import { Client } from '../core/interfaces/client.interface';
import { Raffle } from '../core/interfaces/raffle.interface';
import { DeviceService } from '../core/services/device.service';

@Component({
  selector: 'assign-raffle-to-client',
  standalone: false,
  templateUrl: './assign-raffle-to-client.component.html',
  styleUrls: ['./assign-raffle-to-client.component.scss'],
})
export class AssignRaffleToClientComponent implements OnInit {
  assignForm!: FormGroup;
  clients: Client[] = [];
  raffles: Raffle[] = [];
  error: string | null = null;
  success: string | null = null;
  isLoading = false;
  isMobile = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly raffleAssignmentService: RaffleAssignmentService,
    private readonly clientService: ClientService,
    private readonly raffleService: RaffleService,
    private readonly deviceService: DeviceService
  ) {}

  ngOnInit(): void {
    this.assignForm = this.fb.group({
      idClient: ['', Validators.required],
      idRaffle: ['', Validators.required],
      isActive: [true, Validators.required],
    });

    this.loadClients();
    this.loadRaffles();
    this.deviceService.isMobile$.subscribe((isMobile) => {
      this.isMobile = isMobile;
    });
  }

  onSubmit(): void {
    if (this.assignForm.valid) {
      this.isLoading = true;
      this.error = null;
      this.success = null;
      const formValue = this.assignForm.value;
      formValue.isActive = this.convertBoolean(formValue.isActive);

      this.raffleAssignmentService.assignRaffleToClient(formValue).subscribe({
        next: (response: { success: boolean; message: string }) => {
          this.resetForm();
          if (response.success) {
            this.success = response.message;
            this.error = null;
          } else {
            this.error = response.message;
            this.success = null;
          }
          this.isLoading = false;
        },
        error: (error) => {
          this.error = error.message;
          this.success = null;
          this.isLoading = false;
          this.resetForm();
        },
      });
    }
  }

  resetForm(): void {
    this.assignForm.reset({ isActive: true });
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

  loadRaffles(): void {
    this.raffleService.getRaffles().subscribe({
      next: (response: { success: boolean; data: Raffle[] }) => {
        if (response.success) {
          const existingRaffles = new Set(this.raffles.map((r) => r.idRaffle));

          const uniqueRaffles = response.data.filter(
            (r) => !existingRaffles.has(r.idRaffle)
          );

          this.raffles = [...this.raffles, ...uniqueRaffles];
        } else {
          this.error = 'Error al cargar los sorteos.';
        }
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

  getRaffleName(idRaffle: number): string {
    const raffle = this.raffles.find((r) => r.idRaffle === idRaffle);
    return raffle ? raffle.name : 'Desconocido';
  }

  private convertBoolean(value: any): boolean {
    return value === 'true' || value === true;
  }
}
