import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {


  dates : Date[];
  smDates: Date[];
  date :Date;
  month: number;
  year: number;
  smMonth: number;
  smYear: number;
  calenderDates = new BehaviorSubject<Date[]> (null);
  smCalenderDates = new BehaviorSubject<Date[]> (null);
  monthYearSub = new BehaviorSubject<String> (null);
  smMonthYear = new BehaviorSubject<String> (null);
  monthYearNumber = new BehaviorSubject<String> (null);
  selectedSub = new BehaviorSubject<String>(null);
  createClickEvent = new BehaviorSubject<boolean>(false);
  firstDate = new BehaviorSubject<Date>(null);
  lastDate = new BehaviorSubject<Date>(null);
  moveDate = new BehaviorSubject<Date>(null);
  timeShow = new BehaviorSubject<boolean>(false);


  constructor() {
    this.recentMonth();

   }


   fullMonth(month: number, year) {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    this.monthYearSub.next(monthNames[month] + " " + year);
    this.monthYearNumber.next(month + " " + year);
   }
   smfullMonth(month: number, year) {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    this.smMonthYear.next(monthNames[month] + " " + year);
    this.monthYearNumber.next(month + " " + year);
   }


  recentMonth() {
    this.date = new Date();
    this.month = this.date.getMonth();
    this.year = this.date.getFullYear();
    this.smMonth = this.month;
    this.smYear = this.year;

    this.dates = this.getDaysInMonth(this.month, this.year);
    this.calenderDates.next(this.dates);
    this.fullMonth(this.month, this.year);
  }

  nextMonth() {

    if(this.month == 11){
      this.month = 0;
      this.year = this.year + 1;
    } else if(this.month < 11) {
      this.month = this.month + 1;
    }

    this.dates = this.getDaysInMonth(this.month, this.year);
    this.calenderDates.next(this.dates);
    this.fullMonth(this.month, this.year);
  }
  smNextMonth() {
 
    if(this.smMonth == 11){
      this.smMonth = 0;
      this.smYear = this.smYear + 1;
    } else if(this.smMonth < 11) {
      this.smMonth = this.smMonth + 1;
    }

    this.smDates = this.getDaysInMonth(this.smMonth, this.smYear);
    this.smCalenderDates.next(this.smDates);
    this.smfullMonth(this.smMonth, this.smYear);
  }

  prevMonth() {
    if(this.month == 0){
      this.month = 11;
      this.year = this.year - 1;
    } else if(this.month > 0) {
      this.month = this.month - 1;
    }

    this.dates = this.getDaysInMonth(this.month, this.year);
    this.calenderDates.next(this.dates);
    this.fullMonth(this.month, this.year);
  }
  smPrevMonth() {
    if(this.smMonth == 0){
      this.smMonth = 11;
      this.smYear = this.smYear - 1;
    } else if(this.smMonth > 0) {
      this.smMonth = this.smMonth - 1;
    }

    this.smDates = this.getDaysInMonth(this.smMonth, this.smYear);
    this.smCalenderDates.next(this.smDates);
    this.smfullMonth(this.smMonth, this.smYear);
  }

  processing(days) {
    let dat = days[35].toString().split(" ")[2];
    if(dat == '31') {
       days[0] = days[35];
       days.pop();
       return days;
    } else {
      days.pop();
      return days;
    }
  }


  getDaysInMonth(month, year) {
    let date = new Date(year, month, 1);
    let days: Date[] = [];

    date.setDate(date.getDate() - this.prevOrDays(new Date(date)));

    // while (date.getMonth() === month) {
    //   days.push(new Date(date));
    //   date.setDate(date.getDate() + 1);
    // }

    for(let i = 0; i < 36; i++) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return this.processing(days);
  }




  prevOrDays(date: Date ) {
    let day = date.toString().split(" ")[0];
    
    if(day == 'Sat') {
      return 6;
    } else if( day == 'Sun') {
      return 0;
    } else if( day == 'Mon') {
      return 1;
    } else if( day == 'Tue') {
      return 2;
    } else if( day == 'Wed') {
      return 3;
    } else if( day == 'Thu') {
      return 4;
    } else if( day == 'Fri') {
      return 5;
    }

  }
}
