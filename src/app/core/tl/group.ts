import {Exclude, Type} from 'class-transformer';

export class Group {
  id: string;
  name: string;
  nameShort: string;
  description: string;

  @Type(() => Group)
  parent: Group;
  @Type(() => Group)
  @Exclude({ toPlainOnly: true })
  children: Group[];

  hasChildren(): boolean {
    if (this.children) {
      return this.children.length > 0;
    } else {
      return false;
    }
  }

  isRoot(): boolean {
    return (!this.parent);
  }

  getRootName(): string {
    return (this.isRoot()) ? this.name : this.parent.getRootName();
  }

  getHierarchyName(): string {
    if (this.isRoot()) {
      return this.name;
    } else {
      return this.parent.getHierarchyName() + '/' + this.name;
    }
  }
}
