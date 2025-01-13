import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RaffleAssignmentService } from '../../core/services/raffle-assignment.service';
import { ClientService } from '../../core/services/clients.service';
import { RaffleService } from '../../core/services/raffle.service';
import { Client } from '../../core/interfaces/client.interface';
import { Raffle } from '../../core/interfaces/raffle.interface';
import { DeviceService } from '../../core/services/device.service';
import { RaffleByClient } from '../../core/interfaces/rafleByClient.interface';

@Component({
  selector: 'assign-raffle-to-client',
  standalone: false,
  templateUrl: './assign-raffle-to-client.component.html',
  styleUrls: ['./assign-raffle-to-client.component.scss'],
})
export class AssignRaffleToClientComponent implements OnInit {
  assignForm!: FormGroup;
  searchForm!: FormGroup;
  clients: Client[] = [];
  raffles: Raffle[] = [];
  assignments: RaffleByClient[] = [];
  filteredAssignments: RaffleByClient[] = [];
  error: string | null = null;
  success: string | null = null;
  isLoading = false;
  isMobile = false;
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

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

    this.searchForm = this.fb.group({
      search: [''],
    });

    this.loadClients();
    this.loadRaffles();
    this.loadAssignments();
    this.deviceService.isMobile$.subscribe((isMobile) => {
      this.isMobile = isMobile;
    });
    this.searchForm.get('search')?.valueChanges.subscribe((value) => {
      this.filterAssignments(value);
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
            this.loadAssignments();
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
          const uniqueRaffles = new Map<number, Raffle>();
          response.data.forEach((raffle) => {
            uniqueRaffles.set(raffle.idRaffle, raffle);
          });
          this.raffles = Array.from(uniqueRaffles.values());
        } else {
          this.error = 'Error al cargar los sorteos.';
        }
      },
      error: (error) => {
        this.error = error.message;
      },
    });
  }

  loadAssignments(): void {
    this.raffleAssignmentService.getRaffleAssignments().subscribe({
      next: (data: RaffleByClient[]) => {
        this.assignments = data;
        this.filteredAssignments = this.assignments;
        this.sortAssignments();
      },
      error: (error) => {
        this.error = error.message;
      },
    });
  }

  filterAssignments(search: string): void {
    this.filteredAssignments = this.assignments.filter(
      (assignment) =>
        assignment.clientName.toLowerCase().includes(search.toLowerCase()) ||
        assignment.raffleName.toLowerCase().includes(search.toLowerCase()) ||
        assignment.idClient.toString().includes(search) ||
        assignment.idRaffle.toString().includes(search)
    );
    this.sortAssignments();
  }
  sortAssignments(): void {
    const sortedAssignments = [...this.filteredAssignments].sort((a, b) => {
      const compareA = a[this.sortColumn as keyof RaffleByClient];
      const compareB = b[this.sortColumn as keyof RaffleByClient];
      if (compareA < compareB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      }
      if (compareA > compareB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
    this.filteredAssignments = sortedAssignments;
  }
  setSortColumn(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.sortAssignments();
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
