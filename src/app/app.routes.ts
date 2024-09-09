import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { TestComponent } from './test/test.component';
import { authorizationGuard } from './authorization.guard';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

export const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: 'login', component: LoginComponent },
	{
		path: 'account-settings',
		component: AccountSettingsComponent,
		canActivate: [authorizationGuard],
	},
	{ path: 'profile', component: ProfileComponent, canActivate: [authorizationGuard] },
	{ path: 'test', component: TestComponent, canActivate: [authorizationGuard] },
];
