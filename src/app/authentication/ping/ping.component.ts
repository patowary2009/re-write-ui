import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ping',
  templateUrl: './ping.component.html'
})
export class PingComponent implements OnInit {
  isSuccess = true;

  constructor() { }

  ngOnInit(): void {
    this.isSuccess = true;
  }

}
