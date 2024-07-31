import { afterNextRender, Component, DestroyRef, inject, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import {  debounceTime } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [FormsModule]
})
export class LoginComponent {
  private loginform = viewChild<NgForm>('form');
  private destroyRef = inject(DestroyRef)
  constructor(){
    afterNextRender(()=>{
      const subscription = this.loginform()?.valueChanges?.pipe(debounceTime(500)).subscribe({
        next: (value)=> localStorage.setItem('login-form', JSON.stringify({'mail': value.mail}))        
      })
      this.destroyRef.onDestroy(()=>subscription?.unsubscribe())
    })
  }
  onSubmit(formObj:NgForm){
    if (formObj.form.invalid) return
    let email = formObj.form.value.mail
    let pwd = formObj.form.value.passcode
    // console.log(email, pwd)
    formObj.form.reset();
  }
}
//