import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GroupSchemaComponent } from './meta-data/group-schema/group-schema.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {
  MatButtonModule, MatCardModule, MatDatepickerModule, MatDialogModule,
  MatDividerModule, MatExpansionModule, MatFormFieldModule, MatGridListModule,
  MatIconModule, MatInputModule, MatListModule, MatMenuModule,
  MatProgressSpinnerModule, MatSelectModule, MatSidenavModule,
  MatSortModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTreeModule
} from '@angular/material';
import {OrgComponent} from './core/org/org.component';

@NgModule({
  declarations: [
    AppComponent,
    GroupSchemaComponent,
    OrgComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
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
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSidenavModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTreeModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
