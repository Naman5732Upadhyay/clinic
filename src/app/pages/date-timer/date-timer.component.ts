import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-date-timer',
  templateUrl: './date-timer.component.html',
  styleUrl: './date-timer.component.scss'
})
export class DateTimerComponent implements OnInit,OnDestroy {
  currentDateTime: Date = new Date();
  private subscription!: Subscription;

  ngOnInit(): void {
    this.subscription = timer(0, 1000).subscribe(() => {
      this.currentDateTime = new Date();
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
