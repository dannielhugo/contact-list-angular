import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { Contact } from '../contact';
import { ContactService } from '../contact.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements AfterViewInit, OnDestroy {

  data: Contact[] = [];

  displayedColumns: string[] = ['id', 'name', 'phone', 'email', 'address', 'actions'];

  resultsLength =  0;

  private $contactSubscription: Subscription;

  constructor(
    private contactService: ContactService,
  ) { }

  ngAfterViewInit(): void {
    this.$contactSubscription = this.contactService.getContacts()
      .subscribe(contacts => {
        this.data = contacts;
        this.resultsLength = contacts.length;
      });
  }

  ngOnDestroy(): void {
    this.$contactSubscription.unsubscribe();
  }

  deleteContact(contact: Contact) {
    this.data = this.data.filter(b => b.id !== contact.id);
    this.contactService.deleteContact(contact).subscribe();
  }
}
