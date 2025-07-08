import React, { useState } from "react";
import { generateClient } from "aws-amplify/data";
import { useAuthenticator } from "@aws-amplify/ui-react";
import PropTypes from "prop-types";

function ProfileSetup({ onProfileCreated }) {
  const [profile, setProfile] = useState({
    name: "",
    department: "",
    role: "guest",
  });
  const [loading, setLoading] = useState(false);
  const { user } = useAuthenticator();
  const client = generateClient();

  const createProfile = async () => {
    if (!profile.name.trim()) {
      alert("Please enter your name");
      return;
    }

    try {
      setLoading(true);
      await client.models.User.create({
        email: user?.signInDetails?.loginId,
        name: profile.name,
        department: profile.department || "General",
        role: profile.role,
        isActive: true,
        createdAt: new Date().toISOString(),
      });
      onProfileCreated();
    } catch (error) {
      console.error("Error creating profile:", error);
      alert("Error creating profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="profile-setup-form">
        <h1>Welcome! Let&apos;s set up your profile</h1>
        
        <div className="profile-info">
          <small>
            Email: <strong>{user?.signInDetails?.loginId}</strong>
          </small>
        </div>

        <div className="form-field">
          <label>Display Name</label>
          <input
            type="text"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            placeholder="Enter your display name..."
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
            onClick={createProfile}
            disabled={loading}
            className={loading ? "loading" : "save-btn"}
          >
            {loading ? "Creating Profile..." : "Create Profile"}
          </button>
        </div>
      </div>
    </div>
  );
}

ProfileSetup.propTypes = {
  onProfileCreated: PropTypes.func.isRequired,
};

export default ProfileSetup;
