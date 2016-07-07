import { Component, ElementRef, 
         AfterViewInit, ViewChild } from '@angular/core';

import { Dimens } from '../shared/dimens.model';
import { PinService } from '../shared/pin.service';
import { ToastComponent } from '../shared/toast.component';

@Component({
  moduleId: module.id,
  selector: 'add-pin',
  templateUrl: 'add-pin.component.html',
  styleUrls: ['add-pin.component.css'],
  directives: [ToastComponent]
})
export class AddPinComponent implements AfterViewInit {

  @ViewChild('wrapper') cardWrapper: ElementRef;
  @ViewChild('image') image: ElementRef;
  nativeImage: HTMLImageElement;

  minWidth = 200;
  maxWidth = 300;

  wrapperWidth = '200px';
  imageWidth = '200px';

  brokenImagePlaceholder = 'https://res.cloudinary.com/dz9rf4hwz/image/upload/v1467920003/placeholder_pw4fxp_gg4pjd.gif';

  toast = '';
  
  constructor(private pinService: PinService) { }

  ngAfterViewInit() {
    this.nativeImage = this.image.nativeElement;
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
        this.nativeImage.src = this.brokenImagePlaceholder;
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
      }
    });
  }

  submitPin(title: HTMLInputElement, imageIn: HTMLInputElement) {
    let titleTxt = title.value;
    let imageTxt = imageIn.value;
    if (titleTxt.length < 1 || imageTxt.length < 1) return;
    this.pinService
        .submitPin(titleTxt, imageTxt)
        .then(res => {
          title.value = '';
          imageIn.value = '';
          this.toast = 'Pin added!';
          this.nativeImage.src = '';
        });
  }
  
}