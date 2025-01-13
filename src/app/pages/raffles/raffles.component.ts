import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Raffle } from '../../core/interfaces/raffle.interface';
import { RaffleService } from '../../core/services/raffle.service';
import { DeviceService } from '../../core/services/device.service';

@Component({
  selector: 'app-raffles',
  standalone: false,
  templateUrl: './raffles.component.html',
  styleUrls: ['./raffles.component.scss'],
})
export class RafflesComponent implements OnInit {
  createRaffleForm!: FormGroup;
  raffles: Raffle[] = [];
  isLoading = false;
  error: string | null = null;
  success: string | null = null;
  isMobile: boolean = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly raffleService: RaffleService,
    private readonly deviceService: DeviceService
  ) {}

  ngOnInit(): void {
    this.createRaffleForm = this.fb.group({
      name: ['', Validators.required],
      isActive: [true, Validators.required],
    });

    this.loadRaffles();
    this.deviceService.isMobile$.subscribe((isMobile) => {
      this.isMobile = isMobile;
    });
  }

  onSubmit(): void {
    if (this.createRaffleForm.valid) {
      this.isLoading = true;
      const formValue = this.createRaffleForm.value;
      formValue.isActive =
        formValue.isActive === 'true' || formValue.isActive === true;
      this.raffleService.createRaffle(this.createRaffleForm.value).subscribe({
        next: (response: { success: boolean; message: string }) => {
          if (response.success) {
            this.success = response.message;
            this.error = null;
            this.resetForm();
            this.loadRaffles();
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
    this.createRaffleForm.reset({ isActive: true });
  }

  loadRaffles(): void {
    this.raffleService.getRaffles().subscribe({
      next: (response: { success: boolean; data: Raffle[] }) => {
        if (response.success) {
          const uniqueRaffles = new Map<number, Raffle>();
          response.data.forEach((raffle: Raffle) => {
            uniqueRaffles.set(raffle.idRaffle, raffle);
          });
          this.raffles = Array.from(uniqueRaffles.values());
        }
      },
      error: (error) => {
        this.error = error.message;
      },
    });
  }
}
