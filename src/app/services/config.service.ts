import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserConfigService {
  apiUrl: string = '';
  constructor(
    private http: HttpClient
  ) {}

  setApiUrl(url: any) {
    this.apiUrl = url;
  }

  getApiUrl(): string {
    return this.apiUrl;
  }

  handleError(error: any): Observable<any> {
    return throwError(error);
  }

  getCustomTaxonomyStatus() {
    return this.http.get(
      this.apiUrl + 'api/launch-taxonomy/v1/api/customTaxonomyStatus'
    );
  }
}
