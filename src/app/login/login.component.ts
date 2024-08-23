import { Component } from '@angular/core';
import { User } from '../user';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [FormsModule],
	templateUrl: './login.component.html',
	styleUrl: './login.component.css',
})
export class LoginComponent {
    model = new User("", "")

    onSubmit() {

    }
}
