import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-pomodoro-app';
  public workDuration = 1;
  public staticWorkMinValue = 1;
  public breakDuration = 1
  public staticBreakMinValue = 1;
  public seconds = 0
  public breakseconds = 0
  private app: any;
  private timer : any;

  private breakdate = new Date()
  private date = new Date()
  show: boolean = true
  disabled: boolean = false
  animate: boolean = false
  @ViewChild("idAudio") idAudio: ElementRef;

  //Increasing time in settings
  increase_focusTime(){
    this.workDuration += 1
    this.staticWorkMinValue += 1
  }
  decrease_focusTime(){
    this.workDuration -= 1
    this.staticWorkMinValue -= 1
  }
  increase_breakTime(){
    this.breakDuration += 1
    this.staticBreakMinValue +=1
  }
  decrease_breakTime(){
    this.breakDuration -= 1
    this.staticBreakMinValue -=1
  }


  //Settings show
  isDisplay = true;
  toggleDisplay(){
    this.isDisplay = !this.isDisplay
  }
  //Break time show
  isStudy = false
  isBreak = true;
  toggleBreak(){
    this.isBreak = !this.isBreak
    this.isStudy = !this.isStudy
  }

  constructor() { }

  ngOnInit(): void {
  }

  //Updating timer when finish time
  updateTimer() {
    this.date.setMinutes(this.workDuration);
    this.date.setSeconds(this.seconds);
    const time = this.date.getTime();
    this.date.setTime(time - 1000);  //---

    this.workDuration = this.date.getMinutes();
    this.seconds = this.date.getSeconds();

    if (this.date.getMinutes() === 0 &&
      this.date.getSeconds() === 0) {
      //stop interval
      clearInterval(this.app);
      this.idAudio.nativeElement.play();
      this.animate = true;
      setTimeout(() => {
        this.idAudio.nativeElement.load();
      }, this.breakDuration = this.staticBreakMinValue,(this.breakDuration * 10000), this.toggleBreak(), this.startBreak(), );
    }

  }
  //break timer
  updateBreakTimer() {
      this.breakdate.setMinutes(this.breakDuration);
      this.breakdate.setSeconds(this.breakseconds);
      const breaktime = this.breakdate.getTime();
      this.breakdate.setTime(breaktime - 1000);  //---

      this.breakDuration = this.breakdate.getMinutes();
      this.breakseconds = this.breakdate.getSeconds();

      if (this.breakdate.getMinutes() === 0 &&
        this.breakdate.getSeconds() === 0) {
        //stop interval
        clearInterval(this.timer);
        this.idAudio.nativeElement.play();
        this.animate = true;

        setTimeout(() => {
          this.idAudio.nativeElement.load();
        },
          (this.workDuration = this.staticWorkMinValue,this.workDuration * 10000),this.toggleBreak(), this.start());

      }


  }
  //Start study cycle button
  start() {
    if ( this.workDuration > 0 || this.seconds > 0) {

      this.disabled = true;
      this.show = false;  //hide btn
      this.updateTimer();

      if(this.seconds > 0){
        this.app = setInterval(() => {
          this.updateTimer();
        }, 1000);
      }
    }
  }
// start break cycle
startBreak() {
  if ( this.breakDuration > 0 || this.breakseconds > 0) {
    this.disabled = true;
    this.updateBreakTimer();

    if(this.breakseconds > 0){
      this.app = setInterval(() => {
        this.updateBreakTimer();
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
    if(this.isBreak === false){
      this.toggleBreak()
    }
    this.workDuration = this.staticWorkMinValue;
    this.seconds = 0;
    this.stop();
  }
}
