import { Component, ElementRef, OnInit, ViewChild, Renderer2 ,AfterViewChecked, ContentChild, TemplateRef, ViewChildren, QueryList } from '@angular/core';

@Component({
  selector: 'app-root',
  template:`
   <div class="inner">
              <div id="number">
                {{breakDuration | number:'2.0'}}:{{breakseconds | number:'2.0'}}
              </div>`,
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
  @ViewChild("idAudio2") idAudio2: ElementRef;
  @ViewChild("idOuter") idOuter: ElementRef;
  @ViewChild("idOuterbreak") idOuterbreak: ElementRef;
  @ViewChild("idstart") idstart: ElementRef;


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

  constructor(
    private renderer: Renderer2
  ) { }

  ngAfterViewInit() {

  }

  // Animated work Circle
  animatedCircle(){
    let startValue = 1;
    let endValue = Math.floor(this.staticWorkMinValue * 60);

    let progress = setInterval(() => {
     if(this.workDuration >= 0 && this.seconds > 0 &&
      this.disabled === true && this.show === false) { //Start
      startValue += 1;
     }else if(startValue === endValue){ //End Interval
        clearInterval(progress);
      }
      else if (this.workDuration === this.staticWorkMinValue &&
        this.seconds === 0){ //Reset
          startValue = 1;
        }
        this.idOuter.nativeElement.style.background = `conic-gradient(#264653 ${startValue * (360/endValue)}deg , #287271 0deg)`;
    }, 1000)
  }

  // Break Circle
  animatedBreakCircle(){
    let startBreakValue = 1;
    let endBreakValue = Math.floor(this.staticBreakMinValue * 60);

    let breakprogress = setInterval(() => {
     if(this.breakDuration >= 0 && this.breakseconds > 0 &&
      this.disabled === true && this.show === false) {//Start
        startBreakValue += 1;
     }else if(startBreakValue === endBreakValue){//End Interval
        clearInterval(breakprogress);
      }
        this.idOuterbreak.nativeElement.style.background = `conic-gradient(#264653 ${startBreakValue * (360/endBreakValue)}deg , #287271 0deg)`;
    }, 1000)
  }


  ngOnInit(): void {

  }
  // public audioDisplay = (this.idAudio.nativeElement);

  // //Audios
  // changeValue1 (){
  //   this.audioDisplay = this.idAudio.nativeElement;
  // }
  // changeValue2 (){
  //   this.audioDisplay = this.idAudio2.nativeElement;
  // }

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
      this.idAudio.nativeElement.load();
      this.animate = true;
      setTimeout(() => {
        this.idAudio.nativeElement.play ();
      }, this.breakDuration = this.staticBreakMinValue,(this.breakDuration * 10000), this.toggleBreak(), this.startBreak(), );
    }

  }
  //break timer
  updateBreakTimer() {
      this.breakdate.setMinutes(this.breakDuration);
      this.breakdate.setSeconds(this.breakseconds);
      const breaktime = this.breakdate.getTime();
      this.breakdate.setTime(breaktime - 1000);


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
      this.animatedCircle();
      this.idstart.nativeElement.style.boxShadow = '2px 6px 10px 2px rgba(0, 0, 0, 0.432)'
      this.idstart.nativeElement.style.background = '#e76f51'
      this.idstart.nativeElement.style.color = '#snow'
      this.idstart.nativeElement.style.border = ' 2px solid #e76f51'
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
    this.animatedBreakCircle();
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

interface AfterViewInit{
  ngAfterViewInit(): void


}

