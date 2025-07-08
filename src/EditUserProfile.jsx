import React, { useState } from "react";
import { generateClient } from "aws-amplify/data";
import PropTypes from "prop-types";

function EditUserProfile({ user, onSave, onCancel }) {
  const [profile, setProfile] = useState({
    name: user.name || "",
    department: user.department || "",
    role: user.role || "guest",
  });
  const [loading, setLoading] = useState(false);
  const client = generateClient();

  const updateUser = async () => {
    if (!profile.name.trim()) {
      alert("Please enter a name");
      return;
    }

    try {
      setLoading(true);
      await client.models.User.update({
        id: user.id,
        name: profile.name,
        department: profile.department || "General",
        role: profile.role,
      });
      onSave();
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Error updating user profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-user-modal">
      <div className="edit-user-content">
        <h3>Edit User Profile</h3>

        <div className="form-field">
          <label>Name</label>
          <input
            type="text"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            placeholder="User's full name..."
          />
        </div>

        <div className="form-field">
          <label>Department</label>
          <input
            type="text"
            value={profile.department}
            onChange={(e) =>
              setProfile({ ...profile, department: e.target.value })
            }
            placeholder="Department..."
          />
        </div>

        <div className="form-field">
          <label>Role</label>
          <select
            value={profile.role}
            onChange={(e) => setProfile({ ...profile, role: e.target.value })}
          >
            <option value="guest">Guest</option>
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="form-actions">
          <button
            onClick={updateUser}
            disabled={loading}
            className={loading ? "loading" : "save-btn"}
          >
            {loading ? "Updating..." : "Save Changes"}
          </button>
          <button onClick={onCancel} className="cancel-btn" disabled={loading}>
            Cancel
          </button>
        </div>

        <div className="profile-info">
          <small>
            Email: <strong>{user.email}</strong> (cannot be changed)
          </small>
        </div>
      </div>
    </div>
  );
}

EditUserProfile.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    email: PropTypes.string.isRequired,
    department: PropTypes.string,
    role: PropTypes.string,
  }),
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default EditUserProfile;
