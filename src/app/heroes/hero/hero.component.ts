import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';


import { Hero } from './../shared/hero';
import { HeroService } from './../shared/hero.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  @Input() hero: Hero;

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      const id = +params['id'];
      this.heroService.getHero(id)
        .subscribe(hero => this.hero = hero);
    });
  }

  goBack(): void {
    window.history.back();
  }

  save(): void {
    this.heroService.update(this.hero).subscribe(() => this.goBack());
  }

  delete(): void {
    this.heroService.delete(this.hero.id).subscribe(() => this.goBack());
  }

}
