import { Component } from '@angular/core';
import { User } from '../user';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../auth.service';
import { FailureToastComponent } from '../failure-toast/failure-toast.component';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [FormsModule, FailureToastComponent],
	templateUrl: './login.component.html',
	styleUrl: './login.component.css',
})
export class LoginComponent {
	constructor(
		private http: HttpClient,
		private router: Router,
		private authService: AuthService
	) {}

	model = new User('', '', '', '');

	onSubmit() {
		const last_visited_url: string | null = localStorage.getItem('last_visited_url');
		this.http
			.post(
				'/api/login',
				{ username: this.model.username, password: this.model.password },
				{ withCredentials: true }
			)
			.pipe(
				catchError((error: HttpErrorResponse) => {
					FailureToastComponent.showToast();
					return throwError(() => error);
				})
			)
			.subscribe((res: any) => {
				this.authService.login();
				if (last_visited_url) {
					localStorage.removeItem('last_visited_url');
					this.router.navigate([`/${last_visited_url}`]);
				} else {
					this.router.navigate(['/profile']);
				}
			});
	}
}
