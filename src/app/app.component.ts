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

    }))])
  ]
})
export class AppComponent {
  title = 'angular-pomodoro-app';
}
