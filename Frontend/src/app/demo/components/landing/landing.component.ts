import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { ApiService } from '../../service/Api.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
})
export class LandingComponent {

    showContent: boolean = false;
    visible: boolean = false;
    subs = new Subscription()
    constructor(public layoutService: LayoutService, public router: Router,private ApiService: ApiService) {}

    registeredcount="";

    ngAfterViewInit(): void {
        setTimeout(() => {
          this.showContent = true;
        }, 1500);
        
        // const subs1 = this.ApiService.GetListofUser("").subscribe(v=>console.log(v))

        // this.subs.add(subs1);
      }

    ////////////////////
    /////extra./////////
    ////////////////////

    showDialog() {
      this.visible = true;
    }
    onMobile(): boolean {
        return window.innerWidth <= 700;
    }


}

