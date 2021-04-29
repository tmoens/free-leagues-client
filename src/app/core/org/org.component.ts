import { Component, OnInit } from '@angular/core';
import {MatTreeNestedDataSource} from '@angular/material';
import {NestedTreeControl} from '@angular/cdk/tree';
import {plainToClass} from 'class-transformer';
import {Org} from './org';
import {HttpService} from '../../http-service';
import {AppStateService} from '../../app-state.service';

@Component({
  selector: 'app-org',
  templateUrl: './org.component.html',
  styleUrls: ['./org.component.scss']
})
export class OrgComponent implements OnInit {
  treeDataSource: MatTreeNestedDataSource<Org>;
  treeControl: NestedTreeControl<Org>;
  orgs: Org[];
  busyEditing = false;
  selectedObj: Org;

  constructor(
    private server: HttpService,
    private appState: AppStateService,
  ) {
    this.appState.setActiveTool('Organization Admin');
    this.treeDataSource = new MatTreeNestedDataSource();
    this.treeControl = new NestedTreeControl<Org>(this._getChildren);
  }

  // Implementation of a function required by the tree control
  private _getChildren = (node: Org) => node.children;

  ngOnInit() {
    this.fetchOrgs();
  }

  fetchOrgs() {
    this.server.fetch('Org').subscribe(
      data => {
        this.orgs = plainToClass(Org, data);
        this.treeDataSource.data = this.orgs;
      }
    );
  }

  hasNestedChild = (index: number, node: Org) => node.hasChildren();

  onAdd(node: Org) {
    this.busyEditing = true;
    this.selectedObj = new Org();
    if (node) {
      this.selectedObj.parent = node;
    }
  }

  onEdit(node: Org) {
    this.busyEditing = true;
    this.selectedObj = node;
  }

  onDoneEditing(done) {
    this.busyEditing = false;
    this.selectedObj = null;
  }
}
