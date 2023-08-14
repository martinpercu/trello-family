import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { CustomValidators } from '@utils/validators';
import { RequestStatus } from '@models/request-status.model';
import { AuthService } from '@services/auth.service';



@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
})
export class RegisterFormComponent {

  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);

  formAvailableEmail = this.formBuilder.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
  })

  form = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.minLength(8), Validators.required]],
    confirmPassword: ['', [Validators.required]],
  }, {
    validators: [ CustomValidators.MatchValidator('password', 'confirmPassword') ]
  });
  status: RequestStatus = 'init';
  statusAvailableEmail: RequestStatus = 'init';
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;
  showRegister = false;

  // constructor(
  //   private formBuilder: FormBuilder,
  //   private router: Router
  // ) {}

  register() {
    if (this.form.valid) {
      this.status = 'loading';
      const { name, email, password } = this.form.getRawValue();
      console.log(name, email, password);
      this.authService.register(name, email, password)
      .subscribe({
        next: () => {
          console.log('ok');
          this.status = 'success';
          this.router.navigate(['/login'])
        },
        error: () => {
          this.status = 'failed';
        }
      })
    } else {
      this.form.markAllAsTouched();
    }
  }

  validateUserEmail() {
    if(this.formAvailableEmail.valid) {
      this.statusAvailableEmail = 'loading';
      const { email } = this.formAvailableEmail.getRawValue();
      this.authService.isAvailable(email)
      .subscribe({
        next: (rta) => {
          console.log('in-validate-email');
          this.statusAvailableEmail = 'success';
          if (rta.isAvailable) {
            this.form.controls.email.setValue(email);
            this.showRegister = true
          } else {
            this.router.navigate(['/login'], {
              queryParams: { email }
            })
          }
        },
        error: () => {
          this.statusAvailableEmail = 'failed';
        }
      })
    } else {
      this.formAvailableEmail.markAllAsTouched();
    }
  }
}
