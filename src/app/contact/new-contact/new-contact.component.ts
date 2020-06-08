import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { Contact } from '../contact';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.component.html',
  styleUrls: ['./new-contact.component.scss']
})
export class NewContactComponent implements OnInit {

  model = {
    name: '',
    phone: '',
    address: '',
    email: '',
  }

  constructor(
    private contactService: ContactService,
  ) { }

  ngOnInit(): void {
  }

  addContact(contactForm: NgForm) {
    this.contactService.addContact(this.model as Contact)
      .subscribe(() => {
        this.model = {
          name: '',
          phone: '',
          address: '',
          email: '',
        };

        contactForm.resetForm()
      });
  }

}
