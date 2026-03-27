export type AppRole = 0 | 1;

export interface HubAppEntry {
  id: string;
  name: string;
  route: string;
  icon: string;
  description?: string;
  status?: string;
  allowedRoles?: readonly number[];
}

export const APP_REGISTRY: readonly HubAppEntry[] = [
  {
    id: 'notes-app',
    name: 'Notes',
    route: '/notes',
    icon: 'fa-solid fa-pencil',
    description: 'Notes application',
    status: 'Works in Progress',
    allowedRoles: [0, 1],
  },
  {
    id: 'todos-app',
    name: 'Todos List',
    route: '/todos',
    icon: 'fa-solid fa-list',
    description: 'Manage your todos',
    status: 'Works in Progress',
    allowedRoles: [0, 1],
  },
  {
    id: 'file-manager-app',
    name: 'File Manager',
    route: '/file-manager',
    icon: 'fa-solid fa-folder-open',
    description: 'Manage your files',
    status: 'Works in Progress',
    allowedRoles: [0, 1],
  },
  {
    id: 'financial-dashboard-app',
    name: 'Financial Dashboard',
    route: '/financial-dashboard',
    icon: 'fa-solid fa-coins',
    description: 'View your financial reports',
    status: 'Works in Progress',
    allowedRoles: [0, 1],
  },
  {
    id: 'meal-preparation-app',
    name: 'Meal Preparation',
    route: '/meal-preparation',
    icon: 'fa-solid fa-pizza-slice',
    description: 'Plan and prepare your meals',
    status: 'Works in Progress',
    allowedRoles: [0, 1],
  },
  {
    id: 'watch-list-app',
    name: 'Watch List',
    route: '/watch-list',
    icon: 'fa-solid fa-tv',
    description: 'Manage your watch list',
    status: 'Works in Progress',
    allowedRoles: [0, 1],
  }
] as const;
