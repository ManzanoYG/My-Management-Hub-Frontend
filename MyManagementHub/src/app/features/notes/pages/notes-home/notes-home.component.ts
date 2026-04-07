import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NotesAllList } from '../notes-all-list/notes-all-list.component';
import { NotesPinnedList } from '../notes-pinned-list/notes-pinned-list.component';

@Component({
  selector: 'app-notes-home',
  imports: [NotesPinnedList, NotesAllList],
  templateUrl: './notes-home.component.html',
  styleUrl: './notes-home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesHome {
  private readonly router = inject(Router);

  createNote(): void {
    this.router.navigate(['/notes/create']);
  }
}
