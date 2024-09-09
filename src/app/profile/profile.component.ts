import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { User } from '../user';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SuccessToastComponent } from '../success-toast/success-toast.component';

@Component({
	selector: 'app-profile',
	standalone: true,
	imports: [FormsModule, CommonModule, SuccessToastComponent],
	templateUrl: './profile.component.html',
	styleUrl: './profile.component.css',
})
export class ProfileComponent {
	model = new User('', '', '', '');

	constructor(private http: HttpClient, private router: Router) {
		this.http.get('/api/details').subscribe((res: any) => {
			this.model.firstName = res.firstName;
			this.model.lastName = res.lastName;
		});
	}

	onSubmit() {
		this.http
			.put('/api/details', { firstName: this.model.firstName, lastName: this.model.lastName })
			.subscribe(() => {
				SuccessToastComponent.showToast();
			});
	}
}
