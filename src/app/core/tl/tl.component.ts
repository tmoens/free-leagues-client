import { Component, OnInit } from '@angular/core';
import {MatTreeNestedDataSource} from '@angular/material';
import {NestedTreeControl} from '@angular/cdk/tree';
import {HttpService} from '../../http-service';
import {AppStateService} from '../../app-state.service';
import {plainToClass} from 'class-transformer';
import {Group} from './group';

@Component({
  selector: 'app-tl',
  templateUrl: './tl.component.html',
  styleUrls: ['./tl.component.scss']
})
export class TLComponent implements OnInit {

  treeDataSource: MatTreeNestedDataSource<Group>;
  treeControl: NestedTreeControl<Group>;
  groups: Group[];
  busyEditing = false;
  selectedObj: Group;

  constructor(
    private server: HttpService,
    private appState: AppStateService,
  ) {
    this.appState.setActiveTool('Tournament and League Admin');
    this.treeDataSource = new MatTreeNestedDataSource();
    this.treeControl = new NestedTreeControl<Group>(this._getChildren);
  }

  // Implementation of a function required by the tree control
  private _getChildren = (node: Group) => node.children;

  ngOnInit() {
    this.fetchGroups();
  }

  fetchGroups() {
    this.server.fetch('Group').subscribe(
      data => {
        this.groups = plainToClass(Group, data);
        this.treeDataSource.data = this.groups;
      }
    );
  }

  hasNestedChild = (index: number, node: Group) => node.hasChildren();

  onAdd(node: Group) {
    this.busyEditing = true;
    this.selectedObj = new Group();
    if (node) {
      this.selectedObj.parent = node;
    }
  }

  onEdit(node: Group) {
    this.busyEditing = true;
    this.selectedObj = node;
  }

  onDoneEditing(done) {
    this.busyEditing = false;
    this.selectedObj = null;
  }

}
