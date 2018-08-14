
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Service} from './service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public myForm: FormGroup;
  public RegistrationForm: FormGroup;
  viewsnack: boolean;
  Register = false;
  loginSuccess = false;
  userData: any;

  snack_message:string;
  
  commonData_validation() {
    const loginForm = {
      Username: ['', [Validators.required]],
      Password : ['', [Validators.required]]
    };
    return loginForm;
  }

  Registration_validation() {
    const RegisterForm = {
      FirstName: ['', [Validators.required]],
      LastName : ['', [Validators.required]],
      email:['', [Validators.required]],
      password:['', [Validators.required]]

    };
    return RegisterForm;
  }


  constructor(private _fb: FormBuilder,private service:Service) { }
  ngOnInit() {
    this.myForm = this._fb.group({
      common_data: this._fb.group(this.commonData_validation())     
    });

    this.RegistrationForm = this._fb.group({
      reg_data: this._fb.group(this.Registration_validation())     
    });
  }

login(data) {
    this.service.login(data.common_data).then((result) => {
      if (result.success) {
        this.snack_message = result.message;
        this.userData = result.user_data[0];
        console.log(this.userData);
        this.loginSuccess = true;
      } else {
        this.snack_message = result.message;
      }
      });
      this.viewsnack = true;
      setTimeout(() => {
        this.viewsnack = false;
      }, 2500);

  }




register(data) {
  this.service.register(data.reg_data).then((result) => {
    if (result.success) {
      this.snack_message = 'Submitted successfully';
      this.loginSuccess = false;
      this.Register = false;

    } else {
      this.snack_message = result.message;
    }
    });
    this.viewsnack = true;
    setTimeout(() => {
      this.viewsnack = false;
    }, 2500);

}



}
