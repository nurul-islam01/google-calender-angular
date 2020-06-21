import { MainService } from './main.service';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {


  constructor(private mainService: MainService) {}

  ngOnInit() {

  
  }

  create() {
    this.mainService.createClickEvent.next(true);
  }
  
}
