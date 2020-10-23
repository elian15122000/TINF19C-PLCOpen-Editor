import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FbswrapperComponent } from './fbs/fbswrapper/fbswrapper.component';
import { AswrapperComponent } from './as/aswrapper/aswrapper.component';
import { CardComponent } from './homepage/card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    FbswrapperComponent,
    AswrapperComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
