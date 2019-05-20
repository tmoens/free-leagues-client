import {Type} from 'class-transformer';
import {HasLexicon} from '../../utils/HasLexicon';

export class GroupSchema extends HasLexicon {
  readonly vocabularyName: 'GroupSchema';
  id: string;
  name: string;
  genericGroupName: string;
  genericGroupNameShort: string;
  examples: string;
  description: string;
  @Type(() => GroupSchema)
  parent: GroupSchema;
  @Type(() => GroupSchema)
  children: GroupSchema[];

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
      return this.genericGroupName;
    } else {
      return this.parent.getHierarchyName() + '/' + this.genericGroupName;
    }
  }
}
