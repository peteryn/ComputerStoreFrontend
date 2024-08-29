import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	constructor() {}

	isAuthenticted(): boolean {
		return localStorage.getItem('loggedIn') === 'true';
	}

	login() {
		localStorage.setItem('loggedIn', 'true');
	}

	logout() {
		localStorage.setItem('loggedIn', 'false');
	}
}
