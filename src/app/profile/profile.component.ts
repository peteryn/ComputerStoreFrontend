import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

@Component({
	selector: 'app-profile',
	standalone: true,
	imports: [],
	templateUrl: './profile.component.html',
	styleUrl: './profile.component.css',
})
export class ProfileComponent {
	constructor(private http: HttpClient, private router: Router) {
		console.log('ran');
		this.http
			.get('/api/protected', { withCredentials: true, observe: 'response' })
			.pipe(
				catchError((error: HttpErrorResponse) => {
					this.router.navigate(['/login']);
					return throwError(() => error);
				})
			)
			.subscribe((res: any) => {
				console.log(res);
			});
	}
}
