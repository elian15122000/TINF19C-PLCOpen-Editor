import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AswrapperComponent } from './as/aswrapper/aswrapper.component';
import { FbswrapperComponent } from './fbs/fbswrapper/fbswrapper.component';


const routes: Routes = [
  { path: 'fbs', component: FbswrapperComponent },
  { path: 'as', component: AswrapperComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
