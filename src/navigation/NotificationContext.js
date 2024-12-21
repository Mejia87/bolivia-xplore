import React, { createContext, useState } from 'react';
import Dnotificasiones from '../data/Dnotificasiones';
export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState(Dnotificasiones);
  const [notificationCount, setNotificationCount] = useState(Dnotificasiones.length);

  const handleDelete = (id) => {
    const updatedNotifications = notifications.filter(item => item.id !== id);
    setNotifications(updatedNotifications);
    setNotificationCount(updatedNotifications.length);
  };

  const clearNotifications = () => {
    setNotifications([]);
    setNotificationCount(0);
  };

  return (
    <NotificationContext.Provider value={{ notifications, notificationCount, handleDelete, clearNotifications , setNotificationCount }}>
      {children}
    </NotificationContext.Provider>
  );
};
