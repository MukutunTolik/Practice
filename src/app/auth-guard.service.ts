import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}
  
  canActivate(): boolean {
    if (!this.authService.getToken())
    {
      this.router.navigate(['/auth']);
    }
    return (this.authService.getToken() !== undefined);
  }
}