import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NotificationProvider, useNotification } from './context/NotificationContext';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { AnimatePresence, motion } from 'framer-motion';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { DashboardHome } from './pages/dashboard/DashboardHome';
import { ToastContainer } from './components/ui/ToastContainer';
import { CalendarPage } from './pages/dashboard/CalendarPage';
import { StudentsPage } from './pages/dashboard/StudentsPage';
import { StatsPage } from './pages/dashboard/StatsPage';
import { ProfilePage } from './pages/dashboard/ProfilePage';
import { useEffect } from 'react';
import { FuturisticThemeStyles } from './assets/styles/futuristic-theme';

// Анимация для страниц
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: -20,
  },
};

const pageTransition = {
  type: 'tween',
  ease: [0.19, 1.0, 0.22, 1.0],
  duration: 0.4,
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
  const { isAuthenticated, user } = useAuth();

  // Сохраняем текущий путь в localStorage при изменении пути
  useEffect(() => {
    if (isAuthenticated && user?.role === 'TEACHER' && location.pathname.startsWith('/dashboard')) {
      localStorage.setItem('lastTeacherPath', location.pathname);
    }
  }, [location.pathname, isAuthenticated, user]);

  // Получаем сохраненный путь или используем /dashboard по умолчанию
  const getLastTeacherPath = () => {
    return localStorage.getItem('lastTeacherPath') || '/dashboard';
  };

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Публичные маршруты */}
        {/* Если TEACHER, редирект с / на последний сохраненный путь */}
        <Route path="/" element={
          isAuthenticated && user?.role === 'TEACHER'
            ? <Navigate to={getLastTeacherPath()} />
            : <AnimatedPage><HomePage /></AnimatedPage>
        } />

        {/* Маршруты для гостей */}
        <Route path="/login" element={<GuestRoute><LoginPage /></GuestRoute>} />
        <Route path="/register" element={<GuestRoute><RegisterPage /></GuestRoute>} />

        {/* Защищённые маршруты для TEACHER */}
        {isAuthenticated && user?.role === 'TEACHER' && (
          <Route path="/dashboard" element={<DashboardLayout><DashboardHome /></DashboardLayout>} />
        )}
        {isAuthenticated && user?.role === 'TEACHER' && (
          <Route path="/dashboard/calendar" element={<DashboardLayout><CalendarPage /></DashboardLayout>} />
        )}
        {isAuthenticated && user?.role === 'TEACHER' && (
          <Route path="/dashboard/students" element={<DashboardLayout><StudentsPage /></DashboardLayout>} />
        )}
        {isAuthenticated && user?.role === 'TEACHER' && (
          <Route path="/dashboard/stats" element={<DashboardLayout><StatsPage /></DashboardLayout>} />
        )}
        {isAuthenticated && user?.role === 'TEACHER' && (
          <Route path="/dashboard/profile" element={<DashboardLayout><ProfilePage /></DashboardLayout>} />
        )}

        {/* Маршрут для несуществующих страниц */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <NotificationProvider>
        <AuthProvider>
          <FuturisticThemeStyles />
          <Layout>
            <AnimatedRoutes />
          </Layout>
          <ToastContainer />
        </AuthProvider>
      </NotificationProvider>
    </Router>
  );
}

export default App;
