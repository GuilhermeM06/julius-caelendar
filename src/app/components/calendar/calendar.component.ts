import { ScheduleComponent } from './../schedule/schedule.component';
import { Component, OnInit, Input, Output} from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})



export class CalendarComponent implements OnInit {

  selectDay = ""
  date = new Date()
  days:Array<number>= []
  prevDays:Array<number>= []
  nextDays:Array<number>= []
  active:boolean = false
  daySelected: number = 0



  constructor() {
  }

  ngOnInit(): void {

    this.calendarDays()
  }

  thisMonth(): string{
    const months = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];

    return months[this.date.getMonth()]
  }

  calendarDays(){
    const calendarDate = this.date
    const prevLastDay = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), 0).getDate()
    const firstDayIndex = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), 1).getDay()
    for(let x = firstDayIndex; x > 0; x--){
      this.prevDays.push(prevLastDay - x + 1)
    }

    // this.prevDays.shift()

    const lastDay = new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 0).getDate();
    for(let i = 1; i <= lastDay;i++){
      this.days.push(i)
    }

    const lastDayIndex = new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 0).getDay();
    const nextDays = 7 - lastDayIndex - 1;
    for(let j = 1; j <= nextDays; j++){
      this.nextDays.push(j)
    }
  }


  thisDate(): string{
    return this.date.toLocaleDateString()
  }

  nextMonth(){
    this.date.setMonth(this.date.getMonth() + 1)
    this.clear()
    this.calendarDays()

  }

  prevMonth(){
    this.date.setMonth(this.date.getMonth() - 1)
    this.clear()
    this.calendarDays()
  }

  clear(){
    this.days = []
    this.prevDays = []
    this.nextDays = []
  }

  selectDate(day: number) {
    let selected = new Date(this.date.getFullYear(), this.date.getMonth(), day)
    this.selectDay =  selected.toLocaleDateString()
  }

  onToggle(day: string){
    this.daySelected = Number(day)
  }
}
