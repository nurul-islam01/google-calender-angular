import { EventDetailsComponent } from './../../dialog/event-details/event-details.component';
import { MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  date: Date;
  time: string;
  eventText: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { date: new Date(), time: '12:25 am', eventText: 'this is test event text'},
  { date: new Date(), time: '12:25 am', eventText: 'this is test event text'},
  { date: new Date(), time: '12:25 am', eventText: 'this is test event text'},
  { date: new Date(), time: '12:25 am', eventText: 'this is test event text'},
  { date: new Date(), time: '12:25 am', eventText: 'this is test event text'},
  { date: new Date(), time: '12:25 am', eventText: 'this is test event text'},
  { date: new Date(), time: '12:25 am', eventText: 'this is test event text'},
  { date: new Date(), time: '12:25 am', eventText: 'this is test event text'},
  { date: new Date(), time: '12:25 am', eventText: 'this is test event text'},
  { date: new Date(), time: '12:25 am', eventText: 'this is test event text'},
  { date: new Date(), time: '12:25 am', eventText: 'this is test event text'},
  { date: new Date(), time: '12:25 am', eventText: 'this is test event text'},
  { date: new Date(), time: '12:25 am', eventText: 'this is test event text'},
  { date: new Date(), time: '12:25 am', eventText: 'this is test event text'},
  { date: new Date(), time: '12:25 am', eventText: 'this is test event text'},
  { date: new Date(), time: '12:25 am', eventText: 'this is test event text'},
  { date: new Date(), time: '12:25 am', eventText: 'this is test event text'},
  { date: new Date(), time: '12:25 am', eventText: 'this is test event text'},
  { date: new Date(), time: '12:25 am', eventText: 'this is test event text'},
  { date: new Date(), time: '12:25 am', eventText: 'this is test event text'},

  
];


@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})

export class ScheduleComponent implements OnInit {

  displayedColumns = ['date', 'time', 'eventText'];
  dataSource = ELEMENT_DATA;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }


  tarik(date: Date) {
    return date.toString().split(" ")[2];
  }

  mashDin(date: Date) {
    return date.toString().split(" ")[0] + ", " + date.toString().split(" ")[1];
  }

  eventDialog(row, e: MouseEvent) {

    const dialogRef = this.dialog.open(EventDetailsComponent, {
      width: '448px',
      position: { top: e.clientY + 'px'},
      data: row
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

  }
}
