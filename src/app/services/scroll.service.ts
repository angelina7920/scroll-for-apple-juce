import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ScrollService {

  constructor(private http: HttpClient) { }

  private url = 'https://jsonplaceholder.typicode.com/posts';

  public page$ = new BehaviorSubject<number>(1);

  public getPostsByPage() {
    const url = `${this.url}?_start=0&_limit=${this.page$.value * 5}`
    return this.http.get(url);
  }

}
