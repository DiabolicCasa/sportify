import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { PREFERRED_SPORTS, PREFERRED_TEAM, USER } from "../../config/constants";
import ChangePassword from "./ChangePassword";
import ChangePreferences from "./ChangePreferences";
import {
  useSportDispatch,
  useSportState,
} from "../../context/sports/SportContext";
import { useTeamDispatch, useTeamState } from "../../context/teams/TeamContext";
import { fetchSports } from "../../context/sports/actions";
import { fetchTeams } from "../../context/teams/actions";

type User = {
  id: number;
  name: string;
  email: string;
};

const ProfileHome: React.FC = () => {
  const userData = localStorage.getItem(USER);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPreferenceModalOpen, setisPreferenceModalOpen] = useState(false);
  const user: User | null = userData ? JSON.parse(userData) : null;

  const preferredTeams: string[] = JSON.parse(
    localStorage.getItem(PREFERRED_TEAM) || "[]"
  );

  const preferred_sports: string[] = JSON.parse(
    localStorage.getItem(PREFERRED_SPORTS) || "[]"
  );

  const { sports } = useSportState();
  const { teams } = useTeamState();

  const sportDispatch = useSportDispatch();
  const teamDispatch = useTeamDispatch();

  const fetchData = async () => {
    await fetchSports(sportDispatch);
    await fetchTeams(teamDispatch);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!user) {
    return null; // Or display a loading indicator or an error message
  }
  // State to control the modal visibility

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handlePreferenceOpenModal = () => {
    setisPreferenceModalOpen(!isPreferenceModalOpen);
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
      <div className="min-h-screen bg-white-100 flex justify-center items-center">
        <div className="container mx-auto p-4 md:w-3/4 lg:w-1/2">
          <div className="bg-white border shadow-xl rounded-md p-4">
            <div className="flex justify-between flex-col md:flex-row md:items-center">
              <h1 className="text-xl font-bold mb-2 md:mb-0">User Details</h1>
              <div className="flex flex-col md:flex-row md:items-center">
                <button
                  className="bg-green-500 p-2 mr-2 text-white font-normal text-sm rounded-md shadow-md mb-2 md:mb-0"
                  onClick={handlePreferenceOpenModal}
                >
                  Change Preferences
                </button>
                <button
                  className="bg-red-500 p-2 text-white font-normal text-sm rounded-md shadow-md"
                  onClick={handleOpenModal}
                >
                  Change Password
                </button>
              </div>
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
                {preferred_sports && (
                  <div className="mb-2">
                    <span className="font-bold">Sports:</span>{" "}
                    <div className="flex flex-wrap">
                      {preferred_sports.map((item) => (
                        <span
                          key={item}
                          className="inline-block bg-gray-200 rounded-full px-3 py-1 border shadow-md text-sm font-semibold text-gray-700 mr-2 mb-2"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {preferredTeams && (
                  <div>
                    <span className="font-bold">Teams:</span>{" "}
                    <div className="flex flex-wrap">
                      {preferredTeams.map((item) => (
                        <span
                          key={item}
                          className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ChangePassword isOpen={isModalOpen} onClose={handleCloseModal} />
      <ChangePreferences
        sports={sports}
        teams={teams}
        isPreferenceModalOpen={isPreferenceModalOpen}
        closePreferenceModal={handlePreferenceOpenModal}
      />
    </>
  );
};

export default ProfileHome;