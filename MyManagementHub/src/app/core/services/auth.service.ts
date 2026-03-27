import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { DtoInputLogin } from '../../pages/sign-in/dto/dto-input-login';
import { DtoOutputToken } from '../../pages/sign-in/dto/dto-output-token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private static _BASE_URL_API = environment.BASE_URL_API + "authentication";

  private _isConnected = signal(false);
  isConnected = this._isConnected.asReadonly();

  constructor(private _httpClient: HttpClient) {}

  login(dto: DtoInputLogin): Observable<DtoOutputToken> {
    return this._httpClient
      .post<DtoOutputToken>(`${AuthService._BASE_URL_API}/login`, dto, { withCredentials: true })
      .pipe(
        tap(() => this._isConnected.set(true))
      );
  }

  logout(): Observable<any> {
    return this._httpClient
      .post(`${AuthService._BASE_URL_API}/logout`, {}, { withCredentials: true })
      .pipe(
        tap(() => this._isConnected.set(false))
      );
  }

  checkAuth() {
    this._httpClient
      .get(`${AuthService._BASE_URL_API}/IsConnected`, { withCredentials: true })
      .subscribe({
        next: () => this._isConnected.set(true),
        error: () => this._isConnected.set(false),
      });
  }
}