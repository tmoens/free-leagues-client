import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ExternalOrg} from '../externalOrg';
import {HttpService} from '../../../../http-service';

@Component({
  selector: 'app-external-org-editor',
  templateUrl: './external-org-editor.component.html',
  styleUrls: ['./external-org-editor.component.scss']
})
export class ExternalOrgEditorComponent implements OnInit {
  @Input() obj: ExternalOrg;
  @Output() done = new EventEmitter<boolean>();
  constructor(
    private server: HttpService,
  ) { }

  ngOnInit() {
  }

  onSave() {
    this.server.create('ExternalOrg', this.obj).subscribe(
      _ => {
        this.done.emit(true);
      }
    );
  }

  onUpdate() {
    this.server.update('ExternalOrg', this.obj).subscribe(
      _ => {
        this.done.emit(true);
      }
    );
  }

  onCancel() {
    this.done.emit(true);
  }
}
