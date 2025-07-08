import React, { useState } from "react";
import { generateClient } from "aws-amplify/data";
import { useAuthenticator } from "@aws-amplify/ui-react";
import PropTypes from "prop-types";

function EditProfile({ userProfile, onProfileUpdated, onCancel }) {
  const [profile, setProfile] = useState({
    name: userProfile?.name || "",
    department: userProfile?.department || "",
    role: userProfile?.role || "employee",
  });
  const [loading, setLoading] = useState(false);
  const { user } = useAuthenticator();
  const client = generateClient();

  const updateProfile = async () => {
    if (!profile.name.trim()) {
      alert("Please enter your name");
      return;
    }

    try {
      setLoading(true);
      await client.models.User.update({
        id: userProfile.id,
        name: profile.name,
        department: profile.department || "General",
        role: profile.role,
      });
      onProfileUpdated();
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="profile-edit-form">
        <div className="form-field">
          <label>Name</label>
          <input
            type="text"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            placeholder="Your full name..."
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
            placeholder="Department (optional)..."
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
            onClick={updateProfile}
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
            Email: <strong>{user?.signInDetails?.loginId}</strong> (cannot be
            changed)
          </small>
        </div>
      </div>
    </>
  );
}

EditProfile.propTypes = {
  userProfile: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    department: PropTypes.string,
    role: PropTypes.string,
  }),
  onProfileUpdated: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default EditProfile;
