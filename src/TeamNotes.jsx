import React, { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import { useAuthenticator } from "@aws-amplify/ui-react";

function TeamNotes() {
  const [teamNotes, setTeamNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const { user } = useAuthenticator();
  const client = generateClient(); // Moved inside component

  const fetchUsers = async () => {
    try {
      const { data: items } = await client.models.User.list();
      setUsers(items || []);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    }
  };

  const getUserName = (email) => {
    const foundUser = users.find((u) => u.email === email);
    return foundUser?.name || email || "Unknown";
  };

  const fetchTeamNotes = async () => {
    try {
      setLoading(true);
      const { data: items } = await client.models.TeamNote.list();
      setTeamNotes(items || []);
    } catch (error) {
      console.error("Error fetching team notes:", error);
      setTeamNotes([]);
    } finally {
      setLoading(false);
    }
  };

  const addTeamNote = async () => {
    if (!newNote.trim()) return;

    // Get current user's name
    const currentUserName = getUserName(user?.signInDetails?.loginId);

    try {
      await client.models.TeamNote.create({
        title: `Note by ${currentUserName}`,
        content: newNote,
        createdBy: user?.signInDetails?.loginId,
        createdAt: new Date().toISOString(),
      });
      setNewNote("");
      fetchTeamNotes();
    } catch (error) {
      console.error("Error creating team note:", error);
      alert("Error creating team note. Please try again.");
    }
  };

  const deleteTeamNote = async (note) => {
    // Check if current user can delete this note
    if (note.createdBy !== user?.signInDetails?.loginId) {
      alert("You can only delete your own notes.");
      return;
    }

    try {
      await client.models.TeamNote.delete({ id: note.id });
      fetchTeamNotes();
    } catch (error) {
      console.error("Error deleting team note:", error);
      alert("Error deleting note. You may not have permission.");
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchTeamNotes();
  }, []);

  if (loading) {
    return <div className="loading-text">Loading team notes...</div>;
  }

  return (
    <>
      <div className="input-group">
        <input
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Share a note with your team..."
          onKeyPress={(e) => e.key === "Enter" && addTeamNote()}
        />
        <button onClick={addTeamNote}>Share Note</button>
      </div>
      <ul>
        {teamNotes.length === 0 ? (
          <li className="empty-state">
            No team notes yet. Be the first to share!
          </li>
        ) : (
          teamNotes.map((note) => (
            <li key={note.id}>
              <span className="note-content">
                {note.content}
                <small className="note-author">
                  {" "}
                  - by {getUserName(note.createdBy)}
                </small>
              </span>
              {note.createdBy === user?.signInDetails?.loginId && (
                <button onClick={() => deleteTeamNote(note)}>Delete</button>
              )}
            </li>
          ))
        )}
      </ul>
    </>
  );
}

export default TeamNotes;
