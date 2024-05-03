import React, { useEffect, useState } from "react";
import { API_ENDPOINT, AUTH_TOKEN, PREFERRED_SPORTS, PREFERRED_TEAM } from "../../config/constants";
import { Sport } from "../../context/sports/types";
import { Teams } from "../../context/teams/types";

interface ChangePreferencesProps {
  isPreferenceModalOpen: boolean;
  closePreferenceModal: () => void;
  sports: Sport[];
  teams: Teams;
}

const ChangePreferences: React.FC<ChangePreferencesProps> = ({
  isPreferenceModalOpen,
  closePreferenceModal,
  sports,
  teams,
}) => {
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const [selectedSports, setSelectedSports] = useState<string[]>([]);

  useEffect(() => {
    const preferredTeams: string[] = JSON.parse(localStorage.getItem(PREFERRED_TEAM) || "[]");
    const preferredSports: string[] = JSON.parse(localStorage.getItem(PREFERRED_SPORTS) || "[]");

    setSelectedSports(preferredSports);
    setSelectedTeams(preferredTeams);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const authTokenString = localStorage.getItem(AUTH_TOKEN);
    if (!authTokenString) {
      console.error("Authorization token is missing.");
      return;
    }

    const authToken = JSON.parse(authTokenString);

    try {
      const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
        body: JSON.stringify({
          preferences: {
            sports: selectedSports,
            teams: selectedTeams,
          },
        }),
      });

      const res = await response.json();
      console.log(res);

      if (!response.ok) {
        throw new Error("Failed to update preferences");
      }

      localStorage.setItem(PREFERRED_SPORTS, JSON.stringify(selectedSports));
      localStorage.setItem(PREFERRED_TEAM, JSON.stringify(selectedTeams));
      closePreferenceModal();
    } catch (error) {
      console.error("Error updating preferences:", error);
    }
  };

  if (!isPreferenceModalOpen) {
    return null;
  }

  const toggleTeam = (team: string) => {
    setSelectedTeams((prevTeams) => {
      if (prevTeams.includes(team)) {
        return prevTeams.filter((item) => item !== team);
      } else {
        return [...prevTeams, team];
      }
    });
  };

  const toggleSport = (sport: string) => {
    setSelectedSports((prevSports) => {
      if (prevSports.includes(sport)) {
        return prevSports.filter((item) => item !== sport);
      } else {
        return [...prevSports, sport];
      }
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-25">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-4xl w-full md:w-3/4">
        <h2 className="text-xl font-semibold mb-4">Change Preferences</h2>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/4 border p-2 rounded-md m-2">
              <h3 className="text-lg font-semibold mb-2">Sports</h3>
              <div className="flex flex-col justify-between h-48 md:h-auto overflow-y-auto p-2">
                {sports.map((item) => (
                  <div key={item.id} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id={`sport-${item.id}`}
                      value={item.name}
                      checked={selectedSports.includes(item.name)}
                      onChange={() => toggleSport(item.name)}
                      className="appearance-none w-4 h-4 border border-gray-400 rounded-lg checked:bg-green-500 checked:border-transparent focus:outline-none"
                    />
                    <label htmlFor={`sport-${item.id}`} className="ml-2">
                      {item.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full md:w-3/4 border m-2 rounded-md p-2">
              <h3 className="text-lg font-semibold mb-2">Teams</h3>
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 overflow-y-auto h-48 md:h-auto p-2">
                {teams.map((item) => (
                  <div key={item.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`team-${item.id}`}
                      value={item.name}
                      className="appearance-none w-4 h-4 border border-gray-400 rounded-lg checked:bg-green-500 checked:border-transparent focus:outline-none"
                      checked={selectedTeams.includes(item.name)}
                      onChange={() => toggleTeam(item.name)}
                    />
                    <label htmlFor={`team-${item.id}`} className="ml-2">
                      {item.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-end p-2 mt-4">
            <button
              onClick={closePreferenceModal}
              className="bg-grey-800 mr-4 text-gray-900 hover:bg-yellow-500 hover:text-white px-4 py-2 rounded-md border"
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-green-700 mr-4 hover:bg-green-800 text-white px-4 py-2 rounded-md shadow-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePreferences;