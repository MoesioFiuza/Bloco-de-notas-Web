interface Note {
    id: number;
    content: string;
}

export class Notepad {
    private notes: Note[] = [];
    private noteInput: HTMLInputElement;
    private notesList: HTMLElement;

    constructor() {
        this.noteInput = document.getElementById('noteInput') as HTMLInputElement;
        this.notesList = document.getElementById('notesList')!;
    }

    public init() {
        this.noteInput.addEventListener('keydown', (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                this.addNote();
            }
        });
        this.renderNotes();
    }

    private addNote() {
        const noteContent = this.noteInput.value.trim();
        if (noteContent) {
            const newNote: Note = {
                id: Date.now(),
                content: noteContent,
            };
            this.notes.push(newNote);
            this.noteInput.value = '';
            this.renderNotes();
        }
    }

    private deleteNote(id: number) {
        this.notes = this.notes.filter(note => note.id !== id);
        this.renderNotes();
    }

    private renderNotes() {
        this.notesList.innerHTML = '';
        this.notes.forEach(note => {
            const li = document.createElement('li');
            li.innerHTML = `${note.content} <button data-id="${note.id}">Delete</button>`;
            this.notesList.appendChild(li);
            li.querySelector('button')!.addEventListener('click', () => {
                this.deleteNote(note.id);
            });
        });
    }
}
