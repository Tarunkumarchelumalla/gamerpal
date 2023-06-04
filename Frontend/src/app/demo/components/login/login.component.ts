import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../service/Api.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {


  subs = new Subscription()
visible: boolean = false;

formGroup = new FormGroup({
  email       : new FormControl<string | null>(null,[Validators.required,Validators.email]),
  password    : new FormControl<string | null>(null,[Validators.required,Validators.maxLength(50)])
})

constructor(
  private service :ApiService,
  private route: ActivatedRoute,
  private router: Router,
  private cookieService:CookieService
  )
  {

}
  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  onSave(){
    const payload={
      email:this.formGroup.get('email')?.value,
      password: this.formGroup.get('password')?.value
    }
   const subs1 = this.service.Login(payload).subscribe((response:any)=> {
      // Handle successful response
      
      if(response){
      this.cookieService.set('authToken',response.token);
      this.cookieService.set('refreshToken',response.refreshToken)
      this.cookieService.set('userid',response.payload.id)
      }
      this.router.navigate(['/dashboard'], { relativeTo: this.route });
      return console.log(response,response.token);
    });

    this.subs.add(subs1)

    
  }


}
