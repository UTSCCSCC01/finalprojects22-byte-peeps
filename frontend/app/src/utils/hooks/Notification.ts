import { useState } from "react";

interface UseNotificationProps {
  shown?: boolean,
  message?: string,
  type?: 'success' | 'error' | 'info' | 'warning'
}

export interface NotificationState {
  shown: boolean,
  setShown: (shown: boolean) => void,
  message: string,
  setMessage: (message: string) => void
  type: 'success' | 'error' | 'info' | 'warning',
  setType: (type: 'success' | 'error' | 'info' | 'warning') => void
}

export default function useNotification(props: UseNotificationProps): NotificationState {
  const [shown, setShown] = useState(props.shown ?? false);
  const [message, setMessage] = useState(props.message ?? '');
  const [type, setType] = useState(props.type ?? 'success');

  return {
    shown,
    setShown,
    message,
    setMessage,
    type,
    setType
  };
};