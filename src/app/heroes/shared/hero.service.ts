import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';

@Injectable()
export class HeroService {

  // apiのURL
  private heroesUrl = 'api/heroes';

  constructor(private http: Http) { }

  private headers = new Headers({'Content-Type': 'application/json'});

  // ヒーロー情報を更新する
  update(hero: Hero): Promise<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http
    .put(url, JSON.stringify(hero), {headers: this.headers})
    .toPromise()
    .then(() => hero) // 成功したらヒーローを返す
    .catch(this.handleError); // 失敗したらエラー処理を返す
  }

  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl)
    .toPromise()
    .then(response => response.json().data as Hero[]) // 成功したらHero配列としてもつ
    .catch(this.handleError); // 失敗したらエラー処理を返す
  }

  // 通信失敗時はエラーのログを出す
  private handleError(error: any): Promise<any> {
  console.error('エラー！！', error);
  return Promise.reject(error.message || error);
  }

  getHero(id: number): Promise<Hero> {
  const url = `${this.heroesUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Hero) // 成功したらHero情報をもつ
      .catch(this.handleError); // 失敗したらエラー処理を返す
  }

  
  create(name: string): Promise<Hero> {
    return this.http
      .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

}
