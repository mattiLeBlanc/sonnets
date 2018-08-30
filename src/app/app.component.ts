import { Component, OnInit } from '@angular/core';
import { DataService } from './services';
import { FormControl } from '@angular/forms';
import { startWith, debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';
import { Sonnet } from './models/sonnet';

@Component( {
  selector: 'app-root',
  template: `
    <div class="app">
      <h1 class="app__title">Jolly Sonnets</h1>
      <div class="app__search">
        <input placeholder="Search for a Sonnet" name="searchValue" [formControl]="searchValue" >
      </div>
      <div class="app__list" *ngIf="sonnets$ | async as sonnets">
        <app-list-item *ngFor="let sonnet of sonnets" [sonnet]="sonnet"></app-list-item>
      </div>
    </div>
  `,
  styleUrls: [ './app.component.scss' ]
} )
export class AppComponent implements OnInit {
  searchValue: FormControl = new FormControl();
  sonnets$: Observable<Sonnet[]>;

  constructor(
    private dataService: DataService
  ) {
  }

  ngOnInit() {


    // this.searchValue.valueChanges.pipe(
    //   startWith( '' ),
    //   debounceTime( 200 ),
    //   distinctUntilChanged(),
    // ).subscribe( val => console.log( val ) );

    this.sonnets$ = combineLatest(
      this.dataService.getData(),
      this.searchValue.valueChanges.pipe(
        startWith( '' ),
        debounceTime( 200 ),
        distinctUntilChanged(),
      )
    ).pipe(
     map( ( [ sonnets, searchValue ] ) => {
      const regEx = new RegExp( searchValue, 'i' );
      return sonnets.filter( sonnet => sonnet.lines.join( ' ' ).search( regEx ) !== -1 );
     } )
    );
  }
}
