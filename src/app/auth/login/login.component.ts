import { Component, DestroyRef, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, of } from 'rxjs';

function mustContainQuestionMark(control:AbstractControl){
  return (control.value.includes('?')) ?  null : {doesNotContainQuestionMark:true}
}

function emailIsUnique(control:AbstractControl){
  return (control.value !== 'admin@example.com') ? of(null) : of({notUnique:true})
}

// Load saved data
const savedForm = localStorage.getItem('saved-login-form');
const initialEmailValue = savedForm ? JSON.parse(savedForm).email : '';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [ReactiveFormsModule, ]
})
export class LoginComponent {
  destroyRef = inject(DestroyRef);
  loginForm = new FormGroup({
    email: new FormControl(initialEmailValue, {
      validators:[Validators.required, Validators.email,  ], 
      asyncValidators: [emailIsUnique] 
    }),
    password: new FormControl('', {
      validators:[Validators.minLength(8), Validators.required, mustContainQuestionMark]
    })
  })
  ngOnInit() {
    const subscription = this.loginForm.valueChanges.pipe(debounceTime(5500)).subscribe(value => {
        localStorage.setItem('saved-login-form', JSON.stringify({ email: value.email }));
    });

    // Clean up subscription
    this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
    });
}

  get emailInvalid(){
    return this.loginForm.controls.email.touched  && this.loginForm.controls.email.dirty 
    && this.loginForm.controls.email.invalid 
  }

  get passwordInvalid(){
    return this.loginForm.controls.password.touched  && this.loginForm.controls.password.dirty 
    && this.loginForm.controls.password.invalid 
  }

  onSubmit(){
    // console.log(this.loginForm.value.email, this.loginForm.value.password)
    console.log(this.loginForm)
  }
}
