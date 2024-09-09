import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [HomeComponent, RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css',
})
export class AppComponent {
	title = 'computer-store-frontend';

	loggedIn = false;

	constructor(
		public authService: AuthService,
		private http: HttpClient,
		private router: Router
	) {
		
	}

	onLogout() {
		this.http
			.post('/api/logout', {}, { withCredentials: true, observe: 'response' })
			.subscribe((res) => {
				this.router.navigate(['/login']);
			});
		this.authService.logout();
	}
}
