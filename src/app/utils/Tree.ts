import {Exclude, Type} from 'class-transformer';

export class Tree<T> {

  @Exclude()
  private type: Function;

  @Type(options => {
    return (options.newObject as Tree<T>).type;
  })
  parent: Tree<T>;

  @Type(options => {
    return (options.newObject as Tree<T>).type;
  })
  children: Tree<T>[] | null;

  constructor() {}

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

  getEffectiveSport() {}
}
