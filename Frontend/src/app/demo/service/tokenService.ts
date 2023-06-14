import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject,Observable,interval, skip, take, tap} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TokenService  {

  isExpiredToken = new BehaviorSubject<boolean>(false);

  constructor(   private cookieService: CookieService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    )
    {}

  isExpires(){
    const helper = new JwtHelperService();
    let access_token = this.cookieService.get('authToken')
    if(access_token){
      console.log("token", access_token)
      const isExpired = helper.isTokenExpired(access_token);
      console.log("token expires", isExpired)
      this.isExpiredToken.next(isExpired)
    }
    else{
      this.isExpiredToken.next(true)
    }
  }
  ngOnInit(): void {
        
    interval(30000).subscribe(() => {
      this.isExpires();
    });

    this.isExpiredToken.pipe(
      skip(1),
      tap(v=>console.log(this.route.params))
    ).subscribe(v =>{

      if(v){

        const currentRoute = this.router.url;
        if (currentRoute === '/' || currentRoute ==="/register") {
          console.log("login pe he ab")
          return; // Exit early if the current route is "/"
        }
        console.log("token expires refreesh called")

        const refreshToken = this.cookieService.get("refreshToken")
        const helper = new JwtHelperService()
        if(helper.isTokenExpired(refreshToken) || !refreshToken){
          this.router.navigate(['/'], { relativeTo: this.route });
        }else{
          const payload={
            refreshToken,
          }
          this.http.post('http://localhost:8000/api/refresh-token',payload).subscribe((response:any)=> {
            
            this.cookieService.set('authToken',response.token)
            
          });
        }
        }
        else{
          
        }
      }
  
    )
  
    
}

refreshAccesToken(payload: any) : Observable<object>{
  return this.http.post('http://localhost:8000/api/refresh-token',payload)
} 

}

