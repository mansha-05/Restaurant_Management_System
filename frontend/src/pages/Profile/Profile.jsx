import { useEffect, useState } from "react";
import { useAuth } from "../../providers/AuthProvider";
import EditProfileModal from "../../components/EditProfileModal/EditProfileModal";
import { getUserProfile } from "../../services/users";
import "./Profile.css";

function Profile() {
  const { user } = useAuth();
  const userId = user?.userId;

  const [userData, setUserData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      try {
        const data = await getUserProfile(userId);
        setUserData(data);
      } catch (err) {
        console.error("profile error:", err);
      }
    };

    fetchUser();
  }, [userId]);

  if (!userId) return <p>Auth not ready...</p>;
  if (!userData) return <p>Loading profile...</p>;

  return (
    <div className="profile-page">
      <div className="profile-container">

        <h2 className="profile-title1">My Profile</h2>

        {/* CENTERED LAYOUT */}
        <div className="profile-layout-single">

          <div className="card profile-card p-4 text-center">

            <div className="avatar-circle">
              {userData.name?.charAt(0)}
            </div>

            <h4 className="mt-2">{userData.name}</h4>

            <div className="profile-info text-start mt-3">
              <p>📧 {userData.email}</p>
              <p>📞 {userData.phone}</p>
              <p>📍 {userData.city}</p>
            </div>

            <button
              className="btn btn-outline-dark mt-4 w-100"
              onClick={() => setShowModal(true)}
            >
              ✏️ Edit Profile
            </button>

          </div>

        </div>
      </div>

      {showModal && (
        <EditProfileModal
          user={userData}
          setUser={setUserData}
          userId={userId}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default Profile;
