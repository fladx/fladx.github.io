import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { FiSearch, FiBookOpen, FiCalendar, FiStar } from 'react-icons/fi';

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #f8f7ff 0%, #e4e1ff 100%);
  border-radius: 1rem;
  margin-bottom: 4rem;
  width: 100%;
  box-sizing: border-box;
`;

const Title = styled(motion.h1)`
  font-size: 3rem;
  font-weight: 800;
  color: #212529;
  margin-bottom: 1.5rem;
  
  span {
    color: var(--primary);
  }
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.25rem;
  color: #495057;
  max-width: 700px;
  margin-bottom: 2rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    max-width: 300px;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  min-width: 180px;
`;

const FeaturesSection = styled.section`
  margin-bottom: 4rem;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const FeatureCard = styled(motion.div)`
  padding: 2rem;
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
  
  h3 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    
    svg {
      margin-right: 0.75rem;
      color: var(--primary);
    }
  }
  
  p {
    color: var(--text-light);
    line-height: 1.6;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2.5rem;
  color: var(--text);
`;

const CTASection = styled.section`
  background-color: var(--primary);
  padding: 3rem 2rem;
  border-radius: 1rem;
  text-align: center;
  color: white;
  margin-bottom: 4rem;
  box-shadow: 0 8px 30px rgba(94, 96, 206, 0.3);
  
  h2 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
  }
  
  p {
    margin-bottom: 2rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export const HomePage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <HeroSection>
        <Title
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span>Teachify</span> - платформа для преподавателей
        </Title>
        <Subtitle
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Удобный инструмент для организации образовательного процесса и взаимодействия с учениками
        </Subtitle>
        
        <ButtonGroup>
          {isAuthenticated ? (
            <StyledLink to="/dashboard">
              <Button fullWidth>
                Личный кабинет
              </Button>
            </StyledLink>
          ) : (
            <>
              <StyledLink to="/register">
                <Button fullWidth>
                  Зарегистрироваться
                </Button>
              </StyledLink>
              <StyledLink to="/login">
                <Button variant="outline" fullWidth>
                  Войти
                </Button>
              </StyledLink>
            </>
          )}
        </ButtonGroup>
      </HeroSection>

      <FeaturesSection>
        <FeatureCard
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3>
            <FiBookOpen />
            Только для преподавателей
          </h3>
          <p>
            Сервис предназначен для регистрации преподавателей, которые могут создавать
            аккаунты для своих учеников и управлять учебным процессом.
          </p>
        </FeatureCard>
      </FeaturesSection>

      <FeaturesSection>
        <SectionTitle>Наши преимущества</SectionTitle>
        <FeaturesGrid
          as={motion.div}
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <FeatureCard variants={item}>
            <h3>
              <FiSearch />
              Поиск репетиторов
            </h3>
            <p>
              Легко находите репетиторов, фильтруя по предметам, ценам и рейтингу.
              Выбирайте лучших для достижения ваших целей в обучении.
            </p>
          </FeatureCard>
          
          <FeatureCard variants={item}>
            <h3>
              <FiBookOpen />
              Эффективное обучение
            </h3>
            <p>
              Используйте нашу платформу для организации занятий, обмена материалами
              и отслеживания прогресса в обучении.
            </p>
          </FeatureCard>
          
          <FeatureCard variants={item}>
            <h3>
              <FiCalendar />
              Удобное расписание
            </h3>
            <p>
              Планируйте занятия в удобное для вас время.
              Система напоминаний не даст пропустить важные уроки.
            </p>
          </FeatureCard>
          
          <FeatureCard variants={item}>
            <h3>
              <FiStar />
              Система рейтинга
            </h3>
            <p>
              Оценивайте репетиторов и занятия.
              Выбирайте лучших специалистов на основе реальных отзывов.
            </p>
          </FeatureCard>
        </FeaturesGrid>
      </FeaturesSection>

      <CTASection
        as={motion.section}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2>Готовы начать?</h2>
        <p>
          Присоединяйтесь к нашей платформе сегодня и откройте новые возможности
          для обучения или преподавания.
        </p>
        <Link to="/register" style={{ textDecoration: 'none' }}>
          <Button
            variant="secondary"
            size="large"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Зарегистрироваться бесплатно
          </Button>
        </Link>
      </CTASection>
    </>
  );
}; 