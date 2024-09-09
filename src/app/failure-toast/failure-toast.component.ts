import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-failure-toast',
	standalone: true,
	imports: [],
	templateUrl: './failure-toast.component.html',
	styleUrl: './failure-toast.component.css',
})
export class FailureToastComponent {
	@Input() message = 'Failure. Something went wrong';

	public static showToast() {
		const failureToast = document.getElementById('failure-toast');
		const toastBootstrap = (window as any).bootstrap.Toast.getOrCreateInstance(failureToast);
		toastBootstrap.show();
	}
}
