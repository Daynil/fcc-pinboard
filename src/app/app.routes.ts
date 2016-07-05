import { provideRouter, RouterConfig } from '@angular/router';

import { AddPinComponent } from './add-pin/add-pin.component';
import { AllPinsComponent } from './all-pins/all-pins.component';
import { MyPinsComponent } from './my-pins/my-pins.component';


export const routes: RouterConfig = [
  { path: '', component: AllPinsComponent },
  { path: 'my-pins', component: MyPinsComponent },
  { path: 'add-pin', component: AddPinComponent }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];