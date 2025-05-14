import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiInfo } from 'react-icons/fi';

const FooterContainer = styled.footer`
  background-color: var(--footer-bg);
  color: var(--footer-text);
  padding: 2rem;
  margin-top: auto;
  width: 100%;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--footer-text);
  margin-bottom: 1.5rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 0;
    width: 50px;
    height: 3px;
    background-color: var(--secondary);
    border-radius: 3px;
  }
`;

const FooterLink = styled(Link)`
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  margin-bottom: 0.75rem;
  transition: color 0.2s ease;
  
  &:hover {
    color: var(--secondary);
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  color: rgba(255, 255, 255, 0.8);
  
  svg {
    margin-right: 0.5rem;
    color: var(--secondary);
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
`;

const InfoSection = styled.div`
  background-color: var(--secondary);
  color: var(--text);
  padding: 1rem;
  border-radius: 0.5rem;
  margin-top: 1rem;
  font-size: 0.9rem;
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
`;

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>Teachify</FooterTitle>
          <p style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '1rem' }}>
            Платформа для преподавателей и их учеников
          </p>
          
          <InfoSection>
            <FiInfo style={{ marginTop: '3px', flexShrink: 0 }} />
            <div>
              На данной платформе могут регистрироваться только преподаватели. 
              Ученики добавляются преподавателями в личном кабинете.
            </div>
          </InfoSection>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Навигация</FooterTitle>
          <FooterLink to="/">Главная</FooterLink>
          <FooterLink to="/login">Вход</FooterLink>
          <FooterLink to="/register">Регистрация</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Контакты</FooterTitle>
          <ContactItem>
            <FiMail />
            <span>support@teachify.com</span>
          </ContactItem>
          <ContactItem>
            <FiPhone />
            <span>+7 (900) 123-45-67</span>
          </ContactItem>
        </FooterSection>
      </FooterContent>
      
      <Copyright>
        © {currentYear} Teachify. Все права защищены.
      </Copyright>
    </FooterContainer>
  );
}; 