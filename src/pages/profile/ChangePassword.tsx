import React, { useState } from "react";
import { API_ENDPOINT, AUTH_TOKEN } from "../../config/constants";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChangePassword: React.FC<ChangePasswordModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Current Password:", currentPassword);
    console.log("New Password:", newPassword);

    const authTokenString = localStorage.getItem(AUTH_TOKEN);
    if (!authTokenString) {
      console.error("Authorization token is missing.");
      return;
    }

    const authToken = JSON.parse(authTokenString);
    console.log(authToken);

    try {
      const response = await fetch(`${API_ENDPOINT}/user/password`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
        body: JSON.stringify({
          current_password: currentPassword,
          new_password: newPassword,
        }),
      });

      const res = await response.json();
      console.log(res);
      setMsg(res['message']);
      if (!response.ok) {
        throw new Error("Failed to update password");
      }

      
      onClose();
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed bg-black bg-opacity-25 inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-1/3 p-6">
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="">
            <label
              htmlFor="currentPassword"
              className="sr-only block font-bold "
            >
              Current Password
            </label>
            <input
              type="password"
              id="currentPassword"
              value={currentPassword}
              placeholder="Current Password"
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="border border rounded-t-lg focus:border-primarygreen p-2 w-full focus:outline-none  focus:primarygreen"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="newPassword" className="sr-only block font-bold ">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border border rounded-b-lg focus:border-primarygreen p-2 w-full focus:outline-none  focus:primarygreen"
            />
          </div>
          <div className="w-full flex justify-center">
          <span className="text-red-500 fext-sm">{msg}</span>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 rounded-md px-4 py-2 mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-primarygreen text-white rounded-md px-4 py-2"
            >
              Change Password
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
