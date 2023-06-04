import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopauthService {

  openAuthComp =  new BehaviorSubject<boolean>(false);

  constructor() { }

}
