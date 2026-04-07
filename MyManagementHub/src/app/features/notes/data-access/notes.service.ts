import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Note } from '../models/note.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private static readonly BASE_URL_API = environment.BASE_URL_API + 'note';
  private readonly httpClient = inject(HttpClient);

  getPinnedNotes(pageNumber: number, pageSize: number): Observable<Note[]> {
    return this.httpClient.get<Note[]>(`${NotesService.BASE_URL_API}/pinned?pageNumber=${pageNumber}&pageSize=${pageSize}`, { withCredentials: true });
  }

  getAllNotes(pageNumber: number, pageSize: number): Observable<Note[]> {
    return this.httpClient.get<Note[]>(`${NotesService.BASE_URL_API}?pageNumber=${pageNumber}&pageSize=${pageSize}`, { withCredentials: true });
  }

  createNote(note: Note): Observable<Note> {
    return this.httpClient.post<Note>(NotesService.BASE_URL_API, note, { withCredentials: true });
  }

  updateNote(id: string, note: Note): Observable<Note> {
    return this.httpClient.put<Note>(`${NotesService.BASE_URL_API}/${id}`, note, { withCredentials: true });
  }

  deleteNote(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${NotesService.BASE_URL_API}/${id}`, { withCredentials: true });
  }

  getNoteById(id: string): Observable<Note> {
    return this.httpClient.get<Note>(`${NotesService.BASE_URL_API}/${id}`, { withCredentials: true });
  }
}
