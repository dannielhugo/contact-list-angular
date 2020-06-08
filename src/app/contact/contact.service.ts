import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Contact } from './contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private contactsUrl = 'api/contacts';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
  ) { }

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.contactsUrl)
      .pipe(
        catchError(this.handleError<Contact[]>('getContacts', []))
      );
  }

  addContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.contactsUrl, contact, this.httpOptions)
      .pipe(
        catchError(this.handleError<Contact>('addContact'))
      );
  }

  deleteContact(contact: Contact): Observable<Contact> {
    const url = `${this.contactsUrl}/${contact.id}`;

    return this.http.delete<Contact>(url,this.httpOptions)
      .pipe(
        catchError(this.handleError<Contact>('deleteContact'))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation, error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
