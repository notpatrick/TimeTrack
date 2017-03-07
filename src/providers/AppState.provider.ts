import { Injectable } from '@angular/core';
import { AppState } from '../interfaces/AppState';

@Injectable()
export class AppStateService {

  constructor() { }
  public state: AppState = {} as AppState;
}
