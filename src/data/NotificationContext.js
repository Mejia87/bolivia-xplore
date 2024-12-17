// NotificationContext.js
import React, { createContext, useState } from 'react';
import Dnotificasiones from './Dnotificasiones';

// Crear el contexto
//export const NotificationContext = createContext();
const NotificationContext = createContext();
// Proveedor del contexto
export const NotificationProvider = ({ children }) => {
  const [notificationCount, setNotificationCount] = useState(Dnotificasiones.length);

  return (
    <NotificationContext.Provider value={{ notificationCount, setNotificationCount }}>
      {children}
    </NotificationContext.Provider>
  );
};
export default NotificationContext;
