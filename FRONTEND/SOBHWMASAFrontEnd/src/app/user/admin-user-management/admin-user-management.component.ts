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
  selector: 'app-admin-user-management',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FirstKeyTsPipe, RouterModule],
  templateUrl: './admin-user-management.component.html',
  styleUrl: './registration.component.css',
})
export class AdminUserManagementComponent {
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
        role: ['Cashier', Validators.required],
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
        }
        console.log(res);
      },
      error: (err) => {
        if (err.error.errors)
          err.error.errors.forEach((x: any) => {
            switch (x.code) {
              case 'DuplicateUserName':
                break;

              case 'DuplicateEmail':
                this.toastr.error(
                  'Email is already taken.',
                  'Registration Failed'
                );
                break;

              default:
                this.toastr.error(
                  'Contact the developer',
                  'Registration Failed'
                );
                console.log(x);
                break;
            }
          });
        else console.log('error:', err);
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
