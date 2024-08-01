import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

function mustContainQuestionMark(control:AbstractControl){
  return (control.value.includes('?')) ?  null : {doesNotContainQuestionMark:true}
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
      validators:[Validators.required, Validators.email, mustContainQuestionMark ]
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
    console.log(this.loginForm.value.email, this.loginForm.value.password)
  }
}
