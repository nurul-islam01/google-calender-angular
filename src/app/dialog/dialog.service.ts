import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  fromTimeSub = new BehaviorSubject<string>(null);
  toTimeSub = new BehaviorSubject<string>(null);
  fromTimesSub = new BehaviorSubject<string[]>(null);
  toTimesSub = new BehaviorSubject<string[]>(null);
  moveTime = new BehaviorSubject<string>(null);
  clickedTime = new BehaviorSubject<string>(null);

  constructor() { 
  }

  
}
