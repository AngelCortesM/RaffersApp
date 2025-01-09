import { Component, OnInit } from '@angular/core';
import { Client } from '../core/interfaces/client.interface';
import { User } from '../core/interfaces/user.interface';
import { Raffle } from '../core/interfaces/raffer.interface';
import { AssignNumberService } from '../core/services/assign-number-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, finalize, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-assign-number-to-user',
  standalone: false,

  templateUrl: './assign-number-to-user.component.html',
  styleUrl: './assign-number-to-user.component.scss',
})
export class AssignNumberToUserComponent implements OnInit {
  assignForm: FormGroup;
  searchForm: FormGroup;
  clients: Client[] = [];
  users: User[] = [];
  filteredUsers: User[] = [];
  raffles: Raffle[] = [];
  assignedNumber: string | null = null;
  error: string | null = null;
  isLoading = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly assignNumberService: AssignNumberService
  ) {
    this.assignForm = this.fb.group({
      clientId: ['', Validators.required],
      userId: ['', Validators.required],
      raffleId: ['', Validators.required],
    });

    this.searchForm = this.fb.group({
      searchTerm: ['']
    });
  }

  ngOnInit(): void {
    this.loadClients();
    this.loadRaffles();
    this.setupSearchListener();
  }

  setupSearchListener(): void {
    this.searchForm.get('searchTerm')?.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      this.filterUsers(searchTerm);
    });
  }

  loadClients(): void {
    this.isLoading = true;
    this.assignNumberService.getClients().pipe(
      catchError(error => {
        this.error = 'Error al cargar los clientes. Por favor, intente de nuevo.';
        console.error('Error al cargar los clientes:', error);
        return of([]);
      }),
      finalize(() => this.isLoading = false)
    ).subscribe((clients: Client[]) => {
      this.clients = clients;
    });
  }

  loadUsers(clientId: number, searchTerm: string = ''): void {
    this.isLoading = true;
    this.error = null;
    this.assignNumberService.getUsersByClientId(clientId, searchTerm).pipe(
      catchError(error => {
        this.error = 'Error al cargar los usuarios. Por favor, intente de nuevo.';
        console.error('Error al cargar los usuarios:', error);
        return of([]);
      }),
      finalize(() => this.isLoading = false)
    ).subscribe((users: User[]) => {
      this.users = users;
      this.filteredUsers = users;
    });
  }

  loadRaffles(): void {
    this.isLoading = true;
    this.assignNumberService.getRaffles().pipe(
      catchError(error => {
        this.error = 'Error al cargar los sorteos. Por favor, intente de nuevo.';
        console.error('Error al cargar los sorteos:', error);
        return of([]);
      }),
      finalize(() => this.isLoading = false)
    ).subscribe((raffles: Raffle[]) => {
      this.raffles = raffles;
    });
  }

  onClientChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const clientId = Number(target.value);
    this.loadUsers(clientId);
    this.assignForm.patchValue({ userId: '' });
    this.searchForm.patchValue({ searchTerm: '' });
  }

  filterUsers(searchTerm: string): void {
    if (!searchTerm) {
      this.filteredUsers = this.users;
    } else {
      this.filteredUsers = this.users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }

  onSubmit(): void {
    if (this.assignForm.valid) {
      this.isLoading = true;
      this.error = null;
      this.assignedNumber = null;
      this.assignNumberService.assignNumber(this.assignForm.value).pipe(
        catchError(error => {
          this.error = 'Error al asignar el número. Por favor, intente de nuevo.';
          console.error('Error al asignar el número:', error);
          return of(null);
        }),
        finalize(() => this.isLoading = false)
      ).subscribe(response => {
        if (response) {
          this.assignedNumber = response.number;
          console.log('Número asignado con éxito', response);
        }
      });
    }
  }

  resetForm(): void {
    this.assignForm.reset();
    this.searchForm.reset();
    this.users = [];
    this.filteredUsers = [];
    this.assignedNumber = null;
    this.error = null;
  }
}
