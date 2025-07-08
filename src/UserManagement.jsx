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
      console.log("Fetching users...");
      const { data: items } = await client.models.User.list();
      console.log("Fetched users:", items);
      setUsers(items || []);
    } catch (error) {
      console.error("Error fetching users:", error);
      alert(
        `Error loading users: ${error.message || "Please refresh the page."}`
      );
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

  const handleDeleteUser = async (userToDelete) => {
    const currentUser = getCurrentUserProfile();

    // Safety checks
    if (!currentUser || currentUser.role !== "admin") {
      alert("Only admins can delete users.");
      return;
    }

    if (userToDelete.id === currentUser.id) {
      alert("You cannot delete your own account.");
      return;
    }

    if (userToDelete.role === "admin") {
      const adminCount = users.filter((u) => u.role === "admin").length;
      if (adminCount <= 1) {
        alert(
          "Cannot delete the last admin user. At least one admin must remain."
        );
        return;
      }
    }

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${userToDelete.name || "this user"}? This action cannot be undone.`
    );

    if (!confirmDelete) return;

    try {
      setLoading(true);
      console.log("Attempting to delete user with ID:", userToDelete.id);

      const deleteResult = await client.models.User.delete({
        id: userToDelete.id,
      });
      console.log("Delete result:", deleteResult);

      // Remove the user from local state immediately
      setUsers((prevUsers) =>
        prevUsers.filter((u) => u.id !== userToDelete.id)
      );

      // Also refresh from server to ensure consistency
      await fetchUsers();

      alert("User deleted successfully.");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert(`Error deleting user: ${error.message || "Please try again."}`);
    } finally {
      setLoading(false);
    }
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
                <div className="user-actions">
                  <button
                    onClick={() => handleEditUser(userItem)}
                    className="edit-user-btn"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteUser(userItem)}
                    className="delete-user-btn"
                    disabled={loading}
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))
        )}
      </ul>
    </>
  );
}

export default UserManagement;
