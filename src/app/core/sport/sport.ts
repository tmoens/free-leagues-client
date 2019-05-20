import {ExternalOrg} from '../external-data/external-org/externalOrg';
import {HasLexicon} from '../../utils/HasLexicon';

export class Sport  extends HasLexicon {
  readonly vocabularyName = 'Sport';
  id: string;
  name: string;
  description: string;
  governingBody: ExternalOrg;

  constructor() {
    super();

  }

  getVocabularyName() {
    return 'Sport';
  }
}
