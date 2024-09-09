import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { User } from '../user';
import { SuccessToastComponent } from '../success-toast/success-toast.component';

@Component({
	selector: 'app-account-settings',
	standalone: true,
	imports: [FormsModule, SuccessToastComponent],
	templateUrl: './account-settings.component.html',
	styleUrl: './account-settings.component.css',
})
export class AccountSettingsComponent {
	constructor(private http: HttpClient) {}

	oldPassword: string = '';
	newPassword: string = '';

	onSubmit() {
		const form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
		if (form.checkValidity()) {
			this.http
				.put('/api/changePassword', {
					oldPassword: this.oldPassword,
					newPassword: this.newPassword,
				})
				.pipe(
					catchError((error: HttpErrorResponse) => {
						console.log('Invalid response');
						return throwError(() => error);
					})
				)
				.subscribe(() => {
					console.log('Sucessfully updated');
				});

			console.log('passed');
		} else {
			form.classList.add('was-validated');
		}
	}
}
