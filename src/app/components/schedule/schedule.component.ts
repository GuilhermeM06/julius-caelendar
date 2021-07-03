import { Task } from './../../Model/TaskModel';

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  task: object = {}
  @Input() selectDay = ""
  @Output() open: EventEmitter<any> = new EventEmitter();
  inputTask: string = ""
  inputStartTime: string = ""
  inputEndTime = ""
  taskListStorage: any[] = []

  constructor() {

  }

  ngOnInit(): void {
    this.getTasks()
  }

  addTask(){
    this.task = {
      date: this.selectDay,
      name: this.inputTask,
      startTime: this.inputStartTime,
      finishTime: this.inputEndTime
    }
    if(this.permittedTime(this.task)){
      this.organizeList(this.task)
    } else{
      alert("Não é possivel cadasatrar nesse horario, escolha outro")
    }
    this.getTasks()
  }

  setStorage(task: object){
    let tasks: any[] = []
    if(localStorage.getItem("julius-caelendar:tasks")){
      tasks = JSON.parse(localStorage.getItem("julius-caelendar:tasks") || '{}')
      tasks = [...tasks, task]
    } else {
      tasks = [task]
    }
    localStorage.setItem("julius-caelendar:tasks", JSON.stringify(tasks))
  }



  permittedTime(newTask: any): boolean{
    let hourStart = Number(newTask.startTime.slice(0, 2))
    let minutesStart = Number(newTask.startTime.slice(3, 5))
    let hourEnd = Number(newTask.finishTime.slice(0, 2))
    let minutesEnd = Number(newTask.finishTime.slice(3, 5))
    for(let i in this.taskListStorage){
      let hourTaskStart = Number(this.taskListStorage[i].startTime.slice(0,2))
      let minutesTaskStart = Number(this.taskListStorage[i].startTime.slice(3,5))
      let hourTaskEnd = Number(this.taskListStorage[i].finishTime.slice(0,2))
      let minutesTaskEnd = Number(this.taskListStorage[i].finishTime.slice(3,5))
      if(newTask.date == this.taskListStorage[i].date){
        if(hourEnd > hourTaskStart && hourEnd < hourTaskEnd){
          return false
        }
        if(hourStart > hourTaskStart && hourStart < hourTaskEnd){
          return false
        }
        if(hourEnd == hourTaskStart && minutesEnd == minutesTaskStart){
          return false
        }
        if(hourEnd == hourTaskEnd && minutesEnd == minutesTaskEnd){
          return false
        }
        if(hourStart == hourTaskStart && minutesStart == minutesTaskStart){
          return false
        }
        if(hourStart == hourTaskEnd && minutesStart == minutesTaskEnd){
          return false
        }
        if(hourStart == hourTaskStart && minutesStart > minutesTaskStart){
          return false
        }
        if(hourStart == hourTaskEnd && minutesStart < minutesTaskEnd){
          return false
        }
        if(hourEnd == hourTaskStart && minutesEnd > minutesTaskStart){
          return false
        }
        if(hourEnd == hourTaskEnd && minutesEnd < minutesTaskEnd){
          return false
        }
        if(hourStart < hourTaskStart && hourEnd > hourTaskEnd){
          return false
        }
        if(hourStart == hourTaskStart && minutesStart < minutesTaskStart && hourEnd == hourTaskEnd && minutesEnd > minutesTaskEnd){
          return false
        }
      }
    }
    return true
  }


  organizedByTime(newTask: any): number{
    let hourEnd = Number(newTask.finishTime.slice(0, 2))
    let minutesEnd = Number(newTask.finishTime.slice(3, 5))
    for(let i in this.taskListStorage){
      let hourTaskStart = Number(this.taskListStorage[i].startTime.slice(0,2))
      let minutesTaskStart = Number(this.taskListStorage[i].startTime.slice(3,5))
      if(hourEnd < hourTaskStart){
        return Number(i)
      }
      if(hourEnd == hourTaskStart && minutesTaskStart !=0 && minutesEnd < minutesTaskStart){
        return Number(i)
      }
    }
    return this.taskListStorage.length
  }

  getTasks(){
    this.taskListStorage = JSON.parse(localStorage.getItem("julius-caelendar:tasks") || '[]')
  }

  organizeList(task: any){
    const index = this.organizedByTime(task)
    console.log(index)
    localStorage.clear()
    this.taskListStorage.splice(index, 0, task)
    for(let i in this.taskListStorage){
      this.setStorage(this.taskListStorage[i])
    }
    this.getTasks()
  }

  removeTask(task: any){
    const index = this.taskListStorage.indexOf(task)
    console.log(index)
    localStorage.clear()
    this.taskListStorage.splice(index, 1)
    for(let i in this.taskListStorage){
      this.setStorage(this.taskListStorage[i])
    }
    this.getTasks()
  }

  ifHaveTasks(day: string){
    const dia = day.slice(0, 2)
    console.log(dia)
    this.open.emit(dia);
  }

}

// const Storage = {
//   get(){
//       return JSON.parse(localStorage.getItem("dev.finances:transactions")) || []
//   },
//   set(transactions){
//       localStorage.setItem("dev.finances:transactions", JSON.stringify(transactions))
//   }
// }


