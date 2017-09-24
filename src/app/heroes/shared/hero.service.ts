import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';
import { InMemoryDataService } from '../../core/in-memory-data.service';

@Injectable()
export class HeroService {

  // apiのURL
  private heroesUrl = 'app/core/heroes';

  constructor(private http: Http) {  }

  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl).toPromise().then(response => response.json().data as Hero[]).catch(this.handleError);
  }

  getHeroesSlowly(): Promise<Hero[]> {
    return new Promise<Hero[]>(resolve => setTimeout(resolve, 2000)) // delay 2 seconds
      .then(() => this.getHeroes());
  }

  getHero(id: number): Promise<Hero> {
    return this.getHeroes()
      .then(heroes => heroes.find(hero => hero.id === id));
  }

  private handleError(error: any): Promise<any> {
    console.error('エラー', error);
    return Promise.reject(error.message || error);
  }

}
