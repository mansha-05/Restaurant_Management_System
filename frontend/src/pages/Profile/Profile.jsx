import { useEffect, useState } from "react";
import { useAuth } from "../../providers/AuthProvider";
import EditProfileModal from "../../components/EditProfileModal/EditProfileModal";
import { getUserProfile } from "../../services/users";
import "./Profile.css";

function Profile() {
  // ✅ correct auth extraction
  const { user } = useAuth();
  const userId = user?.userId;

  // ✅ rename to avoid conflict with auth user
  const [userData, setUserData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    console.log("userId from auth:", userId);

    if (!userId) return;

    const fetchUser = async () => {
      try {
        const data = await getUserProfile(userId);
        console.log("profile response:", data);
        setUserData(data);
      } catch (err) {
        console.error("profile error:", err);
      }
    };

    fetchUser();
  }, [userId]);

  // ✅ safe guards
  if (!userId) return <p>Auth not ready...</p>;
  if (!userData) return <p>Loading profile...</p>;

  return (
    <div className="profile-page">
      <div className="profile-container">

        <h2 className="profile-title1">My Profile</h2>

        <div className="profile-layout">

          <div className="profile-left">
            <div className="card profile-card p-4 text-center">

              <div className="avatar-circle">
                {userData.name?.charAt(0)}
              </div>

              <h4>{userData.name}</h4>

              <div className="profile-info text-start">
                <p>📧 {userData.email}</p>
                <p>📞 {userData.phone}</p>
                <p>📍 {userData.city}</p>
              </div>

              <button
                className="btn btn-outline-dark mt-3 w-100"
                onClick={() => setShowModal(true)}
              >
                ✏️ Edit Profile
              </button>

            </div>
          </div>

          {/* ✅ YOUR RIGHT SIDE SECTION — untouched */}
          <div className="profile-right">

            <div className="stats-row">
              <div className="stat-card orange">
                <p>Total Orders</p>
                <h3>1</h3>
              </div>

              <div className="stat-card red">
                <p>Total Spent</p>
                <h3>$40</h3>
              </div>

              <div className="stat-card yellow">
                <p>Reservations</p>
                <h3>0</h3>
              </div>
            </div>

            <div className="card section-card mb-4 p-4">
              <h5 className="section-title">Recent Orders</h5>

              <div className="order-item">
                <div>
                  <strong>Order #ORD-001</strong>
                  <p className="mb-0 text-muted">11/16/2025</p>
                </div>

                <div className="text-end">
                  <p className="price">$39.97</p>
                  <span className="badge status-badge">preparing</span>
                </div>
              </div>
            </div>

            <div className="card section-card p-4 text-center">
              <h5 className="section-title text-start">
                Upcoming Reservations
              </h5>
              <p className="text-muted mt-3">
                No upcoming reservations
              </p>
            </div>

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