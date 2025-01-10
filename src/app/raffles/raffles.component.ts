import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Raffle } from '../core/interfaces/raffle.interface';
import { ErrorHandlerService } from '../core/services/error-handler.service';
import { RaffleService } from '../core/services/raffle.service';

@Component({
  selector: 'app-raffles',
  standalone: false,
  templateUrl: './raffles.component.html',
  styleUrls: ['./raffles.component.scss']
})
export class RafflesComponent implements OnInit {
  createRaffleForm!: FormGroup;
  raffles: Raffle[] = [];
  isLoading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private raffleService: RaffleService,
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.createRaffleForm = this.fb.group({
      name: ['', Validators.required],
      isActive: [true, Validators.required]
    });

    this.loadRaffles();
  }

  onSubmit(): void {
    if (this.createRaffleForm.valid) {
      this.isLoading = true;
      this.raffleService.createRaffle(this.createRaffleForm.value).subscribe(
        response => {
          this.isLoading = false;
          this.resetForm();
          this.loadRaffles();
        },
        error => {
          this.isLoading = false;
          this.error = error.message;
        }
      );
    }
  }

  resetForm(): void {
    this.createRaffleForm.reset({ isActive: true });
  }

  loadRaffles(): void {
    this.raffleService.getRaffles().subscribe(
      (raffles: Raffle[]) => {
        this.raffles = raffles;
      },
      error => {
        this.error = error.message;
      }
    );
  }
}
