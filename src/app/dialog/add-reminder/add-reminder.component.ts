import { MainService } from './../../main/main.service';
import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { DialogService } from './../dialog.service';


@Component({
  selector: 'app-add-reminder',
  templateUrl: './add-reminder.component.html',
  styleUrls: ['./add-reminder.component.css']
})
export class AddReminderComponent implements OnInit {

  filterData: any;
  showType = 1;
  addTime = false;
  toTime: string;
  fromTime: string;

  diverShow = false;
  conferencing = false;
  editor = false;
  clickedDate: string;
  addFormGroup: FormGroup;
  fromTimes: string[];
  toTimes: string[];
  clickedTime: string;

  fromTimeModel;
  toTimeModel;

  constructor(private dialogRef: MatDialogRef<AddReminderComponent>,
    @Inject(MAT_DIALOG_DATA) public data:Date,
    private dialog: MatDialog,
    private dialogService: DialogService,
    private mainService: MainService,
    private fb: FormBuilder
    ) {       
      this.clickedDate = this.data.toLocaleDateString();
      this.mainService.firstDate.next(this.data);
    }

  ngOnInit(): void {

    this.addFormGroup = this.fb.group({
      title: ['', [Validators.required]],
      fromdate: [this.clickedDate, [Validators.required]],
      fromtime: ['', [Validators.required]],
      todate: [this.clickedDate, [Validators.required]],
      totime: ['', [Validators.required]],
      addguests: ['', [Validators.email]],
      addlocation: '',
      description: '',
      addtype: ['1', [Validators.required]],
      addtask: ['1'],
      allDay: ['true'],
      taskAllDay: ['true'],
    });        
    
    // this.dialogService.toTimeSub.subscribe((toTime: string) => {
    //   this.toTime = toTime;
    // });
    
    // this.dialogService.fromTimeSub.subscribe((fromTime: string) => {
    //   this.fromTime = fromTime;      
    // });

    
    // this.dialogService.fromTimesSub.subscribe((times: string[]) => {
    //   this.fromTimes = times;
    // });

    // this.dialogService.toTimesSub.subscribe((times: string[]) => {
    //   this.toTimes = times;
    // });
    this.dialogService.clickedTime.subscribe((time: string) => {
      this.clickedTime = time;
    });


    this.mainService.timeShow.subscribe((show: boolean) => {
      this.addTime = show;
    });

    this.timesSet();
  }

  fromDateModel;

  fromDateChange(newValue) {
    this.fromDateModel = newValue;    
    if(newValue) {
      this.mainService.firstDate.next(newValue);
      this.mainService.moveDate.next(newValue);
      this.data = newValue;
    }

  }
  toDateModel;

  toDateChange(newValue) {
    console.log(newValue);

    this.toDateModel = newValue;
    if(newValue) {
      this.mainService.lastDate.next(newValue);
    }
  }

  saveReminder() {
    this.dialogRef.close();
  }

  typeforRm(type) {
    this.showType = type;
  }

  onAddTime() {
    this.addTime = !this.addTime;
  }

  datePickerOpen(datePicker) {
    datePicker.open();
  }

  selectedFromTime(item) {
    this.dialogService.fromTimeSub.next(item);
    this.dialogService.moveTime.next(item);
    this.fromTime = item;
  }
  selectedToTime(item: string) {
    this.toTime = item.split(' ')[0] + " " + item.split(" ")[1];
    this.dialogService.toTimeSub.next(this.toTime);
  }

  public events: string[] = [];
    public value = `
        <p>
           Description
        </p>
        
    `;

    public valueChange(value: any): void {
        this.log('valueChange', value);
        console.log(value);
        
    }

    private log(event: string, arg: any): void {
        this.events.push(`${event} ${arg || ''}`);
    }

    timesSet() {

      let x = 15; 
      let times = [];
      let tt = 0; 
      let ap = [' AM', ' PM']; 
      
      for (let i=0; tt<24*60; i++) {
        let hh = Math.floor(tt/60);
        let mm = (tt%60); 
        if(("0" + (hh % 12)).slice(-2) == '00') {
          times[i] = 12 + ':' + ("0" + mm).slice(-2) + ap[Math.floor(hh/12)]
        } else {
          times[i] = ("0" + (hh % 12)).slice(-2) + ':' + ("0" + mm).slice(-2) + ap[Math.floor(hh/12)]; 
        }
        tt = tt + x;
      }
      let date = this.clickedTime;
      let minutes = Number(date.split(":")[1]);
      let hour = Number(date.split(":")[0]);
  

      let index = 0;
      if(minutes > 0 && minutes < 16){
        index = (hour * 4) + 1;         
      }else if(minutes > 15 && minutes < 31) {
        index = (hour * 4) + 2;   
      }
      else if(minutes > 30 && minutes < 46 ) {
        index = (hour * 4) + 3;
      }
      else if(minutes > 45 && minutes <= 59 ) {
        index = (hour * 4) + 4;
      }
      
      this.fromTime = times[index];
      this.dialogService.fromTimeSub.next(this.fromTime);
      // this.fromTimes = times;
      let tm = [];
      let t1 = 0;
      for(let a = index; a < times.length; a++) {
        tm[t1] = times[a];
        t1 = t1 + 1;
      }
      for(let b = 0; b < times.length; b++) {
        tm[t1] = times[b];
        t1 = t1 + 1;
      }

      this.fromTimes = tm;
  
      let toIndex = index + 4;
  
      let toTim = [];
      let tx = 0;
      let ti = 0;
      for(let x = index + 1; x < times.length; x++) {
        tx  = tx + 15;
        let hx = tx/60;
        let ty = '';
        if(hx < 1) {
          ty = times[x] + ' (' + tx +' minutes)';
        } else {
          ty = times[x] + ' (' + hx +' hours)';
        }
        toTim[ti] = ty;
        ti = ti + 1;
      }
      
      for(let y = 0; y < index + 1; y ++) {
        tx  = tx + 15;
        let hx = tx/60;
        let ty = '';
        if(hx < 1) {
          ty = times[y] + ' (' + tx +' minutes)';
        } else {
          ty = times[y] + ' (' + hx +' hours)';
        }
        toTim[ti] = ty;
        ti = ti + 1;
      }
      
      this.toTime = times[toIndex];
      this.toTimes = toTim ;
      this.dialogService.toTimeSub.next(this.toTime);
    }

}
