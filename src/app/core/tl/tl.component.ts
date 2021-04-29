import { Component, OnInit } from '@angular/core';
import {MatTreeNestedDataSource} from '@angular/material';
import {NestedTreeControl} from '@angular/cdk/tree';
import {HttpService} from '../../http-service';
import {AppStateService} from '../../app-state.service';
import {plainToClass, plainToClassFromExist} from 'class-transformer';
import {Group} from './group';
import {Tree} from '../../utils/Tree';

@Component({
  selector: 'app-tl',
  templateUrl: './tl.component.html',
  styleUrls: ['./tl.component.scss']
})
export class TLComponent implements OnInit {

  treeDataSource: MatTreeNestedDataSource<Tree<Group>>;
  treeControl: NestedTreeControl<Tree<Group>>;
  groups: Tree<Group>[];
  busyEditing = false;
  selectedObj: Group;

  constructor(
    private server: HttpService,
    private appState: AppStateService,
  ) {
    this.appState.setActiveTool('Tournament and League Admin');
    this.treeDataSource = new MatTreeNestedDataSource();
    // this.treeControl = new NestedTreeControl<Group>(this._getChildren);
    this.treeControl = new NestedTreeControl<Tree<Group>>(this._getChildren);
  }

  // Implementation of a function required by the tree control
  private _getChildren = (node: Tree<Group>) => node.children;

  ngOnInit() {
    this.fetchGroups();
  }

  fetchGroups() {
    this.server.fetch('Group').subscribe(
      data => {
        this.groups = plainToClassFromExist(new Tree<Group>(Group), data);
        this.treeDataSource.data = this.groups;
      }
    );
  }

  hasNestedChild = (index: number, node: Tree<Group>) => node.hasChildren();

  onAdd(node: Group) {
    // this.busyEditing = true;
    // this.selectedObj = new Group();
    // if (node) {
    //   this.selectedObj.parent = node;
    // }
  }

  onEdit(node: Group) {
    this.busyEditing = true;
      this.server.fetchInstance('Group', node.id).subscribe(
        data => {
          // this.selectedObj = plainToClass(Group, data);
          this.selectedObj = plainToClassFromExist(Group, data);
        });
  }

  onDoneEditing(done) {
    this.busyEditing = false;
    this.selectedObj = null;
  }

}
