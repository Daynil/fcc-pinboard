import { Component, Input, OnChanges } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'toast',
  template: '<div class="toast-wrap"><div class="toast" *ngIf="toastText">{{ toastText }}</div></div>',
  styles: [`
    .toast {
      display: inline-block;
      margin-top: 20px;
      background-color: hsla(0, 0%, 0%, 0.6);
      color: aliceblue;
      font-style: 'Raleway';
      padding: 10px;
      border-radius: 10px;
      transition: all 0.3s;
    }
  `]
})
export class ToastComponent implements OnChanges {

  @Input() message: string;
  toastText: string = null;

  constructor() { }

  ngOnChanges() {
    this.toast(this.message);
  }

  /** Show a notification message */
  toast(text: string) {
    let timeout = (text.length < 30) ? 2000 : 3000;
    this.toastText = text;
    window.setTimeout(() => this.toastText = null, timeout);
  }

}