import { AppStateService } from './AppState.provider';
import User from '../interfaces/User';
import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

const USERS_URL = 'http://localhost:8080/api/users/';

@Injectable()
export class UserService {

  constructor(private http: Http, private appStateService: AppStateService) { }

  create(user: User, action: (result: User) => void) {
    let observable = this.http.post(USERS_URL, user)
      .map(this.extractData)
      .catch(this.handleError);

    observable.subscribe(
      result => {
        this.appStateService.state.user = result;
      },
      error => this.handleError);
  }

  update(user: User) {
    let observable = this.http.put(`${USERS_URL}${user.id}`, user)
      .map(this.extractData)
      .catch(this.handleError);

    observable.subscribe(
      result => {
        this.appStateService.state.user = result;
      },
      error => this.handleError);
  }

  getById(id: string) {
    let observable = this.http.get(`${USERS_URL}/${id}`)
      .map(this.extractData)
      .catch(this.handleError);

    observable.subscribe(
      user => {
        this.appStateService.state.user = Object.assign({}, user);
      },
      error => this.handleError);
    return observable;
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error('error', errMsg);
    return Observable.throw(errMsg);
  }
}
