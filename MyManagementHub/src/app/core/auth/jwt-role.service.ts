import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class JwtRoleService {
  private http = inject(HttpClient);

  getRole(): Observable<number | null> {
    return this.http
      .get<{ role: string }>('https://localhost:7257/api/authentication/me', {
        withCredentials: true
      })
      .pipe(
        map(res => {
          const value = Number(res.role);
          return value === 0 || value === 1 ? value : null;
        }),
        catchError(() => of(null))
      );
  }

  getUsername(): Observable<string | null> {
    return this.http
      .get<{ username: string }>('https://localhost:7257/api/authentication/me', {
        withCredentials: true
      })
      .pipe(
        map(res => res.username || null),
        catchError(() => of(null))
      );
  }
}