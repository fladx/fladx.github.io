import { createGlobalStyle } from 'styled-components';

// Глобальные футуристические стили
export const FuturisticThemeStyles = createGlobalStyle`
  :root {
    /* Новая цветовая палитра - градиенты и футуристические цвета */
    --primary: #4263eb;
    --primary-hover: #3b5bdb;
    --secondary: #7048e8;
    --secondary-hover: #6741d9;
    --accent: #3a1c71;
    --accent-light: #6c63ff;
    
    /* Градиенты */
    --gradient-primary: linear-gradient(135deg, #232b5d 60%, #3a1c71 100%);
    --gradient-secondary: linear-gradient(135deg, #4263eb 0%, #7048e8 100%);
    --gradient-accent: linear-gradient(135deg, #3a1c71 0%, #4263eb 100%);
    --gradient-card: linear-gradient(135deg, #232b5d 0%, #1e224a 100%);
    
    /* Фоны */
    --bg-dark: #131836;
    --bg-medium: #1e224a;
    --bg-light: #262e59;
    --bg-card: #232b5d;
    
    /* Текст */
    --text-primary: #ffffff;
    --text-secondary: #b3baff;
    --text-tertiary: #8a94f5;
    --text-input: #ffffff;
    
    /* Границы и тени */
    --border: #4263eb33;
    --border-hover: #4263eb;
    --shadow-small: 0 4px 12px 0 rgba(58,28,113,0.15);
    --shadow-medium: 0 8px 24px 0 rgba(58,28,113,0.2);
    --shadow-large: 0 12px 32px 0 rgba(58,28,113,0.25);
    
    /* Состояния */
    --success: #00c896;
    --error: #ff5757;
    --warning: #ffbe0b;
    --info: #67dbff;
    
    /* Эффекты */
    --blur-amount: 8px;
    --glow-effect: 0 0 15px rgba(66, 99, 235, 0.5);
    --transition-fast: 0.2s;
    --transition-medium: 0.3s;
    --transition-slow: 0.5s;
  }

  /* Переопределение глобальных стилей */
  body {
    background-color: var(--bg-dark);
    color: var(--text-primary);
    transition: all var(--transition-medium) ease;
  }

  h1, h2, h3, h4, h5, h6 {
    color: var(--text-primary);
    font-weight: 700;
    letter-spacing: 0.02em;
    text-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  a {
    color: var(--accent-light);
    transition: all var(--transition-fast) ease;
    font-weight: 500;
    text-decoration: none;
    position: relative;
    
    &:hover {
      color: var(--text-primary);
      text-shadow: var(--glow-effect);
    }
    
    &:after {
      content: '';
      position: absolute;
      width: 0;
      height: 2px;
      bottom: -2px;
      left: 0;
      background: var(--gradient-secondary);
      transition: width var(--transition-medium) ease;
    }
    
    &:hover:after {
      width: 100%;
    }
  }

  /* Кастомные скроллбары */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: var(--bg-medium);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(var(--accent), var(--primary));
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--accent-light);
  }

  /* Улучшенные анимации */
  .page-transition {
    animation: fadeInUp var(--transition-medium) ease;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes glow {
    0% {
      box-shadow: 0 0 5px rgba(66, 99, 235, 0.3);
    }
    50% {
      box-shadow: 0 0 20px rgba(66, 99, 235, 0.5);
    }
    100% {
      box-shadow: 0 0 5px rgba(66, 99, 235, 0.3);
    }
  }

  /* Футуристические карточки */
  .futuristic-card {
    background: var(--gradient-card);
    border-radius: 16px;
    padding: 24px;
    border: 1.5px solid var(--border);
    box-shadow: var(--shadow-medium);
    transition: all var(--transition-medium) ease;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-large);
      border-color: var(--border-hover);
    }
  }

  /* Таблицы */
  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    margin: 1.5rem 0;
    
    th {
      background: var(--bg-medium);
      color: var(--text-primary);
      font-weight: 600;
      text-align: left;
      padding: 1rem;
      border-top: 1px solid var(--border);
      border-bottom: 1px solid var(--border);
      
      &:first-child {
        border-top-left-radius: 10px;
        border-left: 1px solid var(--border);
      }
      
      &:last-child {
        border-top-right-radius: 10px;
        border-right: 1px solid var(--border);
      }
    }
    
    td {
      padding: 1rem;
      border-bottom: 1px solid var(--border);
      color: var(--text-secondary);
      transition: all var(--transition-fast) ease;
      
      &:first-child {
        border-left: 1px solid transparent;
      }
      
      &:last-child {
        border-right: 1px solid transparent;
      }
    }
    
    tr {
      transition: all var(--transition-fast) ease;
      
      &:hover td {
        background-color: var(--bg-medium);
        color: var(--text-primary);
        
        &:first-child {
          border-left: 1px solid var(--border);
          border-top-left-radius: 8px;
          border-bottom-left-radius: 8px;
        }
        
        &:last-child {
          border-right: 1px solid var(--border);
          border-top-right-radius: 8px;
          border-bottom-right-radius: 8px;
        }
      }
      
      &:last-child td {
        &:first-child {
          border-bottom-left-radius: 10px;
        }
        
        &:last-child {
          border-bottom-right-radius: 10px;
        }
      }
    }
  }
`; 