import { Component, OnInit } from '@angular/core';

import { Pin } from '../shared/pin.model';
import { PinService } from '../shared/pin.service';
import { PinComponent } from '../shared/pin/pin.component';

@Component({
  moduleId: module.id,
  selector: 'my-pins',
  templateUrl: 'my-pins.component.html',
  styleUrls: ['my-pins.component.css'],
  directives: [PinComponent]
})
export class MyPinsComponent implements OnInit {
  
  constructor(private pinService: PinService) { }

  ngOnInit() { }

  deletePin(pin: Pin) {
    this.pinService.deletePin(pin);
  }
}