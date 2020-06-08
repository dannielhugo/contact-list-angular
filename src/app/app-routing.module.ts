import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewContactComponent } from './contact/new-contact/new-contact.component';
import { ContactListComponent } from './contact/contact-list/contact-list.component';

const routes: Routes = [
  { path: 'contact', component: NewContactComponent },
  { path: '', component: ContactListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
