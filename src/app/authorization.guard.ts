import { CanActivateFn } from '@angular/router';
import { inject, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const authorizationGuard: CanActivateFn = (route, state) => {

	const http: HttpClient = inject(HttpClient);
	const router: Router = inject(Router);
	let allowLogin = false;
	return new Observable<boolean>((observer) => {
		http.get('/api/check', { withCredentials: true, observe: 'response' })
			.pipe(
				catchError((error: HttpErrorResponse) => {
					localStorage.setItem('last_visited_url', route.url[0].toString())
					router.navigate(['/login']);
					observer.next(false);
					observer.complete();
					return throwError(() => error);
				})
			)
			.subscribe(() => {
				allowLogin = true;
				observer.next(true);
				observer.complete();
			});
	});
};
