import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import * as _ from 'lodash';

@Injectable()
export class WebService<T> {
  private observable: Observable<T>;

  constructor(
    private http: HttpClient
  ) { }

  get(options: any): Observable<T> {

    // start the loader
    this.observable = this.http.get<any>(options.url, {
      params: options.params
    })
    .map(response => {
      this.observable = null;
      return response;
    })
    .catch(err => {
      if (err) {
        return Observable.throw(err);
      }
    })
    .finally(() => {
      // End the loader
    });

    return this.observable;
  }

  post(options: any): Observable<T> {
    this.observable = this.http.post<any>(options.url, options.params)
    .map(response => {
      return response;
    })
    .catch(err => {
      if (err) {
        return Observable.throw(err);
      }
    })
    .finally(() => {
      // End the loader
    });
    return this.observable;
  }

  put(options: any): Observable<T> {
    this.observable = this.http.put<any>(options.url, options.params)
    .map(response => {
      return response;
    })
    .catch(err => {
      if (err) {
        return Observable.throw(err);
      }
    })
    .finally(() => {
      // End the loader
    });
    return this.observable;
  }

  delete(options: any): Observable<T> {
    this.observable = this.http.delete<any>(options.url)
    .map(response => {
      return response;
    })
    .catch(err => {
      if (err) {
        return Observable.throw(err);
      }
    })
    .finally(() => {
      // End the loader
    });
    return this.observable;
  }
}
