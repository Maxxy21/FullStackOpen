import { useEffect } from "react";

const Notification = ({ message, error, clearMessage }) => {
  useEffect(() => {
    if (message && !error) {
      const timer = setTimeout(() => {
        clearMessage();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [message, error, clearMessage]);

  if (message === null) {
    return null;
  }

  if (error) {
    return <div className="error">{message}</div>;
  }

  return <div className="success">{message}</div>;
};

export default Notification;
