import { Activity } from '../interfaces/Activity';
import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

const ACTIVITIES_URL = 'http://localhost:8080/api/activities/';

@Injectable()
export class WebRequestService {

  constructor(private http: Http) { }

  getAll(action: (result: Activity[]) => void) {
    let observable = this.http.get(ACTIVITIES_URL)
      .map(this.extractData)
      .catch(this.handleError);

    observable.subscribe(
      activities => action(activities),
      error => this.handleError);
    return observable;
  }

  create(activity: Activity, action: (result: Activity) => void) {
    let observable = this.http.post(ACTIVITIES_URL, activity)
      .map(this.extractData)
      .catch(this.handleError);

    observable.subscribe(
      activity => action(activity),
      error => this.handleError);
  }

  delete(activity: Activity, action: () => void) {
    let observable = this.http.delete(`${ACTIVITIES_URL}/${activity.id}`)
      .map(this.extractData)
      .catch(this.handleError);

    observable.subscribe(
      response => action,
      error => this.handleError);
  }


  getById(id: string, action: (result: Activity) => void) {
    let observable = this.http.get('${ACTIVITIES_URL}/${id}')
      .map(this.extractData)
      .catch(this.handleError);

    observable.subscribe(
      activity => action(activity),
      error => this.handleError);
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
