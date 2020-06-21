import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EventDetailsComponent>, 
    @Inject(MAT_DIALOG_DATA) public data
    ) { }

  ngOnInit(): void {
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
}
