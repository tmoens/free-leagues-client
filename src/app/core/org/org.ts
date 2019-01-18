import {Type} from 'class-transformer';

export class Org  {
  id: string;
  name: string;
  nameShort: string;
  @Type(() => Org)
  children: Org[];

  hasChildren(): boolean {
    return this.children.length > 0;
  }
}
