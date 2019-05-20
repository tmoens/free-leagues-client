import { Component } from '@angular/core';
import {AppStateService} from './app-state.service';
import {TerminologyService} from './terminology.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Free Leagues';
  constructor(
    public appState: AppStateService,
    public terminologyService: TerminologyService,
  ) {}
}
