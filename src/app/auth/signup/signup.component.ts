import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

function mustIncludeSymbols(control: AbstractControl){
  let symbols = ['/', '-', '$', '!', '#', '%', '^', '&', '*']
  for (let i = 0 ; i< symbols.length ; i++)
    if (control.value.includes(symbols[i])){ 
      return null
    }
  return {mustIncludeSymbols: true}
}
@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  imports: [ReactiveFormsModule]
})
export class SignupComponent {
  signupForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email]
    }), 
    password: new FormControl('', {
      validators: [Validators.minLength(8), Validators.required, 
        mustIncludeSymbols]
    })
  })
  
  onSubmit(){
    console.log(this.signupForm.value.email, '\n',
       this.signupForm.value.password)
    console.dir(this.signupForm)
  }
}
