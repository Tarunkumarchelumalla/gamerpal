import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
interface tokenfetch{
  message:string,
  token: string
}

export interface Profile{
  _id:string,
  username:string,
  email:string,
  bio:string,
  avatar:string,
  games:string[]
}
// ...
@Injectable()

export class ApiService {
  token: string | undefined;

constructor(
  private http: HttpClient,
  private cookieService:CookieService,
  private route: ActivatedRoute,
  private router: Router,
  ) {
    

}

Login(payload:any): Observable<object>{
  return this.http.post('http://localhost:8000/api/user/login',payload)
}

Register(payload: any){

  this.http.post('http://localhost:8000/api/user/register',payload).subscribe((response:any)=> {
    
    return console.log(response,this.token);
  });

}
Logout(){
  this.cookieService.deleteAll();
  this.router.navigate(['/'], { relativeTo: this.route });
}

GetListofUser(id:string):Observable<object> {

 return this.http.get(`http://localhost:8000/api/listofusers/${id}`)
 
 
}
getCurrentUser(id:string): Observable<any>{

  return this.http.get(`http://localhost:8000/api/user/finduser/${id}`)
}

getcurruser():Observable<any>{
  const id = this.cookieService.get('userid')
  return this.http.get(`http://localhost:8000/api/user/finduser/${id}`)
}

swipeRight(payload:any){

  this.http.post('http://localhost:8000/api/swipeRight',payload).subscribe(v => console.log(v,"firedRight"))
}

swipeLeftt(payload:any){

  this.http.post('http://localhost:8000/api/swipeLeft',payload).subscribe(v => console.log(v,"firedLeft"))
}

messagesRetrive(id:string):Observable<any>{

  return this.http.get(`http://localhost:8000/api/messages/${id}`)
}


updateUserById(payload:Profile): Observable<any>{

  return this.http.put(`http://localhost:8000/api/user/userupdate/${payload._id}`, payload);
}

}