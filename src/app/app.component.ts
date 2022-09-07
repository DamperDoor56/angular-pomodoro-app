import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations:[
    trigger('pageNumber',
    [
      state('one',style({
        transform: 'translateX(0%)',
    })),
    state('two', style({
      transform: 'translateX(-33.3%)',
    })),
    state('three', style({
      transform: 'translateX(-66.6%)',
    })),
    transition('* <=> *',[
      animate('500ms ease')
    ])
  ])

  ]
})
export class AppComponent {
  title = 'angular-pomodoro-app';
  pageNumber = 'one'
  workDuration = 25
  breakDuration = 5
  minutes = this.workDuration - 1
  seconds = 60
  message = ['You can do it!', 'Go to work!', 'Almost break time!']
  interval : any = 0;


  toggle(pageNumber: string){
    this.pageNumber = pageNumber;
  }

  increase_focusTime(){
    this.workDuration += 1
  }
  decrease_focusTime(){
    this.workDuration -= 1
  }
  increase_breakTime(){
    this.breakDuration += 1
  }
  decrease_breakTime(){
    this.breakDuration -= 1
  }

}
