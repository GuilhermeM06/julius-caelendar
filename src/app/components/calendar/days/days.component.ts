import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-days',
  templateUrl: './days.component.html',
  styleUrls: ['./days.component.scss']
})
export class DaysComponent implements OnInit {

  calendarDate: Date

  constructor(calendarDate: Date) {
    this.calendarDate = calendarDate
  }

  ngOnInit(): void {}

  calendarDays(){
    const lastDay = new Date(this.calendarDate.getFullYear(), this.calendarDate.getMonth() + 1, 0).getDate();
    for(let i = 1; i <= lastDay;i++){

    }
  }

}
