import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Vocabulary} from './vocabulary';
import {HttpService} from '../../../http-service';
import {HasLexicon} from '../../../utils/HasLexicon';
import {TerminologyService} from '../../../terminology.service';
import {Term} from '../term';
import {plainToClass} from 'class-transformer';

@Component({
  selector: 'app-vocabulary-editor',
  templateUrl: './vocabulary-editor.component.html',
  styleUrls: ['./vocabulary-editor.component.scss']
})
export class VocabularyEditorComponent {
  @Input() subject: string;
  private _obj: HasLexicon;
  @Input()
  set obj(obj: HasLexicon) {
    this._obj = obj;
    this.initialize();
  }
  @Output() done = new EventEmitter<boolean>();
  vocabulary: Vocabulary;
  lexicon: object;
  busy: boolean;
  constructor(
    private server: HttpService,
    private terminologyService: TerminologyService,
  ) { }

  initialize() {
    this.getVocabulary();
    this.lexicon = this._obj.lexicon;
  }

  async getVocabulary() {
    this.busy = true;
    this.server.fetchVocabulary(this._obj).subscribe(
      data => {
        this.vocabulary = plainToClass(Vocabulary, data);
        this.refreshVocabulary();
        this.busy = false;
      });
  }

  onLexiconChange(term: Term) {
    if (this.lexicon[term.id] === '') {
      delete this.lexicon[term.id];
      term.effectiveValue = this.terminologyService.unsetEffectiveLexicon(term.id);
    } else {
      term.effectiveValue = this.terminologyService.ammendEffectiveLexicon(term.id, this.lexicon[term.id]);
    }
  }

  refreshVocabulary() {
    for (const t of this.vocabulary.terms) {
      t.effectiveValue = this.terminologyService.getEffectiveTerm(t.id);
      t.parentValue = this.terminologyService.getParentTerm(t.id);
    }
  }
}
