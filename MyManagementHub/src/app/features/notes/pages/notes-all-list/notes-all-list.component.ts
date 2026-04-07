import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { NotesStore } from '../../state/note.store';

@Component({
  selector: 'app-notes-all-list',
  imports: [],
  templateUrl: './notes-all-list.component.html',
  styleUrl: './notes-all-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesAllList implements OnInit {
  readonly store = inject(NotesStore);
  readonly expandedNotes = signal<Set<string>>(new Set());
  
  ngOnInit(): void {
    this.store.loadAllNotes();
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
