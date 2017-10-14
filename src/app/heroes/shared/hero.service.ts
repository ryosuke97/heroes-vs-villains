import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { Hero } from './hero';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';



@Injectable()
export class HeroService {

  // apiのurl
  private heroesUrl = 'api/heroes';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {}

  getHeroes(): Observable<Hero[]> {
    return this.http.get(this.heroesUrl)
      .map(res => res.json().data as Hero[]);
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get(url)
    .map(res => res.json().data as Hero);
  }

}
