import {Injectable, OnInit} from '@angular/core';
import {Term} from './meta-data/terminology/term';
import {HttpService} from './http-service';
import {plainToClass} from 'class-transformer';
import {Sport} from './core/sport/sport';
import {HasLexicon} from './utils/HasLexicon';

@Injectable({
  providedIn: 'root'
})
export class TerminologyService  {
  // The full set of generic terms that are user modifiable in one or more objects.
  // For example, the generic term for when two sides meet to compete might be a __compo_name__.
  genericTerms: Term[];
  // A set of default values for every term that can be used if the user has not
  // configured an alternative. So, for example, the default value for a __compo_name__ is "game".
  defaultLexicon: object = {};
  // The set of values for every term that is applicable in the user's current context.
  // So for example, in the context of tennis tournament, the value of __compo_name__ would
  // likely be "match".
  effectiveLexicon: object = {};
  // the parent Lexicon is the lexicon that would be in place if there were no overrides
  // in the current object.
  parentLexicon: object = {};


  constructor(
    private httpService: HttpService,
  ) {
  }

  // pre-load of all of the terms.
  load() {
    this.httpService.fetch('Term').subscribe(
      data => {
        this.genericTerms = plainToClass(Term, data);
        this.buildDefaultLexicon();
      });
  }

  // Build the default lexicon using the default values in all the generic Term objects.
  buildDefaultLexicon() {
    for (const t of this.genericTerms) {
      this.defaultLexicon[t.id] = t.default;
    }
  }

  // We set the current terminological context (tm) by building the effective
  // parent lexicon and the effective lexicon for an object.
  // NOTE: Unfortunately we cannot introspect the class of the object and
  // compare it to kown values because that class changes when the code is minified.
  // So instead we have to pass in a class name.

  // Build the effective lexicon by starting with a copy of the default lexicon
  // and overlaying the lexicons of all the objects in the user's context.
  // For example, imagine the user is looking at a result for a tennis match
  // in the Under 13 of the Nashville Spring Rain Tennis Tournament.
  // The user interface should be using the word "match".
  // the default value for __compo_name__ is "game" from the defaultLexicon.
  // However, the sport is Tennis, which overrides the default and redefines
  // __compo_name__ to "match".
  // While the Nashville Spring Rain Tennis Tournament, could further override
  // the definition of __compo_name__, it does not.  So when the user interface
  // presents a value for __compo_name__ from the default, overlaid with the sport
  // and not overlaid by the tournament. It will be "match", in this particular
  // context.
  setTerminologyContext<T extends HasLexicon>(obj: T) {
    switch (obj.vocabularyName) {
      // A sport is independent of any other object, so it's lexicon
      // can only override the base lexicon.
      case 'Sport':
        Object.assign(this.effectiveLexicon, this.defaultLexicon, obj.lexicon);
        Object.assign(this.parentLexicon, this.defaultLexicon);
        break;
      default:
        Object.assign(this.effectiveLexicon, this.defaultLexicon);
    }
    console.log(this.effectiveLexicon);
  }

  getEffectiveTerm(termId: string): string {
    return this.effectiveLexicon[termId];
  }
  getParentTerm(termId: string): string {
    return this.parentLexicon[termId];
  }

  ammendEffectiveLexicon(id: string, value: string) {
    this.effectiveLexicon[id] = value;
    return value;
  }

  unsetEffectiveLexicon(id: string) {
    this.effectiveLexicon[id] = this.parentLexicon[id];
    return this.effectiveLexicon[id];
  }
}

