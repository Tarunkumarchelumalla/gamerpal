import { AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { ChatsService } from '../demo/service/chats.service';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

interface Data {
    conservations:conversation[],
    memberProfiles:memberProfiles[]
}

interface conversation {
    _id:string,
    members:string[],
}
interface memberProfiles{
    _id:string,
    username:string,
    email:string,
    bio:string,
    avatar:string,
    games:string[]
}
@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements AfterViewInit,OnDestroy {
    model: any[] = [];
    converstions: any[] = [{
        items:[]
    }];
     membersData :Data | undefined
    subs = new Subscription()

    constructor(
        public layoutService: LayoutService,
        private chatsService: ChatsService,
        private cookieService:CookieService
    ) {
        
    }
    ngOnDestroy(): void {
      this.subs.unsubscribe();
    }
    get userid():string{
        return this.cookieService.get("userid")
      }
    
    ngAfterViewInit(): void {
        
        const subs1 = this.chatsService.getConvs(this.userid).subscribe((v:any)=>{
            this.membersData = v
            
            const items:any[]=[];
            this.membersData?.conservations.forEach((v: { members: any[], _id: string })=> {
               items.push({
                    icon: "pi pi-fw pi-user",
                    label:this.membersData?.memberProfiles.find(y=>(v.members[0] === this.userid? v.members[1]: v.members[0]) === y._id)?.username,
                    routerLink:[`conv/${v._id}`]
                })
            })
            
             this.converstions[0]['items']=items;
        })
        
        
        this.model = [
            {
                items: [
                    {
                        label: 'Dashboard',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/dashboard'],
                    },
                    
                ],
            },
        ];

        this.subs.add(subs1);
    }
    





}
