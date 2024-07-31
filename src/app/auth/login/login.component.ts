import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [FormsModule]
})
export class LoginComponent {
  onSubmit(formObj:NgForm){
    if (formObj.form.invalid) return
    let email = formObj.form.value.mail
    let pwd = formObj.form.value.passcode
    // console.log(email, pwd)
    console.log(formObj)
  }
}
