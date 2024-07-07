import { Component, effect, inject } from '@angular/core';
import { ProfileHeaderComponent } from "../../common-ui/profile-header/profile-header.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { first, firstValueFrom, last } from 'rxjs';
import { ProfileService } from '../../data/services/profile.service';

@Component({
    selector: 'app-settings-page',
    standalone: true,
    templateUrl: './settings-page.component.html',
    styleUrl: './settings-page.component.scss',
    imports: [ProfileHeaderComponent, ReactiveFormsModule]
})
export class SettingsPageComponent {

  fb = inject(FormBuilder);
  profileService= inject(ProfileService);


  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: [{value: '', disabled: true}, Validators.required],
    description: [''],
    stack: [''],
  })

  constructor() {
   effect(()=>{
    //@ts-ignore
    this.form.patchValue({
      ...this.profileService.me(),
      // @ts-ignore
      stack: this.mergeStack(this.profileService.me()?.stack)
    });
   })
  }

  onSave() {    
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) {
      return;
    }

    //@ts-ignore
    firstValueFrom(this.profileService.updateProfile({
      ...this.form.value,
      // @ts-ignore
      stack: this.splitStack(this.form.value.stack)
    }));
  }

  splitStack(stack: string | null | string[]) {
    if (!stack) {
      return []; 
      
    }

    if(Array.isArray(stack)){
      return stack
    }

    return stack.split(',').map((item: string) => item.trim());
  }

  mergeStack(stack: string | null | string[]) {
    if (!stack) {
      return ''; 
      
    }

    if(Array.isArray(stack)){
      return stack.join(', ')
    }

    return stack;
  }
}
