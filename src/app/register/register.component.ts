import { Component, inject } from '@angular/core';
import { User } from '../user';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-register',
	standalone: true,
	imports: [FormsModule, CommonModule],
	templateUrl: './register.component.html',
	styleUrl: './register.component.css',
})
export class RegisterComponent {
	constructor(private http: HttpClient) {}

	model = new User('', '');

	submitted = false;

	onSubmit() {
		this.submitted = true;
		this.http.post('/api/register', this.model).subscribe((res) => {
			console.log(`res ${res}`);
		});
	}
}
