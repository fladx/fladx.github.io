import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

type CardVariant = 'default' | 'primary' | 'secondary' | 'accent' | 'transparent';
type CardSize = 'small' | 'medium' | 'large';

interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  size?: CardSize;
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  footer?: React.ReactNode;
  hover?: boolean;
  glow?: boolean;
  onClick?: () => void;
  className?: string;
}

const CardContainer = styled(motion.div)<{
  variant: CardVariant;
  size: CardSize;
  $hover: boolean;
  $glow: boolean;
  $isClickable: boolean;
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: all 0.3s ease;
  
  /* Размер */
  ${({ size }) => {
    switch (size) {
      case 'small':
        return `
          padding: 1rem;
          border-radius: 12px;
        `;
      case 'large':
        return `
          padding: 2rem;
          border-radius: 20px;
        `;
      default:
        return `
          padding: 1.5rem;
          border-radius: 16px;
        `;
    }
  }}
  
  /* Варианты */
  ${({ variant }) => {
    switch (variant) {
      case 'primary':
        return `
          background: linear-gradient(135deg, var(--bg-light) 0%, var(--bg-medium) 100%);
          border: 1.5px solid #4263eb33;
          box-shadow: 0 8px 24px 0 rgba(58,28,113,0.2);
        `;
      case 'secondary':
        return `
          background: linear-gradient(135deg, #232b5d 0%, #1e224a 100%);
          border: 1.5px solid #7048e833;
          box-shadow: 0 8px 24px 0 rgba(58,28,113,0.2);
        `;
      case 'accent':
        return `
          background: linear-gradient(135deg, #3a1c71 0%, #232b5d 100%);
          border: 1.5px solid #6c63ff33;
          box-shadow: 0 8px 24px 0 rgba(58,28,113,0.2);
        `;
      case 'transparent':
        return `
          background: rgba(30, 34, 74, 0.5);
          backdrop-filter: blur(8px);
          border: 1.5px solid rgba(66, 99, 235, 0.2);
          box-shadow: 0 8px 24px 0 rgba(58,28,113,0.15);
        `;
      default:
        return `
          background: var(--card-bg);
          border: 1.5px solid #4263eb33;
          box-shadow: 0 8px 24px 0 rgba(58,28,113,0.2);
        `;
    }
  }}
  
  /* Свечение при hover */
  ${({ $hover }) => $hover && `
    &:hover {
      transform: translateY(-6px);
      box-shadow: 0 12px 28px 0 rgba(58,28,113,0.25);
      border-color: rgba(66, 99, 235, 0.4);
    }
  `}
  
  /* Постоянное свечение */
  ${({ $glow }) => $glow && `
    &::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
      padding: 2px;
      background: linear-gradient(135deg, #4263eb33, #7048e833);
      -webkit-mask: 
        linear-gradient(#fff 0 0) content-box, 
        linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      pointer-events: none;
    }
  `}
  
  /* Кликабельный эффект */
  ${({ $isClickable }) => $isClickable && `
    cursor: pointer;
    
    &:active {
      transform: scale(0.98);
    }
  `}
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  background: rgba(66, 99, 235, 0.15);
  border-radius: 12px;
  color: var(--text-primary);
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  letter-spacing: 0.02em;
`;

const CardSubtitle = styled.p`
  margin: 0.25rem 0 0 0;
  font-size: 0.875rem;
  color: var(--text-secondary);
`;

const CardContent = styled.div`
  flex: 1;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(179, 186, 255, 0.15);
`;

export const Card = ({
  children,
  variant = 'default',
  size = 'medium',
  title,
  subtitle,
  icon,
  footer,
  hover = true,
  glow = false,
  onClick,
  className,
}: CardProps) => {
  return (
    <CardContainer
      variant={variant}
      size={size}
      $hover={hover}
      $glow={glow}
      $isClickable={!!onClick}
      onClick={onClick}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={hover ? { scale: 1.02 } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
    >
      {(title || icon) && (
        <CardHeader>
          {icon && <IconWrapper>{icon}</IconWrapper>}
          {(title || subtitle) && (
            <TitleWrapper>
              {title && <CardTitle>{title}</CardTitle>}
              {subtitle && <CardSubtitle>{subtitle}</CardSubtitle>}
            </TitleWrapper>
          )}
        </CardHeader>
      )}
      
      <CardContent>{children}</CardContent>
      
      {footer && <CardFooter>{footer}</CardFooter>}
    </CardContainer>
  );
}; 