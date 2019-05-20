import {Exclude, Type} from 'class-transformer';

export class Org {
  id: string;
  name: string;
  nameShort: string;
  @Type(() => Org)
  @Exclude({ toPlainOnly: true })
  parent: Org;
  @Type(() => Org)
  @Exclude({ toPlainOnly: true })
  children: Org[];

  hasChildren(): boolean {
    return this.children.length > 0;
  }

  isRoot(): boolean {
    return (this.parent) ? false : true;
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
