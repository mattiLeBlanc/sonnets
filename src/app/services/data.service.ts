import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Sonnet } from '../models/sonnet';



@Injectable()
export class DataService {
  constructor(private http: HttpClient) {}

  getData(): Observable<Sonnet[]> {
    return this.http
      .get<Sonnet[]>(`/assets/db.json`)
      .pipe(catchError((error: any) => throwError(error)));
  }
}
