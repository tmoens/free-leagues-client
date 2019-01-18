import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {GroupSchema} from './meta-data/group-schema/group-schema';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Org} from './core/org/org';

const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  // private serverURL = environment.serverPrefix;
  private serverURL = 'http://localhost:3004';

  constructor(
    private http: HttpClient,
  ) { }


  fetchGroupSchemas(): Observable<GroupSchema[]> {
    const url = `${this.serverURL}/GroupSchema/FindTrees`;
    return this.http.get(url, {headers: headers})
      .pipe(
        tap(_ => console.log('just curious')),
        catchError(this.handleError('fetch group schemas', null))
      );
  }

  fetchOrgs(): Observable<any> {
    const url = `${this.serverURL}/org/FindTrees`;
    return this.http.get(url, {headers: headers})
      .pipe(
        tap(_ => console.log('just curious')),
        catchError(this.handleError('fetch orgs', null))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  /*
   * This generic handler was copied from the Angular tutorial.
   * And as a note to future, even thicker, self who will be going WTF?...
   * We use it to handle errors for all our http calls.  But all
   * our HTTP Calls return different types!  And the error handler
   * has to return the right type.  So, the error handler is
   * parameterized such that you can tell it what to return when
   * it is finished doing it's business.
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // Here's the rub - there really is no generic thing we CAN do when
      // an http call fails.  Do we pop up an alert?  Not really a good
      // idea always.  Remote log? Ditto. So we just put something on the console
      // and pass back whatever we were told to.  Then for each client
      // that makes an HTTP call and gets their error (usually empty)
      // result back - they can decide if they need to do anything.
      // Which is all pretty strange, because for that they could have
      // just used the returned observable and handled the error themselves.
      // So maybe I am not getting it, but this whole generic handler seems
      // pretty pointless.
      console.log('Operation: ' + operation + ' failed.');

      // Let the app keep running by returning what we were told to.
      return of(result as T);
    };
  }
}
