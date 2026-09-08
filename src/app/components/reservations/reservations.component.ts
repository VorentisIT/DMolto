import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PizzaService } from '../../services/pizza.service';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ReservationsComponent {
  resName = '';
  resPhone = '';
  resGuests = '2 Guests';
  resDate = this.getTomorrowDate();
  resTime = '07:30 PM';
  resNotes = '';

  constructor(public pizzaService: PizzaService) {}

  getTomorrowDate(): string {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  }

  submitReservation(e: Event): void {
    e.preventDefault();
    if (!this.resName || !this.resPhone) {
      this.pizzaService.showToast('Please provide your name and contact phone.');
      return;
    }

    let msg = `*🍷 Table Reservation Request - D'Molto Pizzeria*\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `*Guest Name:* ${this.resName}\n`;
    msg += `*Phone:* ${this.resPhone}\n`;
    msg += `*Party Size:* ${this.resGuests}\n`;
    msg += `*Date:* ${this.resDate}\n`;
    msg += `*Time Slot:* ${this.resTime}\n`;
    if (this.resNotes) {
      msg += `*Special Requests:* ${this.resNotes}\n`;
    }
    msg += `━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `Looking forward to your reservation confirmation!`;

    const url = `https://wa.me/918360340447?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  }
}
