import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { EmailValidatorService } from 'src/app/shared/validator/email-validator.service';
import { ValidatorsService } from 'src/app/shared/validator/validators.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  get emailErrorMsg(): string {
    const errors = this.registerForm.get('email')?.errors;
    if (errors?.required) {
      return 'Email es obligatorio';
    } else if (errors?.pattern) {
      return 'Email no tiene un formato correcto';
    } else if (errors?.emailTaken) {
      return 'Email ya esta registrado';
    }
    return '';
  }



  registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(this.validatorService.nameLastNameParent)]],
    email: ['', [Validators.required, Validators.pattern(this.validatorService.emailPattern)], [this.emailValidator]],
    username: ['', [Validators.required, this.validatorService.noStrinder]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]]
  }, {
    validators: [this.validatorService.equalFields('password', 'password2')]
  })

  constructor(private fb: FormBuilder, private validatorService: ValidatorsService, private emailValidator: EmailValidatorService) { }

  ngOnInit(): void {
    this.registerForm.reset({
      name: 'Juan Perez',
      email: 'test@gmail.com',
      username: 'luifer',
      password: '123456',
      password2: '123456'
    });
  }

  fieldNovalide(field: string) {
    return this.registerForm.get(field)?.invalid && this.registerForm.get(field)?.touched
  }

  register() {
    console.log(this.registerForm.value);
    this.registerForm.markAllAsTouched();
  }

}
