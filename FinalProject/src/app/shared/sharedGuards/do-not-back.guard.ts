import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { ManipulationService } from '../services/manipulateData/manipulation.service';

export const doNotBackGuard: CanDeactivateFn<boolean> = (route, state) => {
  const manipulatesaerviuce = inject(ManipulationService);
  if (manipulatesaerviuce.logedIn) {
    return false;
  }  
    return true;
};