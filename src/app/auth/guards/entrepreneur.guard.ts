import {CanActivate, Router} from '@angular/router';
import {AuthService} from "../service/auth.service";
import {Injectable} from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class EntrepreneurGuard   {

  constructor(private authService: AuthService, private router: Router) {}


}
