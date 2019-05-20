import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpService} from '../../../http-service';
import {Sport} from '../sport';
import {classToClass, plainToClass} from 'class-transformer';
import {ExternalOrg} from '../../external-data/external-org/externalOrg';
import {TerminologyService} from '../../../terminology.service';

@Component({
  selector: 'app-sport-editor',
  templateUrl: './sport-editor.component.html',
  styleUrls: ['./sport-editor.component.scss']
})
export class SportEditorComponent implements OnInit {
  @Input() obj: Sport;
  objCopy: Sport;
  @Output() done = new EventEmitter<boolean>();
  externalOrgs: ExternalOrg[];
  constructor(
    private server: HttpService,
    private terminologyService: TerminologyService,
  ) { }

  ngOnInit() {
    this.terminologyService.setTerminologyContext(this.obj);
    this.objCopy = classToClass(this.obj);
    this.getExternalOrgs();
  }

  onSave() {
    this.obj = classToClass(this.objCopy);
    this.server.create('Sport', this.obj).subscribe(
      _ => {
        this.done.emit(true);
      }
    );
  }

  onUpdate() {
    this.obj = classToClass(this.objCopy);
    this.server.update('Sport', this.obj).subscribe(
      _ => {
        this.done.emit(true);
      }
    );
  }

  onRevert() {
    this.terminologyService.setTerminologyContext(this.obj);
    this.objCopy = classToClass(this.obj);
  }

  onCancel() {
    this.done.emit(true);
  }

  async getExternalOrgs() {
    this.server.fetch('ExternalOrg').subscribe(
      data => {
        this.externalOrgs = plainToClass(ExternalOrg, data);
        // This next bit is obtuse at best.
        // Problem: the  Angular Select for governing body wat not being
        // properly filled with the initial value of the governing body as
        // contained in the sport.  Soooo, Mr. Kludge gave up after an hour
        // or so of fruitless endeavour and just went and looked up the
        // sport's governing body in the set of organizations and stuck it
        // in to the sport. It works, but "ick".
        if (this.obj.governingBody) {
          this.obj.governingBody = this.externalOrgs.find(
            eo => eo.id === this.obj.governingBody.id
          );
        }
      }
    );
  }
}
