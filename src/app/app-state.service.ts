import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  public activeTool$: BehaviorSubject<string>;

  constructor() {
    this.activeTool$ = new BehaviorSubject('');
  }

  setActiveTool(t: string) {
    this.activeTool$.next(t);
  }
}
