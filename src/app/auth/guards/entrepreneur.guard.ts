import {CanActivate, Router} from '@angular/router';
import {AuthService} from "../service/auth.service";
import {Injectable} from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class EntrepreneurGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const user = this.authService.getCurrentUser();
    if (user && user.entrepreneur_id) {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}
