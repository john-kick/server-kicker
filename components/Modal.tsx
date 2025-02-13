import React from "react";

type ModalProps = {
  title: string;
  secondaryTitle?: string;
  children: React.ReactNode;
  onClose: () => void;
};

export default function Modal({
  title,
  secondaryTitle,
  children,
  onClose
}: ModalProps) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="title">{title}</h2>
          {secondaryTitle && (
            <p className="secondary-title">{secondaryTitle}</p>
          )}
        </div>
        <div className="modal-content">{children}</div>
        <div className="modal-footer">
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
