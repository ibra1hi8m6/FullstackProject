import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { FirstKeyTsPipe } from '../../shared/pips/first-key.ts.pipe';
import { AuthService } from '../../shared/services/Authentication/Auth/auth.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FirstKeyTsPipe, RouterModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
})
export class RegistrationComponent {
  form: FormGroup;
  isSubmitted = false;
  constructor(
    public formBuilder: FormBuilder,
    private service: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.form = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        secondName: ['', Validators.required],
        role: ['User'],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: ['', [Validators.required, Validators.pattern(/^\+?\d{7,15}$/)]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.pattern(/(?=.*[^a-zA-Z0-9 ])/),
          ],
        ],
        confirmPassword: ['', Validators.required],
        address: this.formBuilder.group({
          description: ['', Validators.required],
          areaName: [''],
          streetName: [''],
          buildingNumber: [''],
          floorNumber: [''],
          flatNumber: [''],
        }),
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator: Validators = (control: AbstractControl): null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (password && confirmPassword && password.value != confirmPassword.value)
      confirmPassword?.setErrors({ passwordMismatch: true });
    else confirmPassword?.setErrors(null);
    return null;
  };

  onSubmit() {
    this.isSubmitted = true;
    //console.log(this.form.value);
    this.service.createUser(this.form.value).subscribe({
      next: (res: any) => {
        if (res.successed) {
          this.form.reset();
          this.isSubmitted = false;
          this.toastr.success('New user created!', 'Registration Successful');
          this.router.navigateByUrl('/user/signin');
        }
        console.log(res);
      },
      error: (err) => {
  if (err.error && Array.isArray(err.error.errors)) {
    // Identity-style errors
    err.error.errors.forEach((x: any) => {
      switch (x.code) {
        case 'DuplicateUserName':
          this.toastr.error('Username already exists.', 'Registration Failed');
          break;
        case 'DuplicateEmail':
          this.toastr.error('Email is already taken.', 'Registration Failed');
          break;
        default:
          this.toastr.error(x.description || 'Unknown error', 'Registration Failed');
          break;
      }
    });
  } else if (err.error && err.error.detail) {
    // Your thrown Exception
    this.toastr.error(err.error.detail, 'Registration Failed');
  } else {
    this.toastr.error('Unexpected error occurred.', 'Registration Failed');
    console.error(err);
  }
},
    });
  }

  hasDisplayableError(controlName: string): Boolean {
    const control = this.form.get(controlName);
    return (
      Boolean(control?.invalid) &&
      (this.isSubmitted || Boolean(control?.touched) || Boolean(control?.dirty))
    );
  }
}
