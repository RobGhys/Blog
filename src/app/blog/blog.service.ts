import { Article} from "../article";
import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {MessageService} from "../message.service";

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private articlesUrl = 'api/articles';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`BlogService: ${message}`);
  }

  /** GET heroes from the server */
  getArticles(): Observable<Article[]> {
    // catchError() operator intercepts an Observable that failed.
    // The operator then passes the error to the error handling function
    // handleError() method reports the error and then returns an innocuous result so that the application keeps working
    return this.http.get<Article[]>(this.articlesUrl)
      .pipe(
        tap(_ => this.log('fetched articles')),
        catchError(this.handleError<Article[]>('getArticles', []))
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

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
