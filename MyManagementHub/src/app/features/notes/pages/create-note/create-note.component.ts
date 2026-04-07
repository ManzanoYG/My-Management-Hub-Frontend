import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { NotesService } from '../../data-access/notes.service';
import { Note } from '../../models/note.model';
import { NoteEditor } from '../note-editor/note-editor.component';

@Component({
  selector: 'app-create-note',
  imports: [NoteEditor],
  templateUrl: './create-note.component.html',
  styleUrl: './create-note.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateNote {
  private readonly notesService = inject(NotesService);
  private readonly router = inject(Router);

  readonly editorHeader = 'Créer une note';
  readonly saveButtonLabel = 'Créer la note';
  readonly title = signal('');
  readonly content = signal('');
  readonly isSubmitting = signal(false);
  readonly errorMessage = signal('');

  onTitleChange(value: string): void {
    this.title.set(value);
  }

  onContentChange(value: string): void {
    this.content.set(value);
  }

  async saveNote(): Promise<void> {
    if (!this.title().trim() || !this.content().trim()) {
      this.errorMessage.set('Veuillez remplir le titre et le contenu');
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set('');

    const note: Note = {
      id: Date.now().toString(),
      title: this.title().trim(),
      content: this.content(),
      style: this.extractStyles(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    try {
      await firstValueFrom(this.notesService.createNote(note));
      this.resetForm();
      alert('Note créée avec succès !');
      await this.router.navigate(['/notes']);
    } catch (error) {
      this.errorMessage.set('Erreur lors de la sauvegarde');
      console.error(error);
    } finally {
      this.isSubmitting.set(false);
    }
  }

  resetForm(): void {
    this.title.set('');
    this.content.set('');
    this.errorMessage.set('');
  }

  private extractStyles(): string {
    return JSON.stringify({
      fontFamily: 'Arial, sans-serif',
      fontSize: '16px',
      lineHeight: '1.5',
    });
  }
}
