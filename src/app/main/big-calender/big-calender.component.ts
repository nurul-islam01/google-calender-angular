
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AddReminderComponent } from 'src/app/dialog/add-reminder/add-reminder.component';
import { DialogService } from './../../dialog/dialog.service';
import { MainService } from './../main.service';

@Component({
  selector: 'app-big-calender',
  templateUrl: './big-calender.component.html',
  styleUrls: ['./big-calender.component.css']
})
export class BigCalenderComponent implements OnInit, OnDestroy {

  days: Date [];


  subs1: Subscription;
  subs2: Subscription;
  subs3: Subscription;
  subs4: Subscription;
  subs5: Subscription;
  subs6: Subscription;
  month: number;
  year: number;
  dateIndex;
  visibility;

  firstDate: Date;
  lastDate: Date;

  dialogRef;

  firstItem = false;
  offsetLeft;
  offsetTop;

  constructor(private mainService: MainService, private dialog: MatDialog, private dialogService: DialogService) { }

  ngOnInit() {
    
    this.subs1 = this.mainService.calenderDates.subscribe((days: Date[]) => {
      this.days = days;      
    });
    this.mainService.monthYearNumber.subscribe((monthYear: string) => {
      this.month = parseInt(monthYear.split(" ")[0]);
      this.year = parseInt(monthYear.split(" ")[1]);
    });

    this.subs3 = this.mainService.createClickEvent.subscribe(click => {
      if(click) {
        this.addDate();
      }
    })

    this.subs4 = this.mainService.firstDate.subscribe((firstDate: Date) => {      
      this.firstDate = firstDate;
      if(firstDate) {
        this.firstDate = firstDate;
      }
      

    });
    
    this.subs5 = this.mainService.moveDate.subscribe((firstDate: Date) => {
      if(firstDate) {
        this.firstDate = firstDate;
        this.moveDialog(firstDate);
        this.noTitleOpen(true);
        this.visibility = true;
        if(this.lastDate && firstDate) {
          this.widthShow(firstDate, this.lastDate);
        }
      }
    });


    this.subs6 = this.mainService.lastDate.subscribe((lastDate: Date) => {
      this.lastDate = lastDate;
      if(this.firstDate && this.lastDate) {
        this.widthShow(this.firstDate, lastDate);
        this.visibility = true;
      }
    });
    
  }

