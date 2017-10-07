import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Hero } from './hero';
import 'rxjs/add/operator/toPromise'; // あとで消す
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';



@Injectable()
export class HeroService {

  // apiのurl
  private heroesUrl = 'api/heroes';

  constructor(private http: Http) {}

  getHeroes(): Observable<Hero[]> {
    // return this.http.get(this.heroesUrl).toPromise().then(response => response.json().data as Hero[]).catch(this.handleError);
    return this.http.get(this.heroesUrl)
      .map(res => res.json().data as Hero[]);
  }

  // getHeroesSlowly(): Promise<Hero[]> {
  //   return new Promise<Hero[]>(resolve => setTimeout(resolve, 2000)) // delay 2 seconds
  //     .then(() => this.getHeroes());
  // }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    // return this.http.get(url).toPromise().then(response => response.json().data as Hero).catch(this.handleError);
    return this.http.get(url)
    .map(res => res.json().data as Hero);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

}
