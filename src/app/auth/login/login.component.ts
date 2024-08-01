import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
      validators:[Validators.required, Validators.email]
    }),
    password: new FormControl('', {
      validators:[Validators.minLength(8), Validators.required]
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
