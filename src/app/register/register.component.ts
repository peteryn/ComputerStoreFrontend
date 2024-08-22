import { Component, inject } from '@angular/core';
import { User } from '../user';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-register',
	standalone: true,
	imports: [FormsModule],
	templateUrl: './register.component.html',
	styleUrl: './register.component.css',
})
export class RegisterComponent {
	constructor(private http: HttpClient) {}

	model = new User('', '');

	submitted = false;

	baseURL = 'localhost:8080';

	onSubmit() {
		this.submitted = true;
		this.http.post('/api/register', this.model).subscribe((res) => {
			console.log(`res ${res}`);
		});
	}
}
