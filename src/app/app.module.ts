import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GroupSchemaComponent } from './meta-data/group-schema/group-schema.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {
  MatButtonModule, MatCardModule, MatDatepickerModule, MatDialogModule,
  MatDividerModule, MatExpansionModule, MatFormFieldModule, MatGridListModule,
  MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatProgressBarModule,
  MatProgressSpinnerModule, MatSelectModule, MatSidenavModule, MatSnackBarModule,
  MatSortModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTreeModule
} from '@angular/material';
import { ExternalOrgEditorComponent } from './core/external-data/external-org/external-org-editor/external-org-editor.component';
import { ExternalOrgComponent } from './core/external-data/external-org/external-org.component';
import { OrgComponent } from './core/org/org.component';
import { OrgEditorComponent } from './core/org/org-editor/org-editor.component';
import { PersonEditorComponent } from './core/person/person-editor/person-editor.component';
import { TLComponent } from './core/tl/tl.component';
import { SportComponent } from './core/sport/sport.component';
import { SportEditorComponent } from './core/sport/sport-editor/sport-editor.component';
import { TerminologyService } from './terminology.service';
import { VocabularyEditorComponent } from './meta-data/terminology/vocabulary-editor/vocabulary-editor.component';
import { TlEditorComponent } from './core/tl/tl-editor/tl-editor.component';
import { NewTlComponent } from './core/tl/new-tl/new-tl.component';
import {MomentDateModule} from '@angular/material-moment-adapter';

@NgModule({
  declarations: [
    AppComponent,
    ExternalOrgComponent,
    ExternalOrgEditorComponent,
    GroupSchemaComponent,
    OrgComponent,
    OrgEditorComponent,
    PersonEditorComponent,
    TLComponent,
    SportComponent,
    SportEditorComponent,
    VocabularyEditorComponent,
    PersonEditorComponent,
    TlEditorComponent,
    NewTlComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    MomentDateModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule, MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTreeModule,
    ReactiveFormsModule,
  ],
  providers: [
    TerminologyService,
    {
      provide: APP_INITIALIZER,
      useFactory: terminologyServiceFactory,
      deps: [TerminologyService],
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function terminologyServiceFactory(provider: TerminologyService) {
  return () => provider.load();
}
