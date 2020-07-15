import React, { FC, useEffect, useState } from 'react';
import styled from "styled-components/macro";

type NotificationData = { timeout?: number; status?: string; check?: boolean};

type SendNotificationData = (status: string) => void;

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

  const setNotification = (status: string) => {
    if (notificationData.timeout) clearTimeout(notificationData.timeout);

    const timeout = setTimeout(() => {
      setNotificationData({});
    }, 5000);

    const check = true;

    setNotificationData({ timeout, status, check });
  };
  return [notificationData, setNotification];
};

const Message_: FC<{ data: NotificationData; className?: string }> = ({ data, className }) => {
  return (
      data.check ?
        <div className={className}>{data.status}</div> :
        <p>&nbsp;</p>
  )
};

const Index = styled(Message_)`
  border-radius: ${({ theme }) => theme.borderRadius}px;
  background: ${({ theme }) => theme.colors.red};
  color: white;
  padding: 1em;
  width: 20em;
  text-align: center;
  opacity: 0.6;
`;

export default Index;
