import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpService} from '../../../http-service';
import {classToClass, classToPlain} from 'class-transformer';
import {Group} from '../group';

@Component({
  selector: 'app-tl-editor',
  templateUrl: './tl-editor.component.html',
  styleUrls: ['./tl-editor.component.scss']
})
export class TlEditorComponent implements OnInit {

  @Input() obj: Group;
  objCopy: Group;
  objDTO: object;
  @Output() done = new EventEmitter<boolean>();

  constructor(
    private server: HttpService,
  ) { }

  ngOnInit() {
    this.objCopy = classToClass(this.obj);
  }

  onSave() {
    this.objDTO = classToPlain(this.objCopy);
    this.server.create('Group', this.objDTO).subscribe(
      _ => {
        this.done.emit(true);
      }
    );
  }

  onUpdate() {
    this.objDTO = classToPlain(this.objCopy);
    this.server.update('Group', this.objDTO).subscribe(
      _ => {
        this.done.emit(true);
      }
    );
  }

  onRevert() {
    this.objCopy = classToClass(this.obj);
  }

  onCancel() {
    this.done.emit(true);
  }
}
