import { Component, OnInit } from '@angular/core';
import { Client } from '../../core/interfaces/client.interface';
import { User } from '../../core/interfaces/user.interface';
import { Raffle } from '../../core/interfaces/raffle.interface';
import { AssignNumberService } from '../../core/services/assign-number-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  catchError,
  finalize,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-assign-number-to-user',
  standalone: false,

  templateUrl: './assign-number-to-user.component.html',
  styleUrl: './assign-number-to-user.component.scss',
})
export class AssignNumberToUserComponent implements OnInit {
  assignForm: FormGroup;

  clients: Client[] = [];
  users: User[] = [];
  filteredUsers: User[] = [];
  raffles: Raffle[] = [];
  filteredRaffles: Raffle[] = [];
  assignedNumber: string | null = null;
  error: string | null = null;
  isLoading = false;
  selectedClientId: number | null = null;

  constructor(
    private readonly fb: FormBuilder,
    private readonly assignNumberService: AssignNumberService
  ) {
    this.assignForm = this.fb.group({
      clientId: ['', Validators.required],
      userId: ['', Validators.required],
      raffleId: ['', Validators.required],
      searchTerm: [''],
    });
  }

  ngOnInit(): void {
    this.loadClients();
    this.loadRaffles();
    this.setupSearchListener();
  }

  setupSearchListener(): void {
    this.assignForm
      .get('searchTerm')
      ?.valueChanges.pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((searchTerm) => {
        this.filterUsers(searchTerm);
      });
  }

  loadClients(): void {
    this.isLoading = true;
    this.assignNumberService
      .getClients()
      .pipe(
        catchError((error) => {
          this.error =
            error.message ||
            'Error al cargar los clientes. Por favor, intente de nuevo.';
          return of([]);
        }),
        finalize(() => (this.isLoading = false))
      )
      .subscribe((clients: Client[]) => {
        this.clients = clients;
      });
  }

  loadUsers(idClient: number, searchTerm: string = ''): void {
    this.isLoading = true;
    this.error = null;
    this.assignNumberService
      .getUsersByClientId(idClient, searchTerm)
      .pipe(
        catchError((error) => {
          this.error =
            error.message ||
            'Error al cargar los usuarios. Por favor, intente de nuevo.';
          return of([]);
        }),
        finalize(() => (this.isLoading = false))
      )
      .subscribe((users: User[]) => {
        this.users = users.filter((user) => user.idClient === idClient);
        this.filteredUsers = this.users;
      });
  }

  loadRaffles(): void {
    this.isLoading = true;
    this.assignNumberService
      .getRaffles()
      .pipe(
        catchError((error) => {
          this.error =
            error.message ||
            'Error al cargar los sorteos. Por favor, intente de nuevo.';
          return of([]);
        }),
        finalize(() => (this.isLoading = false))
      )
      .subscribe((raffles: Raffle[]) => {
        this.raffles = raffles.filter(
          (raffle) => raffle.idClient === this.selectedClientId
        );
        this.filteredRaffles = this.raffles;
      });
  }

  onClientChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const clientId = Number(target.value);
    this.selectedClientId = clientId;
    this.loadUsers(clientId);
    this.loadRaffles();
    this.assignForm.patchValue({ userId: '' });
    this.assignForm.patchValue({ raffleId: '' });
    this.assignForm.patchValue({ searchTerm: '' });
  }

  filterUsers(searchTerm: string): void {
    if (!searchTerm) {
      this.filteredUsers = this.users;
    } else {
      this.filteredUsers = this.users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }

  onSubmit(): void {
    if (this.assignForm.valid) {
      this.isLoading = true;
      this.error = null;
      this.assignedNumber = '';
      this.assignNumberService
        .assignNumber(this.assignForm.value)
        .pipe(
          catchError((error) => {
            this.error =
              error.message ||
              'Error al asignar el número. Por favor, intente de nuevo.';

            return of(null);
          }),
          finalize(() => (this.isLoading = false))
        )
        .subscribe((response) => {
          if (response) {
            this.assignedNumber = this.formatNumber(response.number);
          }
        });
    }
  }

  private formatNumber(number: string): string {
    return number.padStart(5, '0');
  }
  resetForm(): void {
    this.assignForm.reset();

    this.users = [];
    this.filteredUsers = [];
    this.assignedNumber = null;
    this.error = null;
  }
}
