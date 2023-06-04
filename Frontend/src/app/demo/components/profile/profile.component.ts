import { AfterViewInit, Component,OnDestroy } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { GamesApiService } from '../../service/games-api.service';
import { Subscription, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../service/Api.service';
export interface Fruit {
  name: string;
}


export interface Profile{
  _id:string,
  username:string,
  email:string,
  bio:string,
  avatar:string,
  games:string[],
  reactionTime:string
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements AfterViewInit, OnDestroy {

  trigger=false;
 
  gamesData:{title:string; thumbnail:string; id:string}[]=[];
 
  selectedItem: any;
 
    ///////////////////////
 
    started: boolean = false;
    finished: boolean = false;
    startTime!: number;
    endTime!: number;
    reactionTime!: number;
    color: string = '#0079FF';
   
    //////////////////////////
   

  subs = new Subscription()
  constructor(
    private gamesApiService:GamesApiService,
    public activatedRoute: ActivatedRoute,
    private router: Router,
    private ApiService:ApiService,
    ){
 
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }
  get onMobile(): boolean {
    return window.innerWidth <= 700;
  }
 
  get onDesktop(): boolean {
    return window.innerWidth > 1280;
  }
 
 get  onTab(): boolean{
    return window.innerWidth < 1280 && window.innerWidth  > 700;
  }
 
  set document (doc:Profile){
      
        if(doc == null){
          this.router.navigate(['/'])
        }
        else{
    
          this.formGroup.patchValue({
            _id:doc?._id,
            avatar:doc?.avatar,
            bio:doc?.bio,
            games:doc.games as any,
            username:doc?.username,
            email:doc?.email,
          })
    
        }
    
        this.formGroup.enable()
      }

  formGroup = new FormGroup({
    _id: new FormControl<string | null>(null),
    username: new FormControl<string|null>(null, [Validators.required]),
    bio: new FormControl<string| null>(null,[Validators.required]),
    games: new FormArray ([]),
    email: new FormControl(),
    avatar: new FormControl<string| null>(null,[]),
    reactionTime: new FormControl()
  })
 
  ngAfterViewInit(): void {
    
      const subs2 = this.activatedRoute.paramMap.pipe(
      map(params => params.get('id')),
      distinctUntilChanged(),
      filter(id => !!id ),
      tap(id=> this.formGroup.disable()),
      switchMap(id =>this.ApiService.getCurrentUser(id as string))
    ).subscribe(v =>{
      console.log()
      this.document = v as Profile})
    const subs1= this.gamesApiService.RetriveImages().subscribe(v => {this.gamesData = v.slice(0, 20);
      console.log(this.gamesData)
    })
 
    this.subs.add(subs1)
    this.subs.add(subs2)
 
  }
 
  getSelectedItem(item: any) {
    this.selectedItem = item;
    const selectedItem = item.thumbnail;
    console.log("Selected item: ", item?.thumbnail);
    this.formGroup.patchValue({
        avatar: selectedItem
    });
}
 
 
  fruits: Fruit[] = [];
 
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
 
    // Add our fruit
    if (value) {
      this.fruits.push({name: value});
    }
 
    // Clear the input value
    event.chipInput!.clear();
  }
 
  remove(fruit: Fruit): void {
    const index = this.fruits.indexOf(fruit);
 
    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }
 
  onSave(){
    this.trigger=true;
    const formGroupValue = this.formGroup.value;
      
    const paylaod:Profile ={
      _id:formGroupValue._id?formGroupValue._id:"",
      avatar:formGroupValue.avatar ? formGroupValue.avatar:"",
      email:formGroupValue.email,
      bio:formGroupValue.bio? formGroupValue.bio: "",
      games:formGroupValue.games? formGroupValue.games:[],
      username:formGroupValue.username ? formGroupValue.username: "",
      reactionTime:formGroupValue.reactionTime
    }
    console.log(paylaod);
    const subs1 = this.ApiService.updateUserById(paylaod).subscribe(v => {console.log(v); this.trigger=false})

    this.subs.add(subs1)
   
  }
 
  //////////////////////////
  /////// reaction /////////
 
  startReactionTest() {
    this.started = true;
    setTimeout(() => {
      this.color = 'red';
      this.startTime = Date.now();
    }, Math.random() * 3500 + 1000);
  }
 
  finishReactionTest() {
    if (this.color === 'red') {
      this.finished = true;
      this.endTime = Date.now();
      this.reactionTime = this.endTime - this.startTime;
    }
    this.formGroup.patchValue({
      reactionTime:this.reactionTime
    })
  }
 
  resetReactionTest() {
    this.started = false;
    this.finished = false;
    this.startTime = 0;
    this.endTime = 0;
    this.reactionTime = 0;
    this.color = '#0079FF';
  }
 
}

// import { AfterViewInit, Component,OnDestroy } from '@angular/core';
// import { MatChipInputEvent } from '@angular/material/chips';
// import { GamesApiService } from '../../service/games-api.service';
// import { Subscription, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs';
// import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { ApiService } from '../../service/Api.service';

// export interface Fruit {
//   name: string;
// }

// export interface Profile{
//   id:string,
//   username:string,
//   email:string,
//   bio:string,
//   avatar:string,
//   games:string[]
// }
// @Component({
//   selector: 'app-profile',
//   templateUrl: './profile.component.html',
//   styleUrls: ['./profile.component.scss']
// })
// export class ProfileComponent implements AfterViewInit, OnDestroy {

//   gamesData:{title:string; thumbnail:string; id:string}[]=[];

//   subs = new Subscription()
//   constructor(
//     private gamesApiService:GamesApiService,
//     public activatedRoute: ActivatedRoute,
//     private router: Router,
//     private ApiService:ApiService,
//     ){

//   }
  

//   ngOnDestroy(): void {
//     this.subs.unsubscribe()
//   }
//   get onMobile(): boolean {
//     return window.innerWidth <= 700;
//   }

//   get onDesktop(): boolean {
//     return window.innerWidth > 1280;
//   }

//  get  onTab(): boolean{
//     return window.innerWidth < 1280 && window.innerWidth  > 700;
//   }

//   set document (doc:Profile){
      
//     if(doc == null){
//       this.router.navigate(['/'])
//     }
//     else{

//       this.formGroup.setValue({
//         avatar:doc?.avatar,
//         bio:doc?.bio,
//         games:doc.games as any,
//         username:doc.username
//       })

//     }

//     this.formGroup.enable()
//   }

//   formGroup = new FormGroup({
//     username: new FormControl<string|null>(null, [Validators.required]),
//     bio: new FormControl<string| null>(null,[Validators.required]),
//     games: new FormArray ([]),
//     avatar: new FormControl<string| null>(null,[])
//   })

//   ngAfterViewInit(): void {

//     const subs1= this.gamesApiService.RetriveImages().subscribe(v => {this.gamesData = v.slice(0, 20);
//       console.log(this.gamesData)
//     })
//     const subs2 = this.activatedRoute.paramMap.pipe(
//       map(params => params.get('id')),
//       distinctUntilChanged(),
//       filter(id => !!id ),
//       tap(id=> this.formGroup.disable()),
//       switchMap(id =>this.ApiService.getCurrentUser(id as string))
//     ).subscribe(v =>{
//       console.log()
//       this.document = v as Profile})

//     this.subs.add(subs1)
//     this.subs.add(subs2)

//   }



//   fruits: Fruit[] = [];

//   add(event: MatChipInputEvent): void {
//     const value = (event.value || '').trim();

//     // Add our fruit
//     if (value) {
//       this.fruits.push({name: value});
//     }

//     // Clear the input value
//     event.chipInput!.clear();
//   }

//   remove(fruit: Fruit): void {
//     const index = this.fruits.indexOf(fruit);

//     if (index >= 0) {
//       this.fruits.splice(index, 1);
//     }
//   }


// }
