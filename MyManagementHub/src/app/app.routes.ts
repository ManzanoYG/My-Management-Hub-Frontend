import { Routes } from '@angular/router';
import { roleGuard } from './core/guards/role.guard';
import { isAuthenticatedGuard } from './core/guards/authenticated.guard';
import { isNotAuthenticatedGuard } from './core/guards/not-authenticated.guard';

export const routes: Routes = [
	{
		path: 'home',
		loadComponent: () =>
			import('./shell/layout/main-layout.component').then((m) => m.MainLayout),
	},
	{
		path: 'sign-in',
		loadComponent: () =>
			import('./features/auth/sign-in/sign-in.component').then((m) => m.SignIn),
		canActivate: [isNotAuthenticatedGuard],
	},
	{
		path: 'sign-up',
		loadComponent: () =>
			import('./features/auth/sign-up/sign-up.component').then((m) => m.SignUp),
		canActivate: [isNotAuthenticatedGuard],
	},
	{
		path: 'settings',
		loadComponent: () =>
			import('./features/settings/settings.component').then((m) => m.Settings),
			canActivate: [isAuthenticatedGuard, roleGuard],
	},
	{
		path: '**',
		redirectTo: 'home',
	},
];
