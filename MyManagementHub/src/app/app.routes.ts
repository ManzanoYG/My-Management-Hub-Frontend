import { Routes } from '@angular/router';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
	{
		path: 'home',
		loadComponent: () =>
			import('./layout/main-layout/main-layout.component').then((m) => m.MainLayout),
			canActivate: [roleGuard],
	},
	{
		path: 'sign-in',
		loadComponent: () =>
			import('./pages/sign-in/sign-in.component').then((m) => m.SignIn),
	},
	{
		path: 'sign-up',
		loadComponent: () =>
			import('./pages/sign-up/sign-up.component').then((m) => m.SignUp),
	},
	{
		path: 'settings',
		loadComponent: () =>
			import('./pages/settings/settings.component').then((m) => m.Settings),
			canActivate: [roleGuard],
	},
	{
		path: '**',
		redirectTo: 'home',
	},
];
