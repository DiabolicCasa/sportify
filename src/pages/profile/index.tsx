import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { USER } from "../../config/constants";
import ChangePassword from "./ChangePassword";

type User = {
  id: number;
  name: string;
  email: string;
  preferences: {
    sports?: string[];
    teams?: string[];
  };
};

const  ProfileHome : React.FC = () => {
  const userData = localStorage.getItem(USER);
  
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const user: User | null = userData ? JSON.parse(userData) : null;

  if (!user) {
    return null; // Or display a loading indicator or an error message
  }
// State to control the modal visibility

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (!user) {
    return null; // Or display a loading indicator or an error message
  }

  return (
    <>
      <Navbar />
      <div className="w-1/2 mx-auto h-screen bg-white-100">
        <div className="container  mx-auto p-4">
          <div className="bg-white border shadow-xl rounded-md p-4">
            <div className="flex justify-between ">
              <h1 className="text-xl font-bold mb-2">User Details</h1>
              <button className="bg-blue-500 p-2 mr-10 text-white font-semibold rounded-md shadow-md" onClick={handleOpenModal}>
                Change Password
              </button>
            </div>
            <div className="mb-2">
              <span className="font-bold">ID:</span> {user.id}
            </div>
            <div className="mb-2">
              <span className="font-bold">Name:</span> {user.name}
            </div>
            <div className="mb-2">
              <span className="font-bold">Email:</span> {user.email}
            </div>
            <div>
              <span className="font-bold">Preferences:</span>
              <div className="ml-4">
                {/* {user.preferences.sports && (
                  <div className="mb-2">
                    <span className="font-bold">Sports:</span>{" "}
                    {user.preferences.sports.join(", ")}
                  </div>
                )} */}
                {user.preferences?.teams && (
                  <div>
                    <span className="font-bold">Teams:</span>{" "}
                    {user.preferences.teams.join(", ")}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ChangePassword isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
}

export default ProfileHome;
