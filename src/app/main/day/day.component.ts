import { DialogService } from './../../dialog/dialog.service';
import { MainService } from './../main.service';
import { AddReminderComponent } from 'src/app/dialog/add-reminder/add-reminder.component';
import { MatDialog } from '@angular/material';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {

  date: string;
  day: string;
  month: string;
  year: string;
  gmt: string;
  dayName: string;

  fromTime;
  toTime;
  red_marker_position = 0;

  dialogRef;


  constructor(private dialog: MatDialog, private mainService: MainService, private dialogService: DialogService) { 
    this.gmt = new Date().toString().split(" ")[5];
    this.dayName = new Date().toString().split(" ")[0];
    this.date = new Date().toLocaleDateString();
    this.day = this.date.split('/')[1];
    this.month = this.date.split('/')[0];
    this.year = this.date.split('/')[2];    
   
  }

  ngOnInit(): void {
    let date = new Date();
    let minutes = ((date.getHours() ) * 60 ) + date.getMinutes();

    this.red_marker_position = minutes * .943;

    let red_marker = document.getElementById('red-marker');
    red_marker.style.top = this.red_marker_position + 'px';
    
    this.dialogService.moveTime.subscribe((time: string) => {
      if(time) {
        this.fromTime = time;
        this.moveEvent(time);
      }
    });
    this.dialogService.fromTimeSub.subscribe((time: string) => {
      if(time) {        
        this.fromTime = time;
      }
    });

    this.dialogService.toTimeSub.subscribe((time: string) => {
      if(time) {
        this.toTime = time;
        this.heightSet(time);
      }
    });

    this.dialogService.clickedTime.subscribe((time: string)=> {
      if(time) {
        this.fromTime = time;
      }
    })


  }


  addEvent(e: MouseEvent) {

    let event_element = document.getElementById('event-item');
    let timeContainer = document.getElementById('time-container');
    
    let top = ( (e.clientY - 152) + timeContainer.scrollTop);    
    
    event_element.style.top = top + 'px';
    event_element.style.visibility = 'visible';

    let t = (top/.943)/60;
    let min = this.hourSet(t);
    let min2 = this.hourSet(t + 1);

    this.dialogService.clickedTime.next(min);
    this.mainService.timeShow.next(true);    

    this.dialogRef = this.dialog.open(AddReminderComponent, {
      width: '500px',
      position: {top: (e.clientY > 501) ? '501px' : e.clientY.toString() + 'px'},
      data: new Date(),
      hasBackdrop: true,
      autoFocus: false
    });

    this.dialogRef.afterClosed().subscribe(result => {
      event_element.style.visibility = 'hidden';
      this.dialogService.clickedTime.next(null);
      this.mainService.timeShow.next(false);
      this.dialogService.fromTimeSub.next(null);
      this.dialogService.toTimeSub.next(null);
    })

  }

  fristTwoDigit(num) {
    let nu = 0;
    if(num.toString().length > 2 ){
      let d = Math.pow(10, num.toString().length - 2);
      nu= Math.ceil(num/d) * d;
    }
    return parseInt(nu.toString().substr(0, 2)) + 1;
  }

  hourSet(hour) {
    let h = Number(hour.toString().split('.')[0]);
    let time = null;    
    time = h + ":" + this.fristTwoDigit(Number(hour.toString().split('.')[1]) * 60);    
    return time;
  }


  moveEvent(time: string) {
    let event_element = document.getElementById('event-item');
    
    let t1 = time.split(" ")[0];
    let h = 0;
    let m = Number(t1.split(":")[1]);
    
    if(Number(t1.split(":")[0]) == 12 && time.split(" ")[1] == "AM") {
      h = 0;
    } else if (this.fromTime.split(" ")[1] == "PM") {
      h =  Number(t1.split(":")[0]) + 12;
    } else {
      h =  Number(t1.split(":")[0]);
    }

    let tm = h*60 + m;
    event_element.style.top = (tm * .943) + 'px';
  }

  heightSet(time) {
    
    if(this.fromTime && time) {

      let event_element = document.getElementById('event-item');

      let t1 = this.fromTime.split(" ")[0];
      let t2 = time.split(" ")[0];

      console.log('t1', t1, 't2', t2);
      
      let h1 = 0;
      let h2 = 0;
      console.log((this.fromTime, time));
      
      if(Number(t1.split(":")[0]) == 12 && this.fromTime.split(" ")[1] == "AM") {
        h1 = 0;
      } else if (this.fromTime.split(" ")[1] == "PM") {
        h1 =  Number(t1.split(":")[0]) + 12;
      } else {
        h1 =  Number(t1.split(":")[0]);
      }
      if(Number(t2.split(":")[0]) == 12 && time.split(" ")[1] == "AM") {
        h2 = 0;
      } else if (time.split(" ")[1] == "PM") {
        h2 =  Number(t2.split(":")[0]) + 12;
      }else {
        h2 =  Number(t2.split(":")[0]);
      }

      let m1 = Number(t1.split(":")[1]);
      let m2 = Number(t2.split(":")[1]);

      let m = ((h2 * 60) + m2) - ((h1 * 60) + m1);      

      event_element.style.height = (m * .943) + 'px';


    }
  }

  hw = 0;

  drop(e) {
    let event_element = document.getElementById('event-item');
    let i = e.distance.y;
    let top = event_element.style.top.split("px")[0];
    this.hw = this.hw + (i);
    let x = (Number(top) + this.hw);
    let t = (x/.943)/60;
    let min = this.hourSet(t);
    let min2 = this.hourSet(t);
    // this.dialogService.toTimeSub.next(min2)

    this.dialogService.clickedTime.next(min);
    console.log(min);
    
  }

}
