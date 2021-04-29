import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {GroupSchema} from './meta-data/group-schema/group-schema';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';
import {HasLexicon} from './utils/HasLexicon';

const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  // private serverURL = environment.serverPrefix;
  private serverURL = 'http://localhost:3004';

  constructor(
    private message: MatSnackBar,
    private http: HttpClient,
  ) { }


  // -------------------- Group Schemas --------------------------------
  fetchGroupSchemas(): Observable<any> {
    const url = `${this.serverURL}/GroupSchema/FindTrees`;
    return this.http.get(url, {headers: headers})
      .pipe(
        tap(_ => console.log('just curious6')),
        catchError(this.handleError('fetch group schemas', null))
      );
  }

  updateGroupSchema(dto: GroupSchema): Observable<any> {
    const url = `${this.serverURL}/GroupSchema`;
    return this.http.put(url,  dto, {headers: headers})
      .pipe(
        tap(_ => console.log('just curious5')),
        catchError(this.handleError('Update GroupSchema failed.', []))
      );
  }

  createGroupSchema(eo: GroupSchema): Observable<any> {
    const url = `${this.serverURL}/GroupSchema`;
    return this.http.post(url,  eo, {headers: headers})
      .pipe(
        tap(_ => console.log('just curious4')),
        catchError(this.handleError('External GroupSchema creation', []))
      );
  }


  fetchVocabulary(obj: HasLexicon): Observable<any> {
    const url = `${this.serverURL}/Vocabulary/${obj.vocabularyName}`;
    return this.http.get(url, {headers: headers})
      .pipe(
        tap(_ => console.log('fetched vocabulary for ' + obj.vocabularyName)),
        catchError(this.handleError('fetch vocabulary failed', null))
      );
  }

  // -------------------- Generic --------------------------------

  fetch(type: string): Observable<any> {
    const url = `${this.serverURL}/${type}`;
    return this.http.get(url, {headers: headers})
      .pipe(
        tap(_ => console.log('fetching ' + type)),
        catchError(this.handleError(`Fetch ${type} failed`, []))
      );
  }

  fetchInstance(type: string, id): Observable<any> {
    const url = `${this.serverURL}/${type}/${id}`;
    return this.http.get(url, {headers: headers})
      .pipe(
        tap(_ => console.log(`fetching ${type}/${id}`)),
        catchError(this.handleError(`Fetch ${type}/${id} failed`, []))
      );
  }

  update(type: string, dto: any): Observable<any> {
    const url = `${this.serverURL}/${type}`;
    return this.http.put(url,  dto, {headers: headers})
      .pipe(
        tap(_ => console.log('just curious2')),
        catchError(this.handleError(`Update ${type} failed`, []))
      );
  }

  create(type: string, dto: any): Observable<any> {
    const url = `${this.serverURL}/${type}`;
    return this.http.post(url,  dto, {headers: headers})
      .pipe(
        tap(_ => console.log('just curious3')),
        catchError(this.handleError(`Create ${type} failed`, []))
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

      this.message.open(`${operation}. ${error.error.error}`,
        null, {duration: 4000});
      // Let the app keep running by returning what we were told to.
      return of(result as T);
    };
  }

}
