import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {RoleEntity} from "../../../iam/model/role.entity";
import {RoleService} from "../../../iam/service/role.service";
import {UserEntity} from "../../../iam/model/user.entity";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatOption, MatSelect} from "@angular/material/select";
import {RouterLink} from "@angular/router";
import {LanguageSwitcherComponent} from "../../../public/components/language-switcher/language-switcher.component";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    MatFormField,
    MatInput,
    MatButton,
    MatSelect,
    MatOption,
    NgIf,
    MatLabel,
    MatError,
    RouterLink,
    LanguageSwitcherComponent,
    TranslateModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerDTO: UserEntity = new UserEntity({});
  roles: RoleEntity[] = [];

  constructor(private authService: AuthService, private roleService: RoleService) {}

  ngOnInit(): void {
    this.roleService.getAll().subscribe((roles: RoleEntity[]) => {
      this.roles = roles;
    });
  }

  onRegister() {
    this.authService.register(this.registerDTO).subscribe(response => {
      console.log('Registration successful', response);
    }, error => {
      console.error('Registration failed', error);
    });
  }
}
