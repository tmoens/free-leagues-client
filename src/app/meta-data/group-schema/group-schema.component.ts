import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../http-service';
import {GroupSchema} from './group-schema';
import {classToClass, plainToClass} from 'class-transformer';
import {MatTreeNestedDataSource} from '@angular/material';
import {NestedTreeControl} from '@angular/cdk/tree';

@Component({
  selector: 'app-group-schema',
  templateUrl: './group-schema.component.html',
  styleUrls: ['./group-schema.component.scss']
})
export class GroupSchemaComponent implements OnInit {

  treeDataSource: MatTreeNestedDataSource<GroupSchema>;
  treeControl: NestedTreeControl<GroupSchema>;
  gsCopy: GroupSchema;
  data: any;
  groupSchemas: GroupSchema[];
  newOne: GroupSchema;
  constructor(private server: HttpService) {
    this.treeDataSource = new MatTreeNestedDataSource();
    this.treeControl = new NestedTreeControl<GroupSchema>(this._getChildren);
    this.gsCopy = new GroupSchema();
  }

  ngOnInit() {
    this.fetchGroupSchemas();
  }

  fetchGroupSchemas() {
    this.server.fetchGroupSchemas().subscribe(
      data => {
        this.groupSchemas = plainToClass(GroupSchema, data);
        this.treeDataSource.data = this.groupSchemas;
      }
    );
  }

  hasNestedChild = (index: number, node: GroupSchema) => node.hasChildren();

  addNew(node: GroupSchema) {
    this.newOne = new GroupSchema();
    if (node) {
      this.newOne.parent = node;
    }
  }

  saveNew() {
    this.server.createGroupSchema(this.newOne).subscribe(
      _ => {
        this.newOne = null;
        this.fetchGroupSchemas();
      }
    );
  }

  cancelNew() {
    this.newOne = null;
  }

  private _getChildren = (node: GroupSchema) => node.children;
  onSelect(gs: GroupSchema) {
    this.gsCopy = classToClass(gs);
  }


}
