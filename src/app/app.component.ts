import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-pomodoro-app';
  public workDuration = 25
  public minutes = 5
  public breakDuration = 5
  public seconds = 0
  private app = type;

  private date = new Date()
  show: boolean = true
  disabled: boolean = false
  animate: boolean = false
  @ViewChild("idAudio") idAudio: ElementRef;



  //Increasing time in settings
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

  //Settings show
  isDisplay = false;
  toggleDisplay(){
    this.isDisplay = !this.isDisplay
  }

  constructor() { }

  ngOnInit(): void {
  }

  updateTimer() {
    this.date.setMinutes(this.workDuration);
    this.date.setSeconds(this.seconds);
    this.date.setMilliseconds(0);
    const time = this.date.getTime();
    this.date.setTime(time - 1000);  //---

    this.minutes = this.date.getMinutes();
    this.seconds = this.date.getSeconds();

    if (this.date.getHours() === 0 &&
      this.date.getMinutes() === 0 &&
      this.date.getSeconds() === 0) {
      //stop interval
      clearInterval(this.app);
      this.idAudio.nativeElement.play();
      this.animate = true;
      setTimeout(() => {
        this.stop();
        this.idAudio.nativeElement.load();
      }, 5000);

    }
  }

  start() {
    if ( this.workDuration > 0 || this.seconds > 0) {

      this.disabled = true;
      this.show = false;  //hide btn + and -
      this.updateTimer();

      if(this.seconds > 0){
        this.app = setInterval(() => {
          this.updateTimer();
        }, 1000);
      }
    }
  }

  stop() {
    this.disabled = false;
    this.show = true;
    this.animate = false;
    clearInterval(this.app);
    this.idAudio.nativeElement.load();
  }

  reset() {
    this.workDuration = 0;
    this.seconds = 0;
    this.stop();
  }
}