  addDate() {
    let date = new Date();
    let index = null;
    if(this.month == date.getMonth()) {
      index = this.days.findIndex(i => (i.toLocaleDateString() ) == (date.toLocaleDateString()))
    } else {
      let lastDate = new Date(this.year, this.month, 1);
      index = this.days.findIndex(i => (i.toLocaleDateString() ) == (lastDate.toLocaleDateString()))
    }

    let ele = document.getElementById('indx' + index);

    let offsetLeft = 0;
    let offsetTop = 0;

    if((index === 27) ||(index === 29) || (index === 30) || (index === 31) || (index === 32) || (index === 33) || (index === 34)) {
      offsetLeft = ele.offsetLeft - 220;
      offsetTop = ele.offsetTop - 130;
    }
    else if((index === 0) || (index === 7) || (index === 14) || (index === 32) || (index === 33) || (index === 34)) {
      offsetLeft = ele.offsetLeft + 510;
      offsetTop = ele.offsetTop + 50;
    }
    else if((index === 1) || (index === 2) || (index === 3) || (index === 4) || (index === 5) || (index === 6)  || (index === 8) || (index === 9) || (index === 10) || (index === 11) || 
    (index === 12) || (index === 13) || (index === 15) || (index === 16) || (index === 17) || (index === 18) || (index === 19) || (index === 20) || (index === 22) || (index === 13) || (index === 24) 
    || (index === 25) || (index === 26) ) {
      offsetLeft = ele.offsetLeft - 220;
      offsetTop = ele.offsetTop + 50;
    }else if((index === 21) || (index === 28) ) {
      offsetLeft = ele.offsetLeft + 510;
      offsetTop = ele.offsetTop - 130;
    }
  

     this.dialogRef = this.dialog.open(AddReminderComponent, {
      width: '500px',
      position: {left:  offsetLeft + 'px', top: offsetTop + 'px'},
      data: this.days[index],
      hasBackdrop: true
    })
            
    this.dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.dateIndex = null;
      this.mainService.createClickEvent.next(false);
    })

  }

  moveDialog(date: Date) {
    let index = null;
    if(this.month == date.getMonth()) {
      index = this.days.findIndex(i => (i.toLocaleDateString() ) == (date.toLocaleDateString()))
    } else {
      let lastDate = new Date(this.year, this.month, 1);
      index = this.days.findIndex(i => (i.toLocaleDateString() ) == (lastDate.toLocaleDateString()))
    }

    let ele = document.getElementById('indx' + index);

    let offsetLeft = 0;
    let offsetTop = 0;

    if((index === 27) ||(index === 29) || (index === 30) || (index === 31) || (index === 32) || (index === 33) || (index === 34)) {
      offsetLeft = ele.offsetLeft - 220;
      offsetTop = ele.offsetTop - 130;
    }
    else if((index === 0) || (index === 7) || (index === 14) || (index === 32) || (index === 33) || (index === 34)) {
      offsetLeft = ele.offsetLeft + 510;
      offsetTop = ele.offsetTop + 50;
    }
    else if((index === 1) || (index === 2) || (index === 3) || (index === 4) || (index === 5) || (index === 6)  || (index === 8) || (index === 9) || (index === 10) || (index === 11) || 
    (index === 12) || (index === 13) || (index === 15) || (index === 16) || (index === 17) || (index === 18) || (index === 19) || (index === 20) || (index === 22) || (index === 13) || (index === 24) 
    || (index === 25) || (index === 26) ) {
      offsetLeft = ele.offsetLeft - 220;
      offsetTop = ele.offsetTop + 50;
    }else if((index === 21) || (index === 28) ) {
      offsetLeft = ele.offsetLeft + 510;
      offsetTop = ele.offsetTop - 130;
    }

    const dialogConfig = new MatDialogConfig();
    dialogConfig.position = {left: offsetLeft + 'px', top: offsetTop + 'px'};
    dialogConfig.scrollStrategy = 

    this.dialogRef.updatePosition(dialogConfig.position);
    
    
  }

  addReminder(e: MouseEvent, index) {
    this.dateIndex = index;    

    let d = new Date().toString();
    let t = d.split(" ")[4];
    this.dialogService.clickedTime.next(t.split(":")[0] +":" + t.split(":")[1]);
  
    let offsetLeft = 0;
    let offsetTop = 0;

    let ele = e.srcElement;

    if((index === 27) ||(index === 29) || (index === 30) || (index === 31) || (index === 32) || (index === 33) || (index === 34)) {
      offsetLeft = ele['offsetLeft'] - 220;
      offsetTop = ele['offsetTop'] - 130;
    }
    else if((index === 0) || (index === 7) || (index === 14) || (index === 32) || (index === 33) || (index === 34)) {
      offsetLeft = ele['offsetLeft'] + 510;
      offsetTop = ele['offsetTop'] + 50;
    }
    else if( (index === 25) || (index === 26) || (index === 1) || (index === 2) || (index === 3) || (index === 4) || (index === 5) || (index === 6)  || (index === 8) || (index === 9) || (index === 10) || (index === 11) || 
    (index === 12) || (index === 13) || (index === 15) || (index === 16) || (index === 17) || (index === 18) || (index === 19) || (index === 20) || (index === 22) || (index === 13) ) {
      offsetLeft = ele['offsetLeft'] - 220;
      offsetTop = ele['offsetTop'] + 50;
    }else if((index === 21) || (index === 28) ) {
      offsetLeft = ele['offsetLeft'] + 510;
      offsetTop = ele['offsetTop'] - 130;
    } else {
      offsetLeft = ele['offsetLeft'] - 220;
      offsetTop = ele['offsetTop'] + 50;
    }

    this.firstDate = this.days[index];
    
    this.noTitleOpen(true);

    this.dialogRef = this.dialog.open(AddReminderComponent, {
      width: '500px',
      position: {left:  offsetLeft + 'px', top: offsetTop + 'px'},
      data: this.firstDate,
      hasBackdrop: true
    })    

            
    this.dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.noTitleOpen(false)
      this.visibility = false;
      this.widthShow(this.firstDate, this.lastDate);
    })


  }



  noTitleOpen(visibility) {
    this.visibility = visibility;
    let index = 0;
    let date = new Date(this.firstDate);

    if(this.firstDate) {
      index = this.days.findIndex(i => i.toLocaleDateString() == date.toLocaleDateString());
    }
    console.log(this.firstDate.toLocaleDateString(), this.days[6].toLocaleDateString(), index);

    let ele = document.getElementById('indx' + index);    
    
    let element;


    if( index > -1 && index < 7) {
      element = document.getElementById('item0');
      element.style.left = (ele.offsetLeft + 10) + 'px';
      element.style.width = (ele.offsetWidth) + 'px';
      element.style.visibility = this.visibility ? 'visible' : 'hidden';

      element = document.getElementById('item1');
      element.style.visibility = 'hidden';
      element = document.getElementById('item2');
      element.style.visibility = 'hidden';
      element = document.getElementById('item3');
      element.style.visibility = 'hidden';
      element = document.getElementById('item4');
      element.style.visibility = 'hidden';

    } else if((index == 7) || (index == 8) || (index == 9) || (index == 10) || (index == 11) || (index == 12) || (index == 13)){
      element = document.getElementById('item1');
      element.style.left = (ele.offsetLeft + 10) + 'px';
      element.style.width = (ele.offsetWidth) + 'px';
      element.style.visibility = this.visibility ? 'visible' : 'hidden';

      element = document.getElementById('item0');
      element.style.visibility = 'hidden';
      element = document.getElementById('item2');
      element.style.visibility = 'hidden';
      element = document.getElementById('item3');
      element.style.visibility = 'hidden';
      element = document.getElementById('item4');
      element.style.visibility = 'hidden';

    }else if((index == 14) || (index == 15) || (index == 16) || (index == 17) || (index == 18) || (index == 19) || (index == 20))  {
      element = document.getElementById('item2');
      element.style.left = (ele.offsetLeft + 10) + 'px';
      element.style.width = (ele.offsetWidth) + 'px';
      element.style.visibility = this.visibility ? 'visible' : 'hidden';

      element = document.getElementById('item0');
      element.style.visibility = 'hidden';
      element = document.getElementById('item1');
      element.style.visibility = 'hidden';
      element = document.getElementById('item3');
      element.style.visibility = 'hidden';
      element = document.getElementById('item4');
      element.style.visibility = 'hidden';

    } else if((index == 21) || (index == 22) || (index == 23) || (index == 24) || (index == 25) || (index == 26) || (index == 27))  {
      element = document.getElementById('item3');
      element.style.left = (ele.offsetLeft + 10) + 'px';
      element.style.width = (ele.offsetWidth) + 'px';
      element.style.visibility = this.visibility ? 'visible' : 'hidden';

      element = document.getElementById('item0');
      element.style.visibility = 'hidden';
      element = document.getElementById('item1');
      element.style.visibility = 'hidden';
      element = document.getElementById('item2');
      element.style.visibility = 'hidden';
      element = document.getElementById('item4');
      element.style.visibility = 'hidden';


    } else if((index == 28) || (index == 29) || (index == 30) || (index == 31) || (index == 32) || (index == 33) || (index == 34)) {
      element = document.getElementById('item4');
      element.style.left = (ele.offsetLeft + 10) + 'px';
      element.style.width = (ele.offsetWidth) + 'px';
      element.style.visibility = this.visibility ? 'visible' : 'hidden';

      element = document.getElementById('item0');
      element.style.visibility = 'hidden';
      element = document.getElementById('item1');
      element.style.visibility = 'hidden';
      element = document.getElementById('item2');
      element.style.visibility = 'hidden';
      element = document.getElementById('item3');
      element.style.visibility = 'hidden';

    }
    
  }

  widthShow(firstDate: Date, lastDate: Date) {

    
    let index = 0;
    let ele = null;
    let firstEle = 0, sencondEle = 0, thirdEle = 0, fourthEle = 0, fiveEle = 0;

    if(firstDate && lastDate){
      index = this.days.findIndex(i => i.toLocaleDateString() === firstDate.toLocaleDateString());
      ele = document.getElementById('indx' + index);

      this.dateCount(firstDate, lastDate).forEach( i => {
      let index  = this.days.findIndex(i2 => i2.toLocaleDateString() === i.toLocaleDateString());
        if(index < 7) {
          firstEle = firstEle + 1;
        } else if((index > 6 && index < 14)) {
          sencondEle = sencondEle + 1;
        }else if(index > 13 && index < 21) {
          thirdEle = thirdEle + 1;
        } else if(index > 20 && index < 28) {
          fourthEle = fourthEle + 1;
        } else if(index > 27 && index < 35)  {
          fiveEle = fiveEle + 1;
        }
    });

    }

    if(index < 7) {
      let element;
      element = document.getElementById('item0');
      element.style.left = (ele.offsetLeft + 10) + 'px';
      element.style.width = (ele.offsetWidth * firstEle) + 'px';
      element.style.visibility = this.visibility ? 'visible' : 'hidden';

      if( sencondEle > 0){
        let element;
        element = document.getElementById('item1');
        element.style.width = (ele.offsetWidth * sencondEle) + 'px';
        element.style.left = '0px';

        element.style.visibility = this.visibility ? 'visible' : 'hidden';
      } if(thirdEle > 0)  {
        let element;
        element = document.getElementById('item2');
        element.style.width = (ele.offsetWidth * thirdEle) + 'px';
        element.style.left = '0px';
        element.style.visibility = this.visibility ? 'visible' : 'hidden';
      }  if( fourthEle > 0)  {
        let element;
        element = document.getElementById('item3');
        element.style.width = (ele.offsetWidth * fourthEle) + 'px';
        element.style.left = '0px';
        element.style.visibility = this.visibility ? 'visible' : 'hidden';
      }  if(fiveEle > 0) {
        let element;
  
        element = document.getElementById('item4');
        element.style.width = (ele.offsetWidth * fiveEle) + 'px';
        element.style.left = '0px';
        element.style.visibility = this.visibility ? 'visible' : 'hidden';
      }
      if(sencondEle <= 0 ) {
        let element;
        element = document.getElementById('item1');
        element.style.visibility = 'hidden';
      }
      if(thirdEle <= 0 ) {
        let element;
        element = document.getElementById('item2');
        element.style.visibility = 'hidden';
      }
      if(fourthEle <= 0 ) {
        let element;
        element = document.getElementById('item3');
        element.style.visibility = 'hidden';
      }
      if(fiveEle <= 0 ) {
        let element;
        element = document.getElementById('item4');
        element.style.visibility = 'hidden';
      }
    }

    else if((index > 6 && index < 14)){
      let element;
      element = document.getElementById('item1');
      element.style.left = (ele.offsetLeft + 10) + 'px';
      element.style.width = (ele.offsetWidth * sencondEle) + 'px';
      element.style.visibility = this.visibility ? 'visible' : 'hidden';

      if(thirdEle > 0)  {
        let element;
        element = document.getElementById('item2');
        element.style.width = (ele.offsetWidth * thirdEle) + 'px';
        element.style.left = '0px';
        element.style.visibility = this.visibility ? 'visible' : 'hidden';
      } if( fourthEle > 0)  {
        let element;
        element = document.getElementById('item3');
        element.style.width = (ele.offsetWidth * fourthEle) + 'px';
        element.style.left = '0px';
        element.style.visibility = this.visibility ? 'visible' : 'hidden';
      }  if(fiveEle > 0) {
        let element;
  
        element = document.getElementById('item4');
        element.style.width = (ele.offsetWidth * fiveEle) + 'px';
        element.style.left = '0px';
        element.style.visibility = this.visibility ? 'visible' : 'hidden';
      }   
      
      if(thirdEle <= 0 ) {
        let element;
        element = document.getElementById('item2');
        element.style.visibility = 'hidden';
      }
      if(fourthEle <= 0 ) {
        let element;
        element = document.getElementById('item3');
        element.style.visibility = 'hidden';
      }
      if(fiveEle <= 0 ) {
        let element;
        element = document.getElementById('item4');
        element.style.visibility = 'hidden';
      }

    } else if(index > 13 && index < 21)   {
      let element;
      element = document.getElementById('item2');
      element.style.left = (ele.offsetLeft + 10) + 'px';
      element.style.width = (ele.offsetWidth * thirdEle) + 'px';
      element.style.visibility = this.visibility ? 'visible' : 'hidden';

      if( fourthEle > 0)  {
        let element;
        element = document.getElementById('item3');
        element.style.width = (ele.offsetWidth * fourthEle) + 'px';
        element.style.left = '0px';
        element.style.visibility = this.visibility ? 'visible' : 'hidden';
      }  if(fiveEle > 0) {
        let element;
  
        element = document.getElementById('item4');
        element.style.width = (ele.offsetWidth * fiveEle) + 'px';
        element.style.left = '0px';
        element.style.visibility = this.visibility ? 'visible' : 'hidden';
      }  
      if(fourthEle <= 0 ) {
        let element;
        element = document.getElementById('item3');
        element.style.visibility = 'hidden';
      }
      if(fiveEle <= 0 ) {
        let element;
        element = document.getElementById('item4');
        element.style.visibility = 'hidden';
      }

    } else if(index > 20 && index < 28) {
      let element;
      element = document.getElementById('item3');
      element.style.width = (ele.offsetWidth * fourthEle) + 'px';
      element.style.visibility = this.visibility ? 'visible' : 'hidden';

      if(fiveEle > 0) {
        let element;
  
        element = document.getElementById('item4');
        element.style.width = (ele.offsetWidth * fiveEle) + 'px';
        element.style.left = '0px';
        element.style.visibility = this.visibility ? 'visible' : 'hidden';
      }   
      if(fiveEle <= 0 ) {
        let element;
        element = document.getElementById('item4');
        element.style.visibility = 'hidden';
      }

    } else if (index > 27 && index < 35)  {
      let element;

      element = document.getElementById('item4');
      element.style.left = (ele.offsetLeft + 10) + 'px';
      element.style.width = (ele.offsetWidth * fiveEle) + 'px';
      element.style.left = '0px';
      element.style.visibility = this.visibility ? 'visible' : 'hidden';
    } 
    
    if(firstEle <= 0 ) {
      let element;
      element = document.getElementById('item0');
      element.style.visibility = 'hidden';
    }
    if(sencondEle <= 0 ) {
      let element;
      element = document.getElementById('item1');
      element.style.visibility = 'hidden';
    }
    if(thirdEle <= 0 ) {
      let element;
      element = document.getElementById('item2');
      element.style.visibility = 'hidden';
    }
    if(fourthEle <= 0 ) {
      let element;
      element = document.getElementById('item3');
      element.style.visibility = 'hidden';
    }
    if(fiveEle <= 0 ) {
      let element;
      element = document.getElementById('item4');
      element.style.visibility = 'hidden';
    }

  }

  dateCount(firstDate: Date, lastDate: Date) {
    let days: Date[] = [];
    let date = new Date(firstDate);
    while(date.toLocaleDateString() !== lastDate.toLocaleDateString()) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    days.push(lastDate);    
    return days;
  }


  getDate(date: Date) {
    return date.toString().split(" ")[2];
  }

  mouseUp() {
    this.mainService.prevMonth();
  }

  mouseDown() {
    this.mainService.nextMonth();
  }

  formatDate(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
  }

  thisMonth(date: Date) {
    return !((this.month == date.getMonth()) && (this.year == date.getFullYear()));
  }

  activeDate(date:Date) {
    let d = new Date();    
    return (d.getDate() == date.getDate()) && (d.getMonth() == date.getMonth()) && (d.getFullYear() == date.getFullYear());
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
    
    if(this.subs5) {
      this.subs5.unsubscribe()
    }
    
    if(this.subs6) {
      this.subs6.unsubscribe()
    }
    
  }
}
