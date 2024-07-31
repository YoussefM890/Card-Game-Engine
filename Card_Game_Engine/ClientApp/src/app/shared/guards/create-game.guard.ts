import {CanActivateFn} from '@angular/router';
import {inject} from '@angular/core';
import {Router} from '@angular/router';
import {SignalRService} from '../services/signalr.service';

export const createGameGuard: CanActivateFn = (route, state) => {
  const signalRService = inject(SignalRService);
  const router = inject(Router);
  const userInfo = signalRService.userInfo;

  if (userInfo == null) {
    router.navigate(['/home']);
    return false;
  } else if (!userInfo.isRoomOwner) {
    router.navigate(['/play']);
    return false;
  } else {
    return true;
  }
};
