import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { of } from 'rxjs';

function mustContainQuestionMark(control:AbstractControl){
  return (control.value.includes('?')) ?  null : {doesNotContainQuestionMark:true}
}

function emailIsUnique(control:AbstractControl){
  return (control.value !== 'admin@example.com') ? of(null) : of({notUnique:true})
}

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [ReactiveFormsModule, ]
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', {
      validators:[Validators.required, Validators.email,  ], 
      asyncValidators: [emailIsUnique] 
    }),
    password: new FormControl('', {
      validators:[Validators.minLength(8), Validators.required, mustContainQuestionMark]
    })
  })

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
