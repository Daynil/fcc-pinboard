import { Component } from '@angular/core';

@Component({
  selector: 'attribution',
  template: `
    <div id="wrap">
      <a id="gh-link" href="https://github.com/Daynil/fcc-trading">
        <i class="fa fa-github-square fa-lg"></i>
      </a>
      <div id="text">
        By <a href="https://github.com/Daynil/">Daynil</a> for <a href="http://www.freecodecamp.com/">FCC</a>
      </div>
    </div>
  `,
  styles: [`
    #wrap {
      font-family: 'Raleway';
      font-size: 20px;
      color: #212121;
      text-align: center;
    }

    #text {
      display: inline-block;
      position: relative;
      top: 10px;
    }

    #gh-link {
      position: relative;
        top: 9px;
        right: 5px;
    }

    #wrap i, #wrap a {
      color: #00BCD4;
      transition: 0.3s;
      text-decoration: none;
    }

    #wrap a:hover, #gh-link:hover i {
      color: #B3E5FC;
      text-decoration: none;
    }

    #wrap i {
      padding-left: 2px;
    }
  `]
})
export class AttributionComponent {
  constructor() { }
}