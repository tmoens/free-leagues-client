import { Component, OnInit } from '@angular/core';
import {plainToClass} from 'class-transformer';
import {HttpService} from '../../http-service';
import {Sport} from './sport';
import {MatTableDataSource} from '@angular/material';
import {AppStateService} from '../../app-state.service';

@Component({
  selector: 'app-sport',
  templateUrl: './sport.component.html',
  styleUrls: ['./sport.component.scss']
})
export class SportComponent implements OnInit {
  displayedColumns = ['edit', 'name', 'description', 'governingBody', 'id'];
  tableDataSource: MatTableDataSource<Sport> = new MatTableDataSource([]);
  sports: Sport[];
  busyEditing = false;
  selectedObj: Sport;
  constructor(
    private server: HttpService,
    private appState: AppStateService,
) { }

  ngOnInit() {
    this.appState.setActiveTool('Sport Admin');
    this.getSports();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.tableDataSource.filter = filterValue;
  }

  onAdd() {
    this.busyEditing = true;
    this.selectedObj = new Sport();
    this.selectedObj.lexicon = {};
  }

  onEdit(obj) {
    this.busyEditing = true;
    this.selectedObj = obj;
  }

  onDoneEditing(done) {
    this.busyEditing = false;
    this.getSports();
  }

  getSports() {
    this.server.fetch('Sport').subscribe(
      data => {
        this.sports = plainToClass(Sport, data);
        this.tableDataSource.data = this.sports;
      });
  }
}
