import type { ReactNode } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import styled, { css, keyframes } from 'styled-components';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'success' | 'error' | 'ghost' | 'gradient';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends HTMLMotionProps<'button'> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  icon?: ReactNode;
  $hasIcon?: boolean;
  glowEffect?: boolean;
}

const pulseAnimation = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(66, 99, 235, 0.4); }
  70% { box-shadow: 0 0 0 10px rgba(66, 99, 235, 0); }
  100% { box-shadow: 0 0 0 0 rgba(66, 99, 235, 0); }
`;

const glowStyles = css`
  animation: ${pulseAnimation} 2s infinite;
  &:hover {
    animation: none;
    box-shadow: 0 0 15px rgba(66, 99, 235, 0.6);
  }
`;

const StyledButton = styled(motion.button)<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.$hasIcon ? '0.75rem' : '0'};
  border-radius: 10px;
  font-weight: 600;
  letter-spacing: 0.01em;
  transition: all 0.25s ease;
  cursor: pointer;
  border: none;
  outline: none;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(4px);
  ${props => props.glowEffect && glowStyles}

  /* Размеры */
  ${({ size }) => {
    switch (size) {
      case 'small':
        return `
          padding: 0.6rem 1.1rem;
          font-size: 0.875rem;
        `;
      case 'large':
        return `
          padding: 0.85rem 1.8rem;
          font-size: 1.125rem;
        `;
      default:
        return `
          padding: 0.75rem 1.5rem;
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
          color: white;
          box-shadow: 0 4px 12px rgba(112, 72, 232, 0.3);
          &:hover {
            background-color: var(--secondary-hover);
            box-shadow: 0 6px 16px rgba(112, 72, 232, 0.4);
          }
        `;
      case 'outline':
        return `
          background-color: transparent;
          border: 2px solid var(--primary);
          color: var(--text-primary);
          box-shadow: 0 2px 8px rgba(66, 99, 235, 0.15);
          &:hover {
            background-color: rgba(66, 99, 235, 0.1);
            box-shadow: 0 4px 12px rgba(66, 99, 235, 0.25);
          }
        `;
      case 'success':
        return `
          background-color: var(--success);
          color: white;
          box-shadow: 0 4px 12px rgba(0, 200, 150, 0.3);
          &:hover {
            filter: brightness(1.05);
            box-shadow: 0 6px 16px rgba(0, 200, 150, 0.4);
          }
        `;
      case 'error':
        return `
          background-color: var(--error);
          color: white;
          box-shadow: 0 4px 12px rgba(255, 87, 87, 0.3);
          &:hover {
            filter: brightness(1.05);
            box-shadow: 0 6px 16px rgba(255, 87, 87, 0.4);
          }
        `;
      case 'ghost':
        return `
          background-color: rgba(255, 255, 255, 0.05);
          color: var(--text-primary);
          &:hover {
            background-color: rgba(255, 255, 255, 0.1);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          }
        `;
      case 'gradient':
        return `
          background: var(--gradient-secondary);
          color: white;
          box-shadow: 0 4px 15px rgba(66, 99, 235, 0.3);
          &:hover {
            background-size: 150% 150%;
            box-shadow: 0 6px 20px rgba(66, 99, 235, 0.45);
          }
        `;
      default:
        return `
          background-color: var(--primary);
          color: white;
          box-shadow: 0 4px 12px rgba(66, 99, 235, 0.25);
          &:hover {
            background-color: var(--primary-hover);
            box-shadow: 0 6px 16px rgba(66, 99, 235, 0.35);
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
    filter: grayscale(40%);
  }

  &:focus-visible {
    outline: 2px solid var(--primary);
    outline-offset: 2px;
  }
  
  /* Эффект при нажатии */
  &:active {
    transform: scale(0.98);
  }
  
  /* Эффект блика при наведении */
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      rgba(255, 255, 255, 0.25),
      transparent 40%
    );
    transform: rotate(30deg);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }
  
  &:hover::before {
    opacity: 0.6;
  }
`;

export const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  icon,
  glowEffect = false,
  ...props
}: ButtonProps) => {
  return (
    <StyledButton
      type={type}
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      $hasIcon={!!icon}
      glowEffect={glowEffect}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      {...props}
    >
      {icon}
      {children}
    </StyledButton>
  );
}; 