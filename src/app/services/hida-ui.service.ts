import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AppConfig } from '../config/app_config';

@Injectable({
  providedIn: 'root'
})
export class HidaUiService {

	rolesObject$ = new Subject<any>();

	constructor() { }

	setUserInfo(userInfo: { roles: string[]; clientId: string }): void {
	  this.rolesObject$.next(userInfo);
	}
  
	getUserInfo(): Observable<any> {
	  return this.rolesObject$.asObservable();
	}

	getApiInfo(): any {
		return AppConfig.apiUrl();
	}
}
