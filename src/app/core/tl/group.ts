import {Exclude, plainToClass, plainToClassFromExist, Type} from 'class-transformer';
import {Sport} from '../sport/sport';
import {HttpService} from '../../http-service';
import {Tree} from '../../utils/Tree';

export class Group {
  id: string;
  name: string;
  nameShort: string;
  description: string;
  startDate: Date;
  endDate: Date;
  sport?: Sport;

  // @Type(() => Group)
  // parent: Group;

  // @Type(() => Group)
  // @Exclude({ toPlainOnly: true })
  // children: Group[];

  constructor(
    private server: HttpService,
  ) {
  }

  // hasChildren(): boolean {
  //   if (this.children) {
  //     return this.children.length > 0;
  //   } else {
  //     return false;
  //   }
  // }

  // isRoot(): boolean {
  //   return (!this.parent);
  // }

  // getRootName(): string {
  //   return (this.isRoot()) ? this.name : this.parent.getRootName();
  // }

  // The following assumes that the group has been "fully" loaded, i.e. its parent
  // hierarchy has been loaded, and that the sport relation has been loaded
  // all the way up the parent hierarchy.
  // getEffectiveSport(): Sport | null {
  //     if (this.sport) {
  //       return this.sport;
  //     }
  //     if (this.parent) {
  //       return this.parent.getEffectiveSport();
  //     }
  //     return null;
  // }
}
