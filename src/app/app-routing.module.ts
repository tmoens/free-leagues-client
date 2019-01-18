import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GroupSchemaComponent} from './meta-data/group-schema/group-schema.component';
import {OrgComponent} from './core/org/org.component';

const routes: Routes = [
  { path: 'groupSchemaEditor', component: GroupSchemaComponent },
  { path: 'orgEditor', component: OrgComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
