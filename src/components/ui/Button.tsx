import type { ReactNode, ButtonHTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag' | 'onDragStart' | 'onDragEnd'> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'success' | 'error' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  icon?: ReactNode;
}

const StyledButton = styled(motion.button)<{
  variant: 'primary' | 'secondary' | 'outline' | 'success' | 'error' | 'ghost';
  size: 'small' | 'medium' | 'large';
  fullWidth: boolean;
  $hasIcon: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.$hasIcon ? '0.5rem' : '0'};
  font-weight: 600;
  cursor: pointer;
  border-radius: 0.5rem;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  width: ${(props) => (props.fullWidth ? '100%' : 'auto')};
  
  /* Размеры кнопок */
  ${props => {
    switch (props.size) {
      case 'small':
        return `
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
        `;
      case 'large':
        return `
          padding: 0.875rem 1.75rem;
          font-size: 1.125rem;
        `;
      default: // medium
        return `
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
        `;
    }
  }}
  
  /* Типы кнопок */
  ${(props) => {
    switch (props.variant) {
      case 'primary':
        return `
          background-color: var(--primary);
          color: white;
          border: none;
          box-shadow: 0 2px 10px rgba(66, 99, 235, 0.2);
          &:hover {
            background-color: var(--primary-hover);
            box-shadow: 0 4px 15px rgba(66, 99, 235, 0.3);
            transform: translateY(-2px);
          }
          &:active {
            transform: translateY(0);
            box-shadow: 0 1px 5px rgba(66, 99, 235, 0.2);
          }
        `;
      case 'secondary':
        return `
          background-color: var(--secondary);
          color: #212529;
          border: none;
          box-shadow: 0 2px 10px rgba(252, 196, 25, 0.2);
          &:hover {
            background-color: var(--secondary-hover);
            box-shadow: 0 4px 15px rgba(252, 196, 25, 0.3);
            transform: translateY(-2px);
          }
          &:active {
            transform: translateY(0);
            box-shadow: 0 1px 5px rgba(252, 196, 25, 0.2);
          }
        `;
      case 'outline':
        return `
          background-color: transparent;
          color: var(--primary);
          border: 2px solid var(--primary);
          &:hover {
            background-color: rgba(66, 99, 235, 0.08);
            transform: translateY(-2px);
          }
          &:active {
            transform: translateY(0);
          }
        `;
      case 'success':
        return `
          background-color: var(--success);
          color: white;
          border: none;
          box-shadow: 0 2px 10px rgba(64, 192, 87, 0.2);
          &:hover {
            background-color: #37b34a;
            box-shadow: 0 4px 15px rgba(64, 192, 87, 0.3);
            transform: translateY(-2px);
          }
          &:active {
            transform: translateY(0);
            box-shadow: 0 1px 5px rgba(64, 192, 87, 0.2);
          }
        `;
      case 'error':
        return `
          background-color: var(--error);
          color: white;
          border: none;
          box-shadow: 0 2px 10px rgba(250, 82, 82, 0.2);
          &:hover {
            background-color: #e03e3e;
            box-shadow: 0 4px 15px rgba(250, 82, 82, 0.3);
            transform: translateY(-2px);
          }
          &:active {
            transform: translateY(0);
            box-shadow: 0 1px 5px rgba(250, 82, 82, 0.2);
          }
        `;
      case 'ghost':
        return `
          background-color: transparent;
          color: var(--text);
          border: none;
          &:hover {
            background-color: rgba(0, 0, 0, 0.05);
          }
          &:active {
            background-color: rgba(0, 0, 0, 0.1);
          }
        `;
      default:
        return '';
    }
  }}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }
`;

export const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  icon,
  ...props
}: ButtonProps) => {
  return (
    <StyledButton
      type={type}
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      $hasIcon={!!icon}
      whileHover={props.disabled ? {} : { scale: 1.02 }}
      whileTap={props.disabled ? {} : { scale: 0.98 }}
      {...props}
    >
      {icon}
      {children}
    </StyledButton>
  );
}; 