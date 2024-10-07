import {CanActivate, CanActivateFn, Router} from '@angular/router';
import {AuthService} from "../service/auth.service";
import {Injectable} from "@angular/core";
@Injectable({
  providedIn: 'root'
})


export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const user = this.authService.getCurrentUser();
    if (user) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
