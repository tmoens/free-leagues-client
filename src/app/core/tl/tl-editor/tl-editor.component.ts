import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpService} from '../../../http-service';
import {classToClass, classToPlain, plainToClass} from 'class-transformer';
import {Group} from '../group';
import {Sport} from '../../sport/sport';
import * as moment from 'moment';
import {FormControl} from '@angular/forms';
import {MAT_DATE_FORMATS} from '@angular/material';

@Component({
  selector: 'app-tl-editor',
  templateUrl: './tl-editor.component.html',
  styleUrls: ['./tl-editor.component.scss'],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: {parse:
          {
            dateInput: 'YYYY-MM-DD',
          },
        display: {
          dateInput: 'YYYY-MM-DD',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'YYYY-MM-DD',
          monthYearA11yLabel: 'MMMM YYYY',
        }
      }
    },
  ],
})
export class TlEditorComponent implements OnInit {
  allSports: Sport[];
  startDateFC: FormControl;
  endDateFC: FormControl;


  @Input() obj: Group;
  objCopy: Group;
  objDTO: object;
  @Output() done = new EventEmitter<boolean>();

  selectedSport: Sport = null;

  constructor(
    private server: HttpService,
  ) {
    this.startDateFC = new FormControl(moment());
    this.endDateFC = new FormControl(moment());
  }

  async ngOnInit() {
    this.objCopy = classToClass(this.obj);
    this.getSports();
  }

  onSave() {
    this.objDTO = classToPlain(this.objCopy);
    this.server.create('Group', this.objDTO).subscribe(
      _ => {
        this.done.emit(true);
      }
    );
  }


  getSports() {
    this.server.fetch('Sport').subscribe(
      data => {
        this.allSports = plainToClass(Sport, data);
        // this next bit just ensures that the sport selection menu
        // gets set to the correct sport.
        const effectiveSport = this.objCopy.getEffectiveSport();
        for (const i in this.allSports) {
          if (effectiveSport && effectiveSport.id === this.allSports[i].id) {
            this.selectedSport = this.allSports[i];
          }
        }
      });
  }

  onStartDateChange() {

  }

  onEndDateChange() {

  }

  onSportChange(sport: Sport) {
  }

  onUpdate() {
    this.objDTO = classToPlain(this.objCopy);
    this.server.update('Group', this.objDTO).subscribe(
      _ => {
        this.done.emit(true);
      }
    );
  }

  async onRevert() {
    this.objCopy = this.objCopy = classToClass(this.obj);
  }

  onCancel() {
    this.done.emit(true);
  }
}
