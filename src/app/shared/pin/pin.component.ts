import { Component, ElementRef, Input, 
         AfterViewInit, ViewChild } from '@angular/core';

import { Dimens } from '../dimens.model';
import { Pin } from '../pin.model';
import { PinService } from '../pin.service';

@Component({
  moduleId: module.id,
  selector: 'pin',
  templateUrl: 'pin.component.html',
  styleUrls: ['pin.component.css']
})
export class PinComponent implements AfterViewInit {

  @Input() pin: Pin;

  @ViewChild('wrapper') cardWrapper: ElementRef;
  @ViewChild('image') image: ElementRef;
  nativeImage: HTMLImageElement;

  minWidth = 200;
  maxWidth = 300;

  wrapperWidth = '200px';
  imageWidth = '200px';

  constructor(private pinService: PinService) { }

  ngAfterViewInit() {
    this.nativeImage = this.image.nativeElement;
    this.setDimens(this.pin.imageUrl);
  }

  setDimens(imageUrl: string) {
    let imageDimens = new Promise((resolve, reject) => {
      this.nativeImage.addEventListener('load', () => {
        resolve({
          width: this.image.nativeElement.naturalWidth,
          height: this.image.nativeElement.naturalHeight
        });
      });
      this.nativeImage.addEventListener('error', () => {
        resolve({width: null, height: null});
      });
    });
    this.nativeImage.src = imageUrl;
    imageDimens.then((dimens: Dimens) => {
      console.log(dimens);
      if (dimens.width === null) {
        this.wrapperWidth = this.minWidth + 'px';
        this.imageWidth = this.minWidth + 'px';
      } else if (dimens.width < this.minWidth) {
        this.wrapperWidth = this.minWidth + 'px';
        this.imageWidth = dimens.width + 'px';
      } else if (dimens.width < this.maxWidth) {
        this.wrapperWidth = dimens.width + 'px';
        this.imageWidth = dimens.width + 'px';
      } else {
        this.wrapperWidth = this.maxWidth + 'px';
        this.imageWidth = this.maxWidth + 'px';
        console.log('changed width: ', this.imageWidth);
      }
    });
  }

  like() {
    this.pinService.likePin(this.pin);
  }

}