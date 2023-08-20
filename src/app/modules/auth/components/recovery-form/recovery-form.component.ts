import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { CustomValidators } from '@utils/validators';

import { AuthService } from '@services/auth.service'
import { RequestStatus } from '@models/request-status.model'

@Component({
  selector: 'app-recovery-form',
  templateUrl: './recovery-form.component.html',
})
export class RecoveryFormComponent {

  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);


  form = this.formBuilder.nonNullable.group(
    {
      newPassword: ['', [Validators.minLength(6), Validators.required]],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validators: [
        CustomValidators.MatchValidator('newPassword', 'confirmPassword'),
      ],
    }
  );
  status: RequestStatus = 'init';
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;
  token = '';

  constructor() {
    this.route.queryParamMap.subscribe(params => {
      const token = params.get('token');
      if (token) {
        this.token = token;
      } else {
        this.router.navigate(['/login'])
      }
    })
  }

  recovery() {
    if (this.form.valid) {
      const { newPassword } = this.form.getRawValue();
      this.status = 'loading';
      this.authService.changePassword(this.token, newPassword)
      .subscribe({
        next: () => {
          this.status = 'success';
          this.router.navigate(['/login']);
        },
        error: () => {
          this.status = 'failed'
        }
      })
      // Todo
    } else {
      this.form.markAllAsTouched();
    }
  }
}
