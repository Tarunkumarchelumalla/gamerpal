import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenService } from './tokenService';
import { Subscription } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  isTokenExpired: boolean | undefined;

  subs = new Subscription()

  constructor(
    private cookieService: CookieService,
    private tokenService:TokenService
    ) { }


  intercept(req: HttpRequest<any>, next: HttpHandler) {
    
    const Token =this.cookieService.get('authToken')
    const refreshToken = this.cookieService.get('refreshToken')
    const jwthelper = new JwtHelperService()
    if(req.url.endsWith("category=shooter")){
      return next.handle(req)
    }
      if(req.url.endsWith("refresh-token")){
       
        
        let tokenizedReq = req.clone({
          setHeaders:{
            Authorization: `Bearer ${refreshToken}`}
          })
        
        return next.handle(tokenizedReq)
      }
      else if(!jwthelper.isTokenExpired(Token)){
      let tokenizedReq = req.clone({
        setHeaders:{
          Authorization: `Bearer ${Token}`
        }
      })
      return next.handle(tokenizedReq)
    }
    // else{
    //   console.log("helo")
    //     this.tokenService.refreshAccesToken(refreshToken).subscribe((res:any )=>{

    //       this.cookieService.set('authToken',res.token)

    //       let tokenizedReq = req.clone({
    //         setHeaders:{
    //           Authorization: `Bearer ${res.token}`}
    //         })
          
    //       return next.handle(tokenizedReq)
    //    })
    //   }
      return next.handle(req)
      
  }
}
