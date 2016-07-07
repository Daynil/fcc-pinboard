import { Component, OnInit } from '@angular/core';

import { PinService } from '../shared/pin.service';
import { PinComponent } from '../shared/pin/pin.component';

@Component({
  moduleId: module.id,
  selector: 'all-pins',
  templateUrl: 'all-pins.component.html',
  styleUrls: ['all-pins.component.css'],
  directives: [PinComponent]
})
export class AllPinsComponent implements OnInit {

  constructor(private pinService: PinService) { }

  ngOnInit() { }

}