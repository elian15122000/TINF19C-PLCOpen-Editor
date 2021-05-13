import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { EditorComponent } from './editor/editor.component';
import { VariablesListComponent } from './variables-list/variables-list.component';
import { FormsModule} from '@angular/forms';
import { ProjectOverviewComponent } from './project-overview/project-overview.component';
import { UserManualComponent } from './user-manual/user-manual.component';
import { LibraryComponent } from './library/library.component';
import { GraphComponent } from './graph/graph.component';
import {NgxGraphModule} from '@swimlane/ngx-graph';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule} from '@angular/common/http';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    EditorComponent,
    VariablesListComponent,
    ProjectOverviewComponent,
    UserManualComponent,
    LibraryComponent,
    GraphComponent,
    NavigationComponent,
    FooterComponent,
    AboutComponent,
  ],
  imports: [
    NgxGraphModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
