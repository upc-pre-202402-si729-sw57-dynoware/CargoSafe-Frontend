import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {inject} from "@angular/core";
import {environment} from "../../../environments/environment";
import {catchError, Observable, retry, throwError} from "rxjs";

export class BaseService<T> {

  protected httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  protected http: HttpClient = inject(HttpClient);

  protected basePath: string = `${environment.serverBasePath}`;

  protected resourceEndpoint: string = '/resources';

  protected handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}` );
    }
    return throwError(() => new Error('Something bad happened; please try again later. '));
  }

  private resourcePath() {
    return`${this.basePath}${this.resourceEndpoint}`;
  }

  public getChartData(): Observable<T[]> {
    return this.http.get<T[]>(this.resourcePath(), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

}
