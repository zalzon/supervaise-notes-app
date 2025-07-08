import React, { useEffect, useState } from "react";
import "./App.css";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { generateClient } from "aws-amplify/data";
import UserManagement from "./UserManagement";
import TeamNotes from "./TeamNotes";
import ProfileSetup from "./ProfileSetup";
import EditProfile from "./EditProfile";
import PropTypes from "prop-types";

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [currentView, setCurrentView] = useState("notes");
  const [userProfile, setUserProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const { user, signOut } = useAuthenticator();
  const client = generateClient();

  useEffect(() => {
    if (user) {
      checkUserProfile();
      fetchNotes();
    }
  }, [user]);

  const checkUserProfile = async () => {
    try {
      setProfileLoading(true);
      console.log("Checking user profile for:", user?.signInDetails?.loginId);
      const { data: users } = await client.models.User.list();
      console.log("All users found:", users);
      const existingProfile = users.find(
        (u) => u.email === user?.signInDetails?.loginId
      );
      console.log("Existing profile found:", existingProfile);
      setUserProfile(existingProfile);
    } catch (error) {
      console.error("Error checking profile:", error);
      setUserProfile(null);
    } finally {
      setProfileLoading(false);
    }
  };

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

  // Role-based access control
  const canAccessTeamNotes = () => {
    return userProfile?.role === "employee" || userProfile?.role === "admin";
  };

  const canAccessUserManagement = () => {
    return userProfile?.role === "admin";
  };

  // Show profile setup if user doesn't have profile
  if (profileLoading) {
    return (
      <div className="container">
        <div className="loading-text">Loading...</div>
      </div>
    );
  }

  if (!userProfile) {
    return <ProfileSetup onProfileCreated={checkUserProfile} />;
  }

  return (
    <div className="container">
      {currentView === "notes" ? (
        <>
          <h1>{userProfile.name}&apos;s Notes</h1>
          <div className="input-group">
            <input
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Enter your note..."
              onKeyPress={(e) => e.key === "Enter" && addNote()}
            />
            <button onClick={addNote}>Add Note</button>
          </div>
          <ul>
            {notes.length === 0 ? (
              <li className="empty-state">
                No notes yet. Create your first note above!
              </li>
            ) : (
              notes.map((note) => (
                <li key={note.id}>
                  <span className="note-content">{note.content}</span>
                  <button onClick={() => deleteNote(note.id)}>Delete</button>
                </li>
              ))
            )}
          </ul>
          <div className="nav-buttons">
            {canAccessTeamNotes() && (
              <button onClick={() => setCurrentView("team")}>Team Notes</button>
            )}
            {canAccessUserManagement() && (
              <button onClick={() => setCurrentView("users")}>
                User Management
              </button>
            )}
            <button onClick={() => setCurrentView("profile")}>
              Edit Profile
            </button>
            <button className="signout-btn" onClick={signOut}>
              Sign Out
            </button>
          </div>
        </>
      ) : currentView === "team" ? (
        <>
          <h1>Team Notes</h1>
          <TeamNotes />
          <div className="nav-buttons">
            <button onClick={() => setCurrentView("notes")}>
              Personal Notes
            </button>
            {canAccessUserManagement() && (
              <button onClick={() => setCurrentView("users")}>
                User Management
              </button>
            )}
            <button onClick={() => setCurrentView("profile")}>
              Edit Profile
            </button>
            <button className="signout-btn" onClick={signOut}>
              Sign Out
            </button>
          </div>
        </>
      ) : currentView === "users" ? (
        <>
          <h1>User Management</h1>
          <UserManagement />
          <div className="nav-buttons">
            <button onClick={() => setCurrentView("notes")}>
              Personal Notes
            </button>
            {canAccessTeamNotes() && (
              <button onClick={() => setCurrentView("team")}>Team Notes</button>
            )}
            <button onClick={() => setCurrentView("profile")}>
              Edit Profile
            </button>
            <button className="signout-btn" onClick={signOut}>
              Sign Out
            </button>
          </div>
        </>
      ) : currentView === "profile" ? (
        <>
          <h1>Edit Profile</h1>
          <EditProfile
            userProfile={userProfile}
            onProfileUpdated={() => {
              checkUserProfile();
              setCurrentView("notes");
            }}
            onCancel={() => setCurrentView("notes")}
          />
          {/* Navigation buttons hidden on Edit Profile page */}
        </>
      ) : (
        <>
          <h1>User Management</h1>
          <UserManagement />
          <div className="nav-buttons">
            <button onClick={() => setCurrentView("notes")}>
              Personal Notes
            </button>
            <button onClick={() => setCurrentView("team")}>Team Notes</button>
            <button className="signout-btn" onClick={signOut}>
              Sign Out
            </button>
          </div>
        </>
      )}
    </div>
  );
}

App.propTypes = {
  user: PropTypes.object,
  signOut: PropTypes.func.isRequired,
};

export default App;
