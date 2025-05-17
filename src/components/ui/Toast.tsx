import React, { useEffect, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { motion } from 'framer-motion';
import { FiX, FiAlertCircle, FiCheckCircle, FiInfo, FiAlertTriangle } from 'react-icons/fi';
import type { Notification, NotificationType } from '../../context/NotificationContext';

interface ToastProps {
  notification: Notification;
  onClose: (id: string) => void;
}

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

const getToastColor = (type: NotificationType) => {
  switch (type) {
    case 'success':
      return 'var(--success, #10B981)';
    case 'error':
      return 'var(--error, #EF4444)';
    case 'warning':
      return 'var(--warning, #F59E0B)';
    case 'info':
      return 'var(--info, #3B82F6)';
    default:
      return 'var(--primary, #4263EB)';
  }
};

const ToastContainer = styled.div<{ $type: NotificationType; $isExiting: boolean }>`
  display: flex;
  align-items: flex-start;
  padding: 1rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  margin-bottom: 0.75rem;
  max-width: 350px;
  border-left: 4px solid ${({ $type }) => getToastColor($type)};
  position: relative;
  animation: ${({ $isExiting }) =>
    $isExiting
      ? css`${slideOut} 0.3s forwards`
      : css`${slideIn} 0.3s forwards`};
`;

const IconContainer = styled.div<{ $type: NotificationType }>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $type }) => getToastColor($type)};
  font-size: 1.25rem;
  margin-right: 0.75rem;
  flex-shrink: 0;
`;

const Content = styled.div`
  flex: 1;
  padding-right: 1.5rem;
`;

const Message = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: var(--text, #1F2937);
  line-height: 1.4;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--text-light, #6B7280);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  border-radius: 50%;
  font-size: 1rem;
  transition: background-color 0.2s, color 0.2s;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    color: var(--text, #1F2937);
  }
`;

const getToastIcon = (type: NotificationType) => {
  switch (type) {
    case 'success':
      return <FiCheckCircle />;
    case 'error':
      return <FiAlertCircle />;
    case 'warning':
      return <FiAlertTriangle />;
    case 'info':
    default:
      return <FiInfo />;
  }
};

export const Toast: React.FC<ToastProps> = ({ notification, onClose }) => {
  const [isExiting, setIsExiting] = useState(false);
  
  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose(notification.id);
    }, 300);
  };
  
  useEffect(() => {
    if (notification.duration !== Infinity) {
      const timer = setTimeout(() => {
        handleClose();
      }, notification.duration);
      
      return () => clearTimeout(timer);
    }
  }, [notification.duration, notification.id]);
  
  return (
    <ToastContainer $type={notification.type} $isExiting={isExiting}>
      <IconContainer $type={notification.type}>
        {getToastIcon(notification.type)}
      </IconContainer>
      
      <Content>
        <Message>{notification.message}</Message>
      </Content>
      
      <CloseButton onClick={handleClose} aria-label="Закрыть">
        <FiX />
      </CloseButton>
    </ToastContainer>
  );
};
