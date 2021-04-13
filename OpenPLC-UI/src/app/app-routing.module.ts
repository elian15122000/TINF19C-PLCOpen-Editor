import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent} from './homepage/homepage.component';
import { EditorComponent } from './editor/editor.component';
import { ProjectOverviewComponent} from './project-overview/project-overview.component';
import { UserManualComponent} from './user-manual/user-manual.component';

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'editor/:pouName', component: EditorComponent},
  {path: 'projectOverview', component: ProjectOverviewComponent},
  {path: 'userManual', component: UserManualComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
