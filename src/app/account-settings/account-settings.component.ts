import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { User } from '../user';
import { SuccessToastComponent } from '../success-toast/success-toast.component';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FailureToastComponent } from '../failure-toast/failure-toast.component';

@Component({
	selector: 'app-account-settings',
	standalone: true,
	imports: [FormsModule, SuccessToastComponent, FailureToastComponent],
	templateUrl: './account-settings.component.html',
	styleUrl: './account-settings.component.css',
})
export class AccountSettingsComponent {
	constructor(
		private http: HttpClient,
		private authService: AuthService,
		private router: Router
	) {}

	oldPassword: string = '';
	newPassword: string = '';

	currentPassword: string = '';

	changePassword() {
		const form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
		if (form.checkValidity()) {
			this.http
				.put('/api/change-password', {
					oldPassword: this.oldPassword,
					newPassword: this.newPassword,
				})
				.pipe(
					catchError((error: HttpErrorResponse) => {
						return throwError(() => error);
					})
				)
				.subscribe(() => {
					SuccessToastComponent.showToast();
				});
		} else {
			form.classList.add('was-validated');
		}
	}

	deleteAccount() {
		const form = document.getElementsByClassName('needs-validation')[1] as HTMLFormElement;
		if (form.checkValidity()) {
			this.http
				.delete('/api/delete', {
					headers: { 'Content-Type': 'application/json' },
					body: { password: this.currentPassword },
				})
				.pipe(
					catchError((error: HttpErrorResponse) => {
						FailureToastComponent.showToast();
						return throwError(() => error);
					})
				)
				.subscribe(() => {
					this.authService.logout();
					this.router.navigate([`/exit`]);
				});
		} else {
			form.classList.add('was-validated');
		}
	}
}
