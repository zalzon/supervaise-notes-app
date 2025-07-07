import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { useAuthenticator } from "@aws-amplify/ui-react";

// API endpoint for notes backend
const API =
  "https://jrdzozmeva.execute-api.ap-southeast-1.amazonaws.com/dev/notes";

/**
 * Main App component for Supervaise Notes.
 * Handles fetching, adding, and deleting notes via backend API.
 */
function App() {
  // State for notes list and new note input
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const { user, signOut } = useAuthenticator();

  // Fetch notes from backend on component mount
  useEffect(() => {
    axios.get(API).then((res) => setNotes(res.data));
  }, []);

  /**
   * Add a new note by sending a POST request to the backend.
   */
  const addNote = async () => {
    const res = await axios.post(API, { content: newNote });
    setNotes([...notes, res.data]);
    setNewNote("");
  };

  /**
   * Delete a note by ID by sending a DELETE request to the backend.
   * @param {string} id - The ID of the note to delete.
   */
  const deleteNote = async (id) => {
    await axios.delete(`${API}/${id}`);
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div className="container">
      <h1>{user?.signInDetails?.loginId}'s Supervaise Notes</h1>
      <div className="input-group">
        <input value={newNote} onChange={(e) => setNewNote(e.target.value)} />
        <button onClick={addNote}>Add</button>
      </div>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            {note.content}{" "}
            <button onClick={() => deleteNote(note.id)}>X</button>
          </li>
        ))}
      </ul>
      <button className="signout-btn" onClick={signOut}>
        Sign out
      </button>
    </div>
  );
}

export default App;
