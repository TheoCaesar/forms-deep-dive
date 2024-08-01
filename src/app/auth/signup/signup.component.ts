import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

function mustIncludeSymbols(control: AbstractControl){
  let symbols = ['/', '-', '$', '!', '#', '%', '^', '&', '*']
  for (let i = 0 ; i< symbols.length ; i++)
    if (control.value.includes(symbols[i])){ 
      return null
    }
  return {mustIncludeSymbols: true}
}

// function confirmInitialPassword(control:AbstractControl){
//   if ()
// }

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
    passwords : new FormGroup({
      password: new FormControl('', {
        validators: [Validators.minLength(8), Validators.required, 
          mustIncludeSymbols]
      }),
      confirmPassword: new FormControl('', {
        validators: [Validators.minLength(8), mustIncludeSymbols]
      })      
    }),
    fname: new FormControl('', Validators.required),
    sname: new FormControl('', Validators.required),
    address: new FormGroup({
      street: new FormControl('', Validators.required),
      number: new FormControl('', Validators.required),
      postalCode: new FormControl('', Validators.required),
      City: new FormControl('', Validators.required),
    }),
    role: new FormControl<'student'|'teacher'|'employee'|'founder'|'other'>
          ('student', Validators.required),
    // enquiry:
    agreeTnCs: new FormControl (false, Validators.required)
  })
  
  onSubmit(){
    // console.log(this.signupForm.value.email, '\n',
    //    this.signupForm.value.passwords)
    console.dir(this.signupForm)
  }
}
