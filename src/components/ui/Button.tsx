import type { ReactNode } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import styled from 'styled-components';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'success' | 'error' | 'ghost';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends HTMLMotionProps<'button'> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  icon?: ReactNode;
  $hasIcon?: boolean;
}

const StyledButton = styled(motion.button)<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.$hasIcon ? '0.5rem' : '0'};
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
  border: none;
  outline: none;
  position: relative;
  overflow: hidden;

  /* Размеры */
  ${({ size }) => {
    switch (size) {
      case 'small':
        return `
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
        `;
      case 'large':
        return `
          padding: 0.75rem 1.5rem;
          font-size: 1.125rem;
        `;
      default:
        return `
          padding: 0.625rem 1.25rem;
          font-size: 1rem;
        `;
    }
  }}

  /* Варианты */
  ${({ variant }) => {
    switch (variant) {
      case 'secondary':
        return `
          background-color: var(--secondary);
          color: var(--text);
          &:hover {
            background-color: var(--secondary-hover);
          }
        `;
      case 'outline':
        return `
          background-color: transparent;
          border: 2px solid var(--primary);
          color: var(--primary);
          &:hover {
            background-color: var(--primary);
            color: white;
          }
        `;
      case 'success':
        return `
          background-color: var(--success);
          color: white;
          &:hover {
            background-color: #00a884;
          }
        `;
      case 'error':
        return `
          background-color: var(--error);
          color: white;
          &:hover {
            background-color: #d15a3f;
          }
        `;
      case 'ghost':
        return `
          background-color: transparent;
          color: var(--text);
          &:hover {
            background-color: rgba(0, 0, 0, 0.05);
          }
        `;
      default:
        return `
          background-color: var(--primary);
          color: white;
          &:hover {
            background-color: var(--primary-hover);
          }
        `;
    }
  }}

  /* Полная ширина */
  ${({ fullWidth }) => fullWidth && `
    width: 100%;
  `}

  /* Состояния */
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid var(--primary);
    outline-offset: 2px;
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
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {icon}
      {children}
    </StyledButton>
  );
}; 