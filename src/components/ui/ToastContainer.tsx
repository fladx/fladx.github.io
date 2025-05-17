import React from 'react';
import styled from 'styled-components';
import { Toast } from './Toast';
import { useNotification } from '../../context/NotificationContext';

const Container = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  pointer-events: none;
  
  & > * {
    pointer-events: auto;
  }
`;

export const ToastContainer: React.FC = () => {
  const { notifications, removeNotification } = useNotification();
  
  return (
    <Container>
      {notifications.map((notification) => (
        <Toast
          key={notification.id}
          notification={notification}
          onClose={removeNotification}
        />
      ))}
    </Container>
  );
};