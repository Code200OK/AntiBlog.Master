import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ConfirmPasswordValidator } from '../auth/confirmed.validator';
import { RegistrationService } from '../services/registration.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { RegisterUser } from '../models/user/register-user';
import { StateTransfer } from '../models/state-transfer';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.sass'],
})
export class RegistrationPageComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  submitted = false;
  spinner: boolean;
  errorMessage: string;

  private registerUser$: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private registrationService: RegistrationService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        first_name: new FormControl(null, [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern('[a-zA-Z]*')
        ]),
        last_name: new FormControl(null, [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern('[a-zA-Z]*')
        ]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(100),
          Validators.pattern('(?=.*[0-9])(?=.*[A-Z]).{8,}')
        ]),
        confirmPassword: new FormControl(null, [
          Validators.required,
        ]),
        gender: new FormControl(null),
      },
      { validator: ConfirmPasswordValidator.MatchPassword }
    );

    this.registerForm.patchValue({ gender: '2', tc: true });
  }

  ngOnDestroy(): void {
    this.registerUser$.unsubscribe();
  }

  submit() {
    this.spinner = true;
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    const registerUser: RegisterUser = {
      password: this.registerForm.value.password,
      confirmPassword: this.registerForm.value.confirmPassword,
      email: this.registerForm.value.email,
      firstName: this.registerForm.value.first_name,
      lastName: this.registerForm.value.last_name,
      gender: Number(this.registerForm.value.gender)
    };
    this.registerUser$ = this.registrationService
      .registerUser(registerUser)
      .subscribe((data: StateTransfer) => {
        localStorage.setItem('token', data.message);
        this.registerForm.reset();
        this.router.navigate(['/campus/dashboard']);
      }, (errorResponse: HttpErrorResponse) => {
        this.errorMessage = errorResponse.error;
        this.spinner = false;
      });
  }
}
