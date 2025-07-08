import React, { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import { useAuthenticator } from "@aws-amplify/ui-react";
import EditUserProfile from "./EditUserProfile";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const { user } = useAuthenticator();
  const client = generateClient(); // Moved inside component

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data: items } = await client.models.User.list();
      setUsers(items || []);
    } catch (error) {
      console.error("Error:", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEditUser = (userToEdit) => {
    setEditingUser(userToEdit);
  };

  const handleSaveUser = () => {
    setEditingUser(null);
    fetchUsers(); // Refresh the list
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  const getCurrentUserProfile = () => {
    return users.find((u) => u.email === user?.signInDetails?.loginId);
  };

  const isCurrentUserAdmin = () => {
    const currentUser = getCurrentUserProfile();
    return currentUser?.role === "admin";
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return <div className="loading-text">Loading users...</div>;
  }

  if (editingUser) {
    return (
      <EditUserProfile
        user={editingUser}
        onSave={handleSaveUser}
        onCancel={handleCancelEdit}
      />
    );
  }

  return (
    <>
      <div className="input-group">
        <div className="users-summary">
          👥 {users.length} Team {users.length === 1 ? "Member" : "Members"}
        </div>
      </div>
      <ul>
        {users.length === 0 ? (
          <li className="empty-state">No users found</li>
        ) : (
          users.map((userItem) => (
            <li key={userItem.id} className="user-list-item">
              <div className="user-main-info">
                <span className="user-display-name">
                  {userItem.name || "Unnamed User"}
                </span>
                <span className="user-details">
                  {userItem.email || "No email"} •{" "}
                  {userItem.department || "No department"} •{" "}
                  {userItem.role || "guest"}
                </span>
              </div>
              {isCurrentUserAdmin() && (
                <button
                  onClick={() => handleEditUser(userItem)}
                  className="edit-user-btn"
                >
                  Edit
                </button>
              )}
            </li>
          ))
        )}
      </ul>
    </>
  );
}

export default UserManagement;
