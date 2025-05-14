import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { createGlobalStyle } from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
  }
  
  body {
    background-color: var(--background);
    color: var(--text);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
    min-height: 100vh;
    overflow-x: hidden;
  }
  
  #root {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  
  a {
    text-decoration: none;
    color: inherit;
  }
  
  /* Скроллбар */
  ::-webkit-scrollbar {
    width: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.05);
  }
  
  ::-webkit-scrollbar-thumb {
    background: rgba(66, 99, 235, 0.3);
    border-radius: 10px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(66, 99, 235, 0.5);
  }
`;

// Анимация для страниц
const pageVariants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: -10,
  },
};

const pageTransition = {
  type: 'tween',
  ease: 'easeInOut',
  duration: 0.3,
};

// Компонент для анимированных страниц
const AnimatedPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="page-transition"
    >
      {children}
    </motion.div>
  );
};

// Защищенный маршрут для авторизованных пользователей
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <AnimatedPage>
        <div className="loading-container">
          <div className="loader"></div>
          <p>Загрузка...</p>
        </div>
      </AnimatedPage>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return <AnimatedPage>{children}</AnimatedPage>;
};

// Маршрут для гостей (неавторизованных пользователей)
const GuestRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <AnimatedPage>
        <div className="loading-container">
          <div className="loader"></div>
          <p>Загрузка...</p>
        </div>
      </AnimatedPage>
    );
  }
  
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  
  return <AnimatedPage>{children}</AnimatedPage>;
};

// Компонент для анимированных маршрутов
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Публичные маршруты */}
        <Route path="/" element={<AnimatedPage><HomePage /></AnimatedPage>} />
        
        {/* Маршруты для гостей */}
        <Route 
          path="/login" 
          element={
            <GuestRoute>
              <LoginPage />
            </GuestRoute>
          } 
        />
        <Route 
          path="/register" 
          element={
            <GuestRoute>
              <RegisterPage />
            </GuestRoute>
          } 
        />
        
        {/* Защищенные маршруты */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <div>Здесь будет личный кабинет</div>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/tutors" 
          element={
            <ProtectedRoute>
              <div>Функционал будет доступен скоро</div>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <div>Здесь будет профиль пользователя</div>
            </ProtectedRoute>
          } 
        />
        
        {/* Маршрут для несуществующих страниц */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <GlobalStyle />
        <Layout>
          <AnimatedRoutes />
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;
