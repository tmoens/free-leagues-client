import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GroupSchemaComponent} from './meta-data/group-schema/group-schema.component';
import {OrgComponent} from './core/org/org.component';
import {ExternalOrgComponent} from './core/external-data/external-org/external-org.component';
import {TLComponent} from './core/tl/tl.component';
import {SportComponent} from './core/sport/sport.component';
import {PersonEditorComponent} from './core/person/person-editor/person-editor.component';

const routes: Routes = [
  { path: 'externalOrgAdmin', component: ExternalOrgComponent },
  { path: 'groupSchemaEditor', component: GroupSchemaComponent },
  { path: 'orgAdmin', component: OrgComponent },
  { path: 'personEditor', component: PersonEditorComponent},
  { path: 'sportAdmin', component: SportComponent},
  { path: 'tlAdmin', component: TLComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
