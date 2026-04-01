import { Routes } from '@angular/router';
import { roleGuard } from '../../core/guards/role.guard';
import { isAuthenticatedGuard } from '../../core/guards/authenticated.guard';
import { isNotAuthenticatedGuard } from '../../core/guards/not-authenticated.guard';

export const NotesRouting: Routes = [
  {
		path: '',
		loadComponent: () => import('./pages/notes-home/notes-home.component').then((m) => m.NotesHome),
    canActivate: [isAuthenticatedGuard, roleGuard]
	}
];

