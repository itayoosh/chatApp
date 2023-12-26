import React, { useState } from 'react';

const ContactSavePopup = ({ phone, onSave, onClose }) => {
  const [localContactName, setLocalContactName] = useState('');

  const handleSave = () => {
    onSave(localContactName);
  };

  return (
    <div className="contact-save-popup">
      <h3>Save {phone} as Contact</h3>
      <label>Contact Name:</label>
      <input
        type="text"
        placeholder="Enter contact name"
        value={localContactName}
        onChange={(e) => setLocalContactName(e.target.value)}
      />
      <div className="button-group">
        <button className="btn save-btn" onClick={handleSave}>
          Save
        </button>
        <button className="btn cancel-btn" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ContactSavePopup;
