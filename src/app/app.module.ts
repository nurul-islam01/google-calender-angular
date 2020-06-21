import { NgModule } from '@angular/core';

import { MaterialModule } from './material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { EditorModule } from '@progress/kendo-angular-editor';
import { ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LeftSidebarComponent } from './main/left-sidebar/left-sidebar.component';
import { BigCalenderComponent } from './main/big-calender/big-calender.component';
import { RightSidebarComponent } from './main/right-sidebar/right-sidebar.component';
import { MousewheelDirective } from './directive/mousewheel.directive';
import { AddReminderComponent } from './dialog/add-reminder/add-reminder.component';
import { DropdownComponent } from './dialog/dropdown/dropdown.component';
import { DayComponent } from './main/day/day.component';
import { WeeklyComponent } from './main/weekly/weekly.component';
import { ScheduleComponent } from './main/schedule/schedule.component';
import { EventDetailsComponent } from './dialog/event-details/event-details.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LeftSidebarComponent,
    BigCalenderComponent,
    RightSidebarComponent,
    MainComponent,
    MousewheelDirective,
    AddReminderComponent,
    DropdownComponent,
    DayComponent,
    WeeklyComponent,
    ScheduleComponent,
    EventDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    EditorModule,
    ReactiveFormsModule,
    DragDropModule
  ],
  providers: [],
  entryComponents: [AddReminderComponent, DropdownComponent, EventDetailsComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
