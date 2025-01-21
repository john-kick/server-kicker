import Modal from "@/components/Modal";
import { games } from "@/data/games"; // Import the unified games data
import ServerInfo from "@/types/ServerInfo";
import React, { useState } from "react";

type ServerFormProps = {
  info: ServerInfo;
  onClose: () => void;
  onSave: (updatedInfo: ServerInfo) => void;
};

export default function ServerModal({
  info,
  onClose,
  onSave
}: ServerFormProps): React.JSX.Element {
  const [isEditing, setIsEditing] = useState(false);
  const [editedInfo, setEditedInfo] = useState(info);
  const [showAdditionalParams, setShowAdditionalParams] = useState(false);
  const [selectedGame, setSelectedGame] = useState("minecraft"); // Set initial game type

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
  const selectedGameData = games.find((game) => game.name === selectedGame);

  return (
    <Modal title={isEditing ? "Edit Server" : name} onClose={onClose}>
      <div className="info-section">
        {/* Show the selected game image and title */}
        {selectedGameData && (
          <div className="game-info">
            <img
              src={selectedGameData.image.src}
              alt={selectedGameData.title}
            />
            <h3>{selectedGameData.title}</h3>
          </div>
        )}

        {!isEditing ? (
          <>
            {/* Show non-editable server info */}
            <p>
              <strong>ID:</strong> {id}
            </p>
            <p>
              <strong>Description:</strong> {description}
            </p>
            <p>
              <strong>Player count:</strong> {playerCount}/{maxPlayerCount}
            </p>
            <p>
              <strong>Status:</strong> {active ? "Online" : "Offline"}
            </p>
            <button className="edit-button" onClick={() => setIsEditing(true)}>
              Edit
            </button>

            {/* Toggle to show additional parameters */}
            <button
              type="button"
              className="toggle-params-btn"
              onClick={() => setShowAdditionalParams((prev) => !prev)}
            >
              {showAdditionalParams
                ? "Hide Additional Parameters"
                : "Show Additional Parameters"}
            </button>

            {showAdditionalParams && (
              <div className="additional-params">
                {/* Render game-specific parameters */}
                {selectedGameData?.parameters.map((param) => (
                  <p key={param.key}>
                    <strong>{param.name}:</strong>{" "}
                    {param.defaultValue || "No value"}
                  </p>
                ))}
              </div>
            )}
          </>
        ) : (
          <form className="edit-form" onSubmit={(e) => e.preventDefault()}>
            {/* Editable fields */}
            <label>
              <strong>Name:</strong>
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleInputChange}
              />
            </label>
            <label>
              <strong>Description:</strong>
              <textarea
                name="description"
                value={description}
                onChange={handleInputChange}
              />
            </label>
            <label>
              <strong>Max Players:</strong>
              <input
                type="number"
                name="maxPlayerCount"
                value={maxPlayerCount}
                onChange={handleInputChange}
              />
            </label>

            {/* Render editable game-specific parameters */}
            {selectedGameData?.parameters.map((param) => (
              <div key={param.key}>
                <label>
                  <strong>{param.name}:</strong>
                  {param.type === "select" ? (
                    <select
                      name={param.key}
                      onChange={handleInputChange}
                      value={param.defaultValue || ""}
                    >
                      {param.options?.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : param.type === "number" || param.type === "text" ? (
                    <input
                      type={param.type}
                      name={param.key}
                      value={param.defaultValue || ""}
                      placeholder={param.placeholder}
                      onChange={handleInputChange}
                    />
                  ) : null}
                </label>
              </div>
            ))}

            <div className="form-actions">
              <button type="button" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
              <button type="button" onClick={handleSave}>
                Save Changes
              </button>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
}
