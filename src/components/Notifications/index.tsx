import React, { FC, useEffect, useState } from 'react';
import styled from "styled-components/macro";

type NotificationData = { timeout?: number; msg?: string; check?: boolean};

type SendNotificationData = (msg: string) => void;

export const useNotification = (): [NotificationData, SendNotificationData] => {
  const [notificationData, setNotificationData] = useState<NotificationData>({});

  useEffect(() => {
    return () => {
      if (notificationData.timeout) {
        clearTimeout(notificationData.timeout);
        notificationData.check = false;
      }
    }
  }, [notificationData]);

  const setNotification = (msg: string) => {
    if (notificationData.timeout) clearTimeout(notificationData.timeout);

    const timeout = setTimeout(() => {
      setNotificationData({});
    }, 5000);

    const check = true;

    setNotificationData({ timeout, msg, check });
  };
  return [notificationData, setNotification];
};

const Notifications_: FC<{ data: NotificationData; className?: string }> = ({ data, className }) => {
  return (
      data.check ?
        <div className={className}>{data.msg}</div> :
        <p>&nbsp;</p>
  )
};

const Notifications = styled(Notifications_)`
  border-radius: ${({ theme }) => theme.borderRadius}px;
  background: ${({ theme }) => theme.colors.red};
  color: white;
  padding: 1em;
  width: 20em;
  text-align: center;
  opacity: 0.6;
`;

export default Notifications;
