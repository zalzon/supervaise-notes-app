import React, { useEffect, useState } from "react";
import "./App.css";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { generateClient } from "aws-amplify/data";

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const { user, signOut } = useAuthenticator();
  const client = generateClient();

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const { data: items } = await client.models.Note.list();
    setNotes(items);
  };

  const addNote = async () => {
    if (!newNote.trim()) return;

    await client.models.Note.create({ content: newNote });
    setNewNote("");
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await client.models.Note.delete({ id });
    fetchNotes();
  };

  return (
    <div className="container">
      <h1>{user?.signInDetails?.loginId}'s Notes</h1>
      <div className="input-group">
        <input
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Enter your note..."
        />
        <button onClick={addNote}>Add Note</button>
      </div>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            {note.content}
            <button onClick={() => deleteNote(note.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button className="signout-btn" onClick={signOut}>
        Sign Out
      </button>
    </div>
  );
}

export default App;
