import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { OpenProjectComponent } from './open-project/open-project.component';
import { EditorComponent } from './editor/editor.component';
import { VariablesListComponent } from './variables-list/variables-list.component';
import {FormsModule} from "@angular/forms";
import { ProjectOverviewComponent } from './project-overview/project-overview.component';
import { ConsoleComponent } from './console/console.component';
import { UserManualComponent } from './user-manual/user-manual.component';
import { FunctionblockComponent } from './functionblock/functionblock.component';
import { LibraryComponent } from './library/library.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    OpenProjectComponent,
    EditorComponent,
    VariablesListComponent,
    ProjectOverviewComponent,
    ConsoleComponent,
    UserManualComponent,
    FunctionblockComponent,
    LibraryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
