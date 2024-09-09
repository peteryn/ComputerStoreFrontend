import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-success-toast',
	standalone: true,
	imports: [],
	templateUrl: './success-toast.component.html',
	styleUrl: './success-toast.component.css',
})
export class SuccessToastComponent {
	@Input() message: string = 'Success!';

	public static showToast() {
		const successToast = document.getElementById('success-toast');
		const toastBootstrap = (window as any).bootstrap.Toast.getOrCreateInstance(successToast);
		toastBootstrap.show();
	}
}
