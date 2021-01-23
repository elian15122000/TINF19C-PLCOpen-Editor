import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditorComponent } from './editor/editor.component';
import { LibraryComponent } from './library/library.component';
import { ConsoleComponent } from './console/console.component';
import { HomepageComponent } from './homepage/homepage.component';
import { UserManualComponent } from './user-manual/user-manual.component';
import { OpenProjectComponent } from './open-project/open-project.component';
import { FormsModule} from '@angular/forms';
import { AngularResizedEventModule } from 'angular-resize-event';
import { VariablesListComponent } from './variables-list/variables-list.component';
import { ResizableModule } from 'angular-resizable-element';
import { ProjectOverciewComponent } from './project-overciew/project-overciew.component';
import { FunctionblockComponent } from './functionblock/functionblock.component';
import { ImportService} from './import.service';

@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    LibraryComponent,
    ConsoleComponent,
    HomepageComponent,
    UserManualComponent,
    OpenProjectComponent,
    VariablesListComponent,
    ProjectOverciewComponent,
    FunctionblockComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularResizedEventModule,
    ResizableModule,
  ],
  providers: [ImportService],
  bootstrap: [AppComponent]
})
export class AppModule { }
