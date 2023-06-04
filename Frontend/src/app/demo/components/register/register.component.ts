import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../service/Api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  formGroup = new FormGroup({
    username    : new FormControl<string | null>(null,[Validators.required,Validators.email]),
    email       : new FormControl<string | null>(null,[Validators.required,Validators.email]),
    password    : new FormControl<string | null>(null,[Validators.required,Validators.maxLength(50)]),
    confirm_password : new FormControl<string | null>(null,[Validators.required,Validators.maxLength(50)]),
    bio: new FormControl<string | null>(null),
    avatar: new FormControl<string | null>(null)
  })

  /////////////
  // Extra ///
  ////////////

  constructor(
    private loginService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
  ){

  }

  onMobile(): boolean {
    return window.innerWidth <= 700;
  }

  onSave(){
    const formGroupvalue = this.formGroup.value;
    const payload  = {
      username:formGroupvalue.username,
      email:formGroupvalue.email,
      password:formGroupvalue.password,
      bio: null,
      avatar:null
    }
    this.loginService.Register(payload)
    
  }

  //////////////
  //Navigations
  ////////////

  navigateToLogin(){
    this.router.navigate(['/'], { relativeTo: this.route });
  }

}
