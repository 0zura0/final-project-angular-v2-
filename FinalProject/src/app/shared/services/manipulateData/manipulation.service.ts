import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ManipulationService {
  constructor() { }
  leftbarDisabled = false;
  topBarsDisabled = false;
  rightBarsDisabled = false;
  wholeTopDiv = false;
  logedIn = false;
}
