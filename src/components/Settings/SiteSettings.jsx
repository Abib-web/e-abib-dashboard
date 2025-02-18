import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSettings, updateSetting, selectAllSettings } from '../../store/settingsSlice'; // Assurez-vous d'avoir ce slice

const SiteSettings = () => {
  const dispatch = useDispatch();
  const settings = useSelector(selectAllSettings);
  const [editedSettings, setEditedSettings] = useState({});

  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedSettings({ ...editedSettings, [name]: value });
  };

  const handleSave = (id) => {
    dispatch(updateSetting({ id, value: editedSettings[id] }));
  };

  return (
    <div>
      <h2>Paramètres du Site</h2>
      <ul>
        {settings.map((setting) => (
          <li key={setting.id}>
            <label>
              {setting.name}
              <input
                type="text"
                name={setting.id}
                defaultValue={setting.value}
                onChange={handleInputChange}
              />
            </label>
            <button onClick={() => handleSave(setting.id)}>Sauvegarder</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SiteSettings;
