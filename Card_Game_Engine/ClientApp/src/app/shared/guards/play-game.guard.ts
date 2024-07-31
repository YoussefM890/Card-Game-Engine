import {CanActivateFn} from '@angular/router';
import {inject} from '@angular/core';
import {Router} from '@angular/router';
import {SignalRService} from '../services/signalr.service';

export const playGameGuard: CanActivateFn = (route, state) => {
  const signalRService = inject(SignalRService);
  const router = inject(Router);

  if (signalRService.userInfo != null) {
    return true;
  } else {
    router.navigate(['/home']);
    return false;
  }
};
