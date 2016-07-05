import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'all-pins',
  templateUrl: 'all-pins.component.html',
  styleUrls: ['all-pins.component.css']
})
export class AllPinsComponent implements OnInit {
  cheshireAscii = `
           .'/   /'.					
         .'.-.'-'.-.'.					
    ..._:   .-. .-.   :_...				
  .'    '-.(o ) (o ).-'    '.			
 :  _    _ _'~(_)~'_ _    _  :			
:  /:   ' .-=_   _=-. '   ;/  :			
:   :|-.._  '     '  _..-|:   :			
 :   ':| |':-:-.-:-:'| |:'   :			
  '.   '.| | | | | | |.'   .'			
    '.   '-:_| | |_:-'   .'				
      '-._   ''''    _.-'				
          ''-------''					
  `;

  constructor() { }

  ngOnInit() { }

}