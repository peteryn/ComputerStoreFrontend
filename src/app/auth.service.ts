import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	constructor(private http: HttpClient) {
		console.log('constructor');
		this.http.get('/api/check');
	}

	isAuthenticted(): boolean {
		const temp = localStorage.getItem('timestamp');
		if (temp) {
			const expireDate = new Date(temp);
			if (expireDate < new Date()) {
				return false;
			} else {
				return localStorage.getItem('loggedIn') === 'true';
			}
		}
		return false;
	}

	login() {
		localStorage.setItem('loggedIn', 'true');
		const expire = new Date();
		expire.setMinutes(expire.getMinutes() + 5);
		localStorage.setItem('timestamp', expire.toString());
		console.log(expire.toString());
	}

	logout() {
		localStorage.setItem('loggedIn', 'false');
	}
}
