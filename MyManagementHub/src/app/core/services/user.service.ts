import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { DtoInputSignUp } from '../../pages/sign-up/dto/dto-input-signup';
import { Observable, tap } from 'rxjs';
import { DtoInputPassword } from '../../pages/settings/dto/dto-input-password';
import { DtoOutputPassword } from '../../pages/settings/dto/dto-output-password';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private static _BASE_URL_API = environment.BASE_URL_API + "user";

  private _isConnected = signal(false);
  isConnected = this._isConnected.asReadonly();

  constructor(private _httpClient: HttpClient) {}

  signup(dto: DtoInputSignUp) {
    return this._httpClient
      .post(`${UserService._BASE_URL_API}`, dto, { withCredentials: true }) 
      .pipe(
        tap(() => this._isConnected.set(false))
      );
  }

  changePassword(dto: DtoInputPassword): Observable<DtoOutputPassword> {
    return this._httpClient.put<DtoOutputPassword>(`${UserService._BASE_URL_API}/changePassword`, dto, { withCredentials: true });
  }
}
