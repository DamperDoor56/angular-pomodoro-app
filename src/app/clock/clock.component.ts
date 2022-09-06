import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clock',
  template: `
    <p>
      clock works!
    </p>
  `,
  styles: [
  ]
})
export class ClockComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
