import { Observable } from 'rxjs/Rx';
import { Activity } from '../../interfaces/Activity';
import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

// A fake API on the internets.
const ACTIVITIES_URL = 'http://www.mocky.io/v2/58ae7126100000a00ec94339';

@Injectable()
export class ActivitiesService {
  constructor(private http: Http) { }

  getAll() {
    let result = this.http.get(ACTIVITIES_URL)
      .map(resp => resp.json())
      .map(activities => activities.map(
        activity => ({
          id: activity.id,
          name: activity.name,
          type: activity.type
        })));
    console.log({ msg: 'getall' }, result);
    return result;
  }
}

/* response from URL
[
      {
        id: 0,
        name: 'Fahrrad fahren',
        type: ActivityType.main
      }, {
        id: 1,
        name: 'Arbeiten',
        type: ActivityType.main
      }, {
        id: 2,
        name: 'Lernen',
        type: ActivityType.main
      }, {
        id: 3,
        name: 'Schlafen',
        type: ActivityType.main
      }, {
        id: 4,
        name: 'Essen',
        type: ActivityType.main
      }, {
        id: 5,
        name: 'Kuchen backen',
        type: ActivityType.main
      }, {
        id: 6,
        name: 'Rauchen',
        type: ActivityType.main
      }, {
        id: 7,
        name: 'Sonstiges',
        type: ActivityType.etc
      }]
*/
