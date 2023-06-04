import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from './service/app.layout.service';
import { ApiService } from '../demo/service/Api.service';
import { Subscription, filter, take } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent implements AfterViewInit{
    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    fkDocs = new Map<string,any>

    subs = new Subscription()
    constructor(
        public layoutService: LayoutService,
        private ApiService:ApiService,
        private cookieService:CookieService,
        private router: Router
        ) {}
    get userId (): string{
       return this.cookieService.get('userid')
    }
    get userDoc ():any {

        return this.fkDocs.get(this.userId)
    }    
    ngAfterViewInit(): void {
        const subs1 = this.ApiService.getcurruser().pipe(filter(v =>!!v), take(1),).subscribe(v => this.fkDocs.set(v._id,v)) 
        this.subs.add(subs1)

    }

    Logout(){
        this.ApiService.Logout();
    }

    /////////////
    //navigations
    /////////////

    navigateToProfile(){
        this.router.navigate(['/profile',this.userId]);
    }

}
