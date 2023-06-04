import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GamesApiService {

  constructor( private http: HttpClient,) { }

   url = 'https://free-to-play-games-database.p.rapidapi.com/api/games?category=shooter';
   options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '172678345dmsh9c4c481058e4f6ep186597jsn5c94cfe9eaf4',
		'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
	}
};


RetriveImages():Observable<any>{

  return this.http.get(this.url,this.options)
}

}
