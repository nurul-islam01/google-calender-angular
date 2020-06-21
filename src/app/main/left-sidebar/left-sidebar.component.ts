import { MainService } from './../main.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.css']
})
export class LeftSidebarComponent implements OnInit, OnDestroy {

  days: Date [];
  monthYear: string;
  month: number;
  year: number;

  subs1: Subscription;
  subs2: Subscription;
  subs3: Subscription;
  subs4: Subscription;

  panelOpenState = false;

  constructor(private mainService: MainService) { }

  ngOnInit() {

    this.subs1 = this.mainService.calenderDates.subscribe((days: Date[]) => {
      this.days = days;
    });
    this.subs2 = this.mainService.monthYearSub.subscribe((monthYear: string) => {
      this.monthYear = monthYear;
    });

    this.mainService.monthYearNumber.subscribe((monthYear: string) => {
      this.month = parseInt(monthYear.split(" ")[0]);
      this.year = parseInt(monthYear.split(" ")[1]);
    });

  }

  thisMonth(date: Date) {
    return !((this.month == date.getMonth()) && (this.year == date.getFullYear()));
  }

  activeDate(date:Date) {
    let d = new Date();    
    return (d.getDate() == date.getDate()) && (d.getMonth() == date.getMonth()) && (d.getFullYear() == date.getFullYear());
  }

  nextMonth() {
    this.mainService.smNextMonth();
    this.smallCalender();
  }

  smallCalender() {
    this.subs3 = this.mainService.smCalenderDates.subscribe((days: Date[]) => {
      this.days = days;
    });
    this.subs4 = this.mainService.smMonthYear.subscribe((monthYear: string) => {
      this.monthYear = monthYear;
    });
  }

  prevMonth() {
    this.mainService.smPrevMonth();
    this.smallCalender();
  }

  getDate(date: Date) {
    return date.toString().split(" ")[2];
  }

  ngOnDestroy() {
    if(this.subs1) {
      this.subs1.unsubscribe()
    }
    if(this.subs2) {
      this.subs2.unsubscribe()
    }
    if(this.subs3) {
      this.subs3.unsubscribe()
    }
    if(this.subs4) {
      this.subs4.unsubscribe()
    }

  }
}
