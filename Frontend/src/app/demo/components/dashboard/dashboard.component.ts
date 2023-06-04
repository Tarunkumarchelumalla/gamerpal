import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../../service/Api.service';
import {  moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Subscription, debounce, debounceTime, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { TokenService } from '../../service/tokenService';


export interface Cards{
    _id:string,
    username:string,
    email:string,
    bio:string,
    avatar:string,
    games:string[]
}

@Component({
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.scss'],
})



export class DashboardComponent implements AfterViewInit,OnDestroy,OnInit {

    formGroup:FormGroup = new FormGroup({});
    cards:Cards[] = [];
    subs = new Subscription()
    constructor( 
        private ApiService:ApiService,
        private cookieService:CookieService,
        ){
        
    }

    trigger=false;
  ngOnInit(): void {
 
    this.formGroup = new FormGroup({
      swipeLeftCards : new FormArray([]),
      swipeRightCards : new FormArray([]),
    })

  }
  get userid():string{
    return this.cookieService.get("userid")
  }

   uniqueIdsswipedRight = new Set()
   uniqueIdsswipedLeft = new Set()
  ngAfterViewInit(): void {


      //////////////
      //subcriptions
      /////////////

    
      const subs1 = this.ApiService.GetListofUser(this.userid).subscribe(v => this.cards = v as Cards[])

      const subs2 = this.formGroup.valueChanges.pipe(debounceTime(500)).subscribe(v =>{


        v["swipeRightCards"].map((v:Cards)=>{
          const payload={
            userId:this.userid,
            swipeduser:v._id
          }
          if (!this.uniqueIdsswipedRight.has(v._id)){
          this.ApiService.swipeRight(payload)
          }
            this.uniqueIdsswipedRight.add(v._id)
        })
        v["swipeLeftCards"].map((v:Cards)=>{
          const payload={
            userId:this.userid,
            swipeduser:v._id
          }
          if (!this.uniqueIdsswipedLeft.has(v._id)){
          this.ApiService.swipeLeftt(payload)
          }
            this.uniqueIdsswipedLeft.add(v._id)
        })

        this.trigger=false;
      })
      
      this.subs.add(subs1);
      this.subs.add(subs2);
    }

  ngOnDestroy(): void {
      this.subs.unsubscribe()
  }
  
  get swipedLeftArray () :FormArray{
    return this.formGroup.get('swipeLeftCards') as FormArray 
  }
  get swipedRightArray () :FormArray{
    return this.formGroup.get('swipeRightCards') as FormArray 
  }

  
    drop(event:any) {
        console.log(event)
        this.trigger=true
  
      if (event.previousContainer === event.container) {
       
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } else {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex,
        );
      }

      this.formGroup.updateValueAndValidity();
      console.log("rightCardsForm",this.swipedRightArray.value)
      console.log("LeftCardsForm",this.swipedLeftArray.value)

    }


  }

