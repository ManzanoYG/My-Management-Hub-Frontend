import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { NotesStore } from '../../state/note.store';

@Component({
  selector: 'app-notes-pinned-list',
  imports: [],
  templateUrl: './notes-pinned-list.component.html',
  styleUrl: './notes-pinned-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesPinnedList implements OnInit {
  readonly store = inject(NotesStore);
  readonly expandedNotes = signal<Set<string>>(new Set());
  
  ngOnInit(): void {
    this.store.loadPinnedNotes();
  }

  toggleExpand(id: string): void {
    this.expandedNotes.update((set) => {
      const newSet = new Set(set);

      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }

      return newSet;
    });
  }
}
