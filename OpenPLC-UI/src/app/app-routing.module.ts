import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent} from './homepage/homepage.component';
import { EditorComponent} from './editor/editor.component';
import { UserManualComponent} from './user-manual/user-manual.component';
import { VariablesListComponent} from './variables-list/variables-list.component';

const routes: Routes = [
  {path: 'home', component: HomepageComponent},
  {path: 'editor', component: EditorComponent},
  {path: 'userManual', component: UserManualComponent},
  {path: '**', component: HomepageComponent},
  {path: 'variables', component: VariablesListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
