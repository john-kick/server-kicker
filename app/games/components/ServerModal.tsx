import Modal from "@/components/Modal";
import { games } from "@/data/games"; // Import the unified games data
import ServerInfo from "@/types/ServerInfo";
import React, { useState } from "react";

type ServerFormProps = {
  game: string;
  info: ServerInfo;
  onClose: () => void;
  onSave: (updatedInfo: ServerInfo) => void;
};

export default function ServerModal({
  game,
  info,
  onClose,
  onSave
}: ServerFormProps): React.JSX.Element {
  const [isEditing, setIsEditing] = useState(false);
  const [editedInfo, setEditedInfo] = useState(info);
  const [showConfiguration, setShowConfiguration] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setEditedInfo((prev) => ({
      ...prev,
      [name]: name === "maxPlayerCount" ? parseInt(value, 10) : value
    }));
  };

  const handleSave = () => {
    onSave(editedInfo);
    setIsEditing(false);
  };

  const {
    name,
    id,
    description,
    playerCount,
    maxPlayerCount,
    active,
    startTime
  } = editedInfo;

  // Find the selected game data (image, title, and parameters)
  const selectedGameData = games[game];

  if (!selectedGameData) return <p>Loading...</p>;

  const additionalConfiguration = (
    <>
      {Object.entries(selectedGameData.parameters).map(
        ([identifier, sections]) => (
          <section key={identifier}>
            <h3>{sections.identifier}</h3>
            {sections.config.map(({ id, type, title, options }) => (
              <div key={id}>
                <p>
                  {title}: {type}
                </p>
                {options && <p>{options.join(",")}</p>}
              </div>
            ))}
          </section>
        )
      )}
    </>
  );

  return (
    <Modal title={name} secondaryTitle={`(${id})`} onClose={onClose}>
      <div className="info-section">
        <div className="game-info"></div>
        {!isEditing ? (
          <>
            {active ? (
              <>
                <p>Uptime: {Date.now() - startTime}</p>
                <p>
                  Active players: {playerCount}/{maxPlayerCount}
                </p>
              </>
            ) : (
              <p>Max players: {maxPlayerCount}</p>
            )}
            <button
              className="text primary"
              onClick={() => {
                setShowConfiguration((prev) => !prev);
              }}
            >
              {(showConfiguration ? "Hide" : "Show") + " additional params"}
            </button>
            <div className="additional-params">
              {showConfiguration && additionalConfiguration}
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </Modal>
  );
}
