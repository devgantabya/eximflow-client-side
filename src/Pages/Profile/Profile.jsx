import React, { use } from "react";
import { AuthContext } from "./../../contexts/AuthContext/AuthContext";

const Profile = () => {
  const { user } = use(AuthContext);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-emerald-500 px-6 py-8 text-white">
          <h2 className="text-2xl font-bold">My Profile</h2>
          <p className="text-sm opacity-90">Manage your account information</p>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center gap-4">
            <img
              src={
                user?.photoURL ||
                "https://i.ibb.co.com/fGMNLM9Z/Sample-User-Icon.png"
              }
              alt="User"
              className="w-32 h-32 rounded-full border-4 border-emerald-500 object-cover"
            />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Profile Picture
            </span>
          </div>

          <div className="md:col-span-2 space-y-4">
            <InfoRow label="Full Name" value={user?.displayName || "N/A"} />
            <InfoRow label="Email Address" value={user?.email || "N/A"} />
            <InfoRow
              label="Account Created"
              value={
                user?.metadata?.creationTime
                  ? new Date(user.metadata.creationTime).toDateString()
                  : "N/A"
              }
            />
            <InfoRow
              label="Last Login"
              value={
                user?.metadata?.lastSignInTime
                  ? new Date(user.metadata.lastSignInTime).toDateString()
                  : "N/A"
              }
            />
          </div>
        </div>

        <div className="px-6 py-4 border-t dark:border-gray-700 text-right">
          <button
            disabled
            className="px-6 py-2 rounded-full bg-emerald-500 text-white text-sm font-semibold opacity-70 cursor-not-allowed"
          >
            Edit Profile (Coming Soon)
          </button>
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ label, value }) => (
  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
    <span className="w-40 text-sm font-medium text-gray-600 dark:text-gray-400">
      {label}
    </span>
    <span className="text-gray-800 dark:text-gray-100 font-semibold">
      {value}
    </span>
  </div>
);

export default Profile;
