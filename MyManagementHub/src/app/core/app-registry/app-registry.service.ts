import { Injectable } from '@angular/core';

import { APP_REGISTRY, type AppRole, type HubAppEntry } from './app-registry';

@Injectable({ providedIn: 'root' })
export class AppRegistryService {
  getAll(): readonly HubAppEntry[] {
    return APP_REGISTRY;
  }

  getAccessibleApps(userRole: number | null): readonly HubAppEntry[] {
    return APP_REGISTRY.filter((app) => {
      if (!app.allowedRoles || app.allowedRoles.length === 0) {
        return true;
      }

      if (userRole === null) {
        return false;
      }

      return app.allowedRoles.includes(userRole);
    });
  }

  findByRoute(route: string): HubAppEntry | undefined {
    return APP_REGISTRY.find((app) => app.route === route);
  }
}
