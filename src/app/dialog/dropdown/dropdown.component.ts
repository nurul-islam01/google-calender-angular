import { MainService } from './../../main/main.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DropdownComponent>, @Inject(MAT_DIALOG_DATA) data: any, private mainService: MainService) { }

  ngOnInit(): void {
  }

  onClick() {
    this.dialogRef.close();
  }

  selectDropdown(selected) {
    this.mainService.selectedSub.next(selected);
    this.dialogRef.close();
  }

}
