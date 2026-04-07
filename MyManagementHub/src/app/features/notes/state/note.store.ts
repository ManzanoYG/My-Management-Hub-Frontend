import { Injectable, inject, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { Note } from '../models/note.model';
import { NotesService } from '../data-access/notes.service';

@Injectable({ providedIn: 'root' })
export class NotesStore {
  readonly notesPinned = signal<Note[]>([]);
  readonly notes = signal<Note[]>([]);
  readonly loading = signal(false);
  readonly pageSize = 10;

  private readonly api = inject(NotesService);

  loadPinnedNotes(): void {
    this.loading.set(true);
    this.api
      .getPinnedNotes(1, this.pageSize)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (data) => this.notesPinned.set(data),
      });
  }

  loadAllNotes(): void {
    this.loading.set(true);
    this.api
      .getAllNotes(1, this.pageSize)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (data) => this.notes.set(data),
      });
  }
}