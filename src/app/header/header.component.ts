import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { DropdownComponent } from '../dialog/dropdown/dropdown.component';
import { MainService } from './../main/main.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  searchShow = false;
  month: string;
  selected: string;

  subs1: Subscription;
  subs2: Subscription;

  constructor(private mainService: MainService,  private dialog: MatDialog) { }

  ngOnInit() {
    
    this.subs1 = this.mainService.monthYearSub.subscribe((month: string) => {
      this.month = month;
    })
    
    this.subs2 = this.mainService.selectedSub.subscribe((selected: string) => {
      this.selected = selected;
    });

    this.selected = 'Month';
  }


  setSearchShow() {
    this.searchShow = !this.searchShow;
  }

  prevMonth() {
    this.mainService.prevMonth();
  }

  nextMonth() {
    this.mainService.nextMonth();
  }

  ngOnDestroy() {
    if(this.subs1) {
      this.subs1.unsubscribe()
    }
  
  }

  dropDown(e: MouseEvent) {
    let offsetRight = 0;
    let offsetTop = 0;

    let el = e.srcElement;

    offsetRight = el['offsetRight']  + 1000;
    offsetTop = el['offsetTop'] + 50;

    el = el['parentElement'];

    const dialogRef = this.dialog.open(DropdownComponent, {
      width: '200px',
      position: {right:  offsetRight + 'px', top: offsetTop + 'px'},
      hasBackdrop: true
    })
  }
  
}
