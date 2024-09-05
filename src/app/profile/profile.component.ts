import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { User } from '../user';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-profile',
	standalone: true,
	imports: [FormsModule, CommonModule],
	templateUrl: './profile.component.html',
	styleUrl: './profile.component.css',
})
export class ProfileComponent {
	model = new User('', '', '', '');

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
		
		this.http
			.get('/api/details')
			.subscribe((res: any) => {
				console.log(res);
				this.model.firstName = res.firstName;
				this.model.lastName = res.lastName;
			});
	}

	onSubmit() {
		this.http
			.put('/api/update', {"firstName" : this.model.firstName, "lastName": this.model.lastName})
			.subscribe((res: any) => {

			});
	}
}
