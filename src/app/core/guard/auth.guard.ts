import { CanActivateFn } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

export const authGuard: CanActivateFn = (route, state): Observable<boolean> => {
  const userService = inject(UserService);
  const router = inject(Router);
  return new Observable<boolean>(obs => {
    
    userService.isAuthenticated.subscribe((isAuthenticated: boolean) => {
      if (isAuthenticated) {
        obs.next(true);
      } else {
        router.navigateByUrl("/login");
        obs.next(false);
      }
    });
  });
  
};
