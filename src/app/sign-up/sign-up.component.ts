import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  FormArray,
  Validators,
  FormControlName,
  AbstractControl
} from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";

import { User} from '../user'
import { UserService } from './user.service'

import { NumberValidators } from '../shared/number.validator';
import { GenericValidator } from '../shared/generic-validator';
import {debounceTime, fromEvent, merge, Observable, Subscription} from "rxjs";

function passwordMatcher(control: AbstractControl): { [key: string]: boolean } | null {
  // Use of non-null assertion operator '!'
  const passwordControl = control.get('password')!;
  const confirmControl = control.get('confirmPassword')!;

  // Return null if either form has not been touched yey ('pristine')
  if (passwordControl.pristine || confirmControl.pristine) {
    return null;
  }

  // Return null if both values match
  if (passwordControl.value === confirmControl.value) {
    return null;
  }
  // Return a map of { 'match' : true} if control values differ
  else {
    return { 'match': true };
  }
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements!: ElementRef[];

  pageTitle = 'User Edit';
  errorMessage = '';
  userForm!: FormGroup;

  user!: User;
  private sub!: Subscription;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private userService: UserService) {

    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      userName: {
        required: 'User name is required.',
        minlength: 'User name must be at least three characters.',
        maxlength: 'User name cannot exceed 20 characters.'
      },
      email: {
        required: 'Email is required.',
        email: 'Email must be a valid email address.'
      },
      password: {
        required: 'Password is required.',
        minlength: 'Password must be at least eight characters.',
        maxlength: 'Password cannot exceed 20 characters.'
      }
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      userName: ['', [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)]],
      email: ['', [Validators.required,
        Validators.email]],
      passwordGroup: this.formBuilder.group({
        password: [
          '',
          [Validators.required,
            Validators.minLength(8),
            Validators.maxLength(30)]
        ],
        confirmPassword: [
          '',
          Validators.required
        ],
      }, { validator: passwordMatcher }),
      firstName: '',
      lastName: '',
      signUpDate: '',
      description: ''
    });

    // Read the product Id from the route parameter
    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.getUser(id);
      }
    );

    // Give 1s to the user to enter a value before displaying error messages
    const passwordControl = this.userForm.get('passwordGroup.password');
    passwordControl!.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe(
      value => this.setMessage(passwordControl)
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    // This is required because the valueChanges does not provide notification on blur
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur event observable with the valueChanges observable
    // so we only need to subscribe once.
    merge(this.userForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.userForm);
    });
  }

  getUser(id: number): void {
    this.userService.getUser(id)
      .subscribe({
        next: (user: User) => this.displayUser(user),
        error: err => this.errorMessage = err
      });
  }

  displayUser(user: User): void {
    if (this.userForm) {
      this.userForm.reset();
    }
    this.user = user;

    if (this.user.id === 0) {
      this.pageTitle = 'Create Account';
    } else {
      this.pageTitle = `Edit Account: ${this.user.userName}`;
    }

    // Update the data on the form
    this.userForm.patchValue({
      userName: this.user.userName,
      email: this.user.email,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      password: this.user.password,
      signUpDate: "10/01/2022"
    });
  }

  deleteUser(): void {
    if (this.user.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else if (this.user.id) {
      if (confirm(`Really delete the user: ${this.user.userName}?`)) {
        this.userService.deleteUser(this.user.id)
          .subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });
      }
    }
  }

  saveUser(): void {
    if (this.userForm.valid) {
      if (this.userForm.dirty) {
        const p = { ...this.user, ...this.userForm.value };

        if (p.id === 0) {
          this.userService.addUser(p)
            .subscribe({
              next: x => {
                console.log(x);
                return this.onSaveComplete();
              },
              error: err => this.errorMessage = err
            });
        } else {
          this.userService.updateUser(p)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        }
      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.userForm.reset();
    this.router.navigate(['/blog']);
  }

  setMessage(control: AbstractControl | null): void {
    // Clear current emailMessage
    this.errorMessage = '';

    // Determine a validation message should be displayed
    if ((control!.untouched || control!.dirty) && control!.errors) {
      this.errorMessage = Object.keys(control!.errors).map(
        key => this.validationMessages[key]).join('');
    }
  }
}
