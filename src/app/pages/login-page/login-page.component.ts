import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthServiceService } from '../../auth/auth-service.service';
// import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {

  authService = inject(AuthServiceService);
  
  form: FormGroup = new FormGroup(
    {
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    }
  )

  onSubmit(): void{

    if(this.form.valid){
      // @ts-ignore
      this.authService.login(this.form.value).subscribe(
        (response) => {
          console.log(response)
        },
        (error) => {
          console.log(error)
        }
      );
    }
    
  }

}
