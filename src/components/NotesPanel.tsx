import type { Note } from '../domain/note'

interface Props {
  notes: Note[]
}

export default function NotesPanel({ notes }: Props) {
  return (
    <div className="card">
      <h2 className="card-title">Notes</h2>
      {notes.length === 0 ? (
        <p className="empty-state">No notes recorded.</p>
      ) : (
        <ul className="card-list">
          {notes.map((note) => (
            <li key={note.id} className="note-item">
              <span className="note-timestamp">{note.timestamp}</span>
              <p className="note-text">{note.text}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
