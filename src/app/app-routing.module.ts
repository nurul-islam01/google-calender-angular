
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DayComponent } from './main/day/day.component';
import { BigCalenderComponent } from './main/big-calender/big-calender.component';
import { ScheduleComponent } from './main/schedule/schedule.component';
import { WeeklyComponent } from './main/weekly/weekly.component';

const routes: Routes = [{
  path: '',
  component: BigCalenderComponent
}, {
  path: 'month',
  component: BigCalenderComponent
}, {
  path: 'day',
  component: DayComponent

}, {
  path: 'weekly',
  component: WeeklyComponent
},
{
  path: 'schedule',
  component: ScheduleComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
