import { Component, inject } from '@angular/core';
import { User } from '../user';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { SuccessToastComponent } from '../success-toast/success-toast.component';

@Component({
	selector: 'app-register',
	standalone: true,
	imports: [FormsModule, CommonModule, SuccessToastComponent],
	templateUrl: './register.component.html',
	styleUrl: './register.component.css',
})
export class RegisterComponent {
	constructor(private http: HttpClient, private router: Router) {}

	model = new User('', '', '', '');

	submitted = false;

	onSubmit() {
		this.submitted = true;
		const form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
		if (form.checkValidity()) {
			this.http
				.post('/api/register', this.model, { observe: 'response' })
				.pipe(
					catchError((error: HttpErrorResponse) => {
						const failureToast = document.getElementById('failure-toast');
						const toastBootstrap = (window as any).bootstrap.Toast.getOrCreateInstance(
							failureToast
						);
						toastBootstrap.show();
						return throwError(() => error);
					})
				)
				.subscribe(() => {
					SuccessToastComponent.showToast();
					setTimeout(() => {
						this.router.navigate(['/login']);
					}, 3000);
				});
		} else {
			form.classList.add('was-validated');
		}
	}
}
