import type { ReactNode } from 'react';
import styled from 'styled-components';
import { DashboardSidebar } from './DashboardSidebar';
import { motion } from 'framer-motion';

interface DashboardLayoutProps {
  children: ReactNode;
}

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: var(--bg-dark);
  overflow: hidden;
  position: relative;
  
  /* Футуристический фоновый эффект */
  &::before {
    content: '';
    position: absolute;
    width: 40vw;
    height: 40vw;
    background: radial-gradient(circle, rgba(58,28,113,0.15) 0%, rgba(30,34,74,0) 70%);
    top: -10vw;
    right: -10vw;
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
  }
  
  &::after {
    content: '';
    position: absolute;
    width: 50vw;
    height: 50vw;
    background: radial-gradient(circle, rgba(66,99,235,0.1) 0%, rgba(30,34,74,0) 70%);
    bottom: -10vw;
    left: -10vw;
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
  }
`;

const ContentArea = styled.div`
  flex: 1;
  padding: 2rem;
  padding-left: calc(250px + 2rem); /* Ширина боковой панели + отступ */
  position: relative;
  z-index: 1;
`;

const PageContainer = styled(motion.div)`
  background: rgba(30, 34, 74, 0.4);
  backdrop-filter: blur(var(--blur-amount));
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 8px 32px 0 rgba(30, 34, 74, 0.3);
  min-height: calc(100vh - 4rem);
  border: 1.5px solid rgba(66, 99, 235, 0.2);
  overflow: hidden;
  position: relative;
  
  /* Внутренний эффект подсветки */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(to right, rgba(66, 99, 235, 0), rgba(66, 99, 235, 0.5), rgba(66, 99, 235, 0));
    pointer-events: none;
  }
`;

const GridPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: radial-gradient(rgba(66, 99, 235, 0.1) 1px, transparent 1px);
  background-size: 30px 30px;
  pointer-events: none;
  opacity: 0.2;
  z-index: -1;
`;

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <LayoutContainer>
      <DashboardSidebar />
      <ContentArea>
        <PageContainer
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: [0.19, 1.0, 0.22, 1.0] }}
        >
          <GridPattern />
          {children}
        </PageContainer>
      </ContentArea>
    </LayoutContainer>
  );
}; 