import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpService} from '../../../http-service';
import {Org} from '../org';
import {classToClass, classToPlain} from 'class-transformer';

@Component({
  selector: 'app-org-editor',
  templateUrl: './org-editor.component.html',
  styleUrls: ['./org-editor.component.scss']
})
export class OrgEditorComponent implements OnInit {
  @Input() obj: Org;
  objCopy: Org;
  objDTO: object;
  @Output() done = new EventEmitter<boolean>();

  constructor(
    private server: HttpService,
  ) { }

  ngOnInit() {
    this.objCopy = classToClass(this.obj);
  }

  onSave() {
    this.obj = classToClass(this.objCopy);
    this.objDTO = classToPlain(this.objCopy);
    if (this.objCopy.parent) {
      this.obj.parent.children.push(this.obj);
      this.objDTO['parentId'] = this.objCopy.parent.id;
    }
    this.server.create('Org', this.objDTO).subscribe(
      _ => {
        this.done.emit(true);
      }
    );
  }

  onUpdate() {
    this.obj = classToClass(this.objCopy);
    this.objDTO = classToPlain(this.objCopy);
    this.server.update('Org', this.objDTO).subscribe(
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
