import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, effect, input, output } from '@angular/core';

@Component({
  selector: 'app-note-editor',
  imports: [],
  templateUrl: './note-editor.component.html',
  styleUrl: './note-editor.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteEditor {
  @ViewChild('editor')
  set editor(editor: ElementRef<HTMLDivElement> | undefined) {
    this.editorElement = editor;
    this.syncEditorContent();
  }

  readonly editorHeader = input('Créer une note');
  readonly titleLabel = input('Titre');
  readonly contentLabel = input('Contenu');
  readonly titlePlaceholder = input('Entrez le titre de votre note...');
  readonly contentPlaceholder = input('Écrivez votre note ici...');
  readonly saveButtonLabel = input('Créer la note');
  readonly titleValue = input('');
  readonly contentValue = input('');
  readonly isSubmitting = input(false);
  readonly errorMessage = input('');

  readonly titleValueChange = output<string>();
  readonly contentValueChange = output<string>();
  readonly saveRequested = output<void>();
  readonly clearRequested = output<void>();

  private editorElement?: ElementRef<HTMLDivElement>;

  constructor() {
    effect(() => {
      this.contentValue();
      this.syncEditorContent();
    });
  }

  applyFormat(command: string, value: string = ''): void {
    document.execCommand(command, false, value);
    this.editorElement?.nativeElement.focus();
  }

  // Styles texte
  toggleBold(): void {
    this.applyFormat('bold');
  }

  toggleItalic(): void {
    this.applyFormat('italic');
  }

  toggleUnderline(): void {
    this.applyFormat('underline');
  }

  // Alignement
  alignLeft(): void {
    this.applyFormat('justifyLeft');
  }

  alignCenter(): void {
    this.applyFormat('justifyCenter');
  }

  alignRight(): void {
    this.applyFormat('justifyRight');
  }

  // Listes
  insertUnorderedList(): void {
    this.applyFormat('insertUnorderedList');
  }

  insertOrderedList(): void {
    this.applyFormat('insertOrderedList');
  }

  // Titres
  insertHeading(level: number): void {
    this.applyFormat(`formatBlock`, `<h${level}>`);
  }

  // Code
  insertCode(): void {
    this.applyFormat('formatBlock', '<pre>');
  }

  // Lien
  insertLink(): void {
    const url = prompt('Entrez l\'URL:');
    if (url) {
      this.applyFormat('createLink', url);
    }
  }

  // Effacer le formatage
  removeFormatting(): void {
    this.applyFormat('removeFormat');
  }

  // Effacer tout
  clearEditor(): void {
    this.clearRequested.emit();
  }

  onTitleInput(event: Event): void {
    this.titleValueChange.emit((event.target as HTMLInputElement).value);
  }

  onContentInput(event: Event): void {
    this.contentValueChange.emit((event.target as HTMLDivElement).innerHTML);
  }

  requestSave(): void {
    this.saveRequested.emit();
  }

  private syncEditorContent(): void {
    const editor = this.editorElement?.nativeElement;

    if (!editor) {
      return;
    }

    const content = this.contentValue();

    if (editor.innerHTML !== content) {
      editor.innerHTML = content;
    }
  }
}
