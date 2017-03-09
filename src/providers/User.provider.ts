import { AppStateService } from './AppState.provider';
import User from '../interfaces/User';
import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import config from '../config';

const usersRoute = config.usersRoute;

@Injectable()
export class UserService {

  constructor(private http: Http, private appStateService: AppStateService) { }

  create(user: User) {
    let observable = this.http.post(usersRoute, user)
      .map(this.extractData)
      .catch(this.handleError);

    observable.subscribe(
      user => {
        this.appStateService.updateState({ user: user });
      },
      error => this.handleError);
  }

  update(user: User) {
    let observable = this.http.put(`${usersRoute}${user.id}`, user)
      .map(this.extractData)
      .catch(this.handleError);

    observable.subscribe(
      user => {
        this.appStateService.updateState({ user: user });
      },
      error => this.handleError);
  }

  getById(id: string) {
    let observable = this.http.get(`${usersRoute}/${id}`)
      .map(this.extractData)
      .catch(this.handleError);

    observable.subscribe(
      user => {
        this.appStateService.updateState({ user: user });
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
