import { Routes } from '@angular/router';
import { roleGuard } from './core/guards/role.guard';
import { isAuthenticatedGuard } from './core/guards/authenticated.guard';
import { isNotAuthenticatedGuard } from './core/guards/not-authenticated.guard';

export const routes: Routes = [
	{
		path: 'home',
		loadComponent: () =>
			import('./layout/main-layout/main-layout.component').then((m) => m.MainLayout),
	},
	{
		path: 'sign-in',
		loadComponent: () =>
			import('./pages/sign-in/sign-in.component').then((m) => m.SignIn),
		canActivate: [isNotAuthenticatedGuard],
	},
	{
		path: 'sign-up',
		loadComponent: () =>
			import('./pages/sign-up/sign-up.component').then((m) => m.SignUp),
		canActivate: [isNotAuthenticatedGuard],
	},
	{
		path: 'settings',
		loadComponent: () =>
			import('./pages/settings/settings.component').then((m) => m.Settings),
			canActivate: [isAuthenticatedGuard, roleGuard],
	},
	{
		path: '**',
		redirectTo: 'home',
	},
];
