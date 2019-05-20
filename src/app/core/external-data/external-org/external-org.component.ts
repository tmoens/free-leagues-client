import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../../http-service';
import {plainToClass} from 'class-transformer';
import {ExternalOrg} from './externalOrg';
import {MatTableDataSource} from '@angular/material';
import {AppStateService} from '../../../app-state.service';

@Component({
  selector: 'app-external-org',
  templateUrl: './external-org.component.html',
  styleUrls: ['./external-org.component.scss']
})
export class ExternalOrgComponent implements OnInit {
  displayedColumns = ['edit', 'name', 'nameShort', 'url', 'id'];
  externalOrgs: ExternalOrg[];
  tableDataSource: MatTableDataSource<ExternalOrg> = new MatTableDataSource([]);
  busyEditing = false;
  selectedObj: ExternalOrg;
  constructor(
    private server: HttpService,
    private appState: AppStateService,
  ) {
  }

  ngOnInit() {
    this.getExternalOrgs();
    this.appState.setActiveTool('External Organization Admin');
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.tableDataSource.filter = filterValue;
  }

  onAdd() {
    this.busyEditing = true;
    this.selectedObj = new ExternalOrg();
  }

  onEdit(obj) {
    this.busyEditing = true;
    this.selectedObj = obj;
  }

  onDoneEditing(done) {
    this.getExternalOrgs();
    this.busyEditing = false;
  }

  getExternalOrgs() {
    this.server.fetch('ExternalOrg').subscribe(
      data => {
        this.externalOrgs = plainToClass(ExternalOrg, data);
        this.tableDataSource.data = this.externalOrgs;
      }
    );
  }
}


