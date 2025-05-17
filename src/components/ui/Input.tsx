import { type ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface InputProps {
  label: string;
  type?: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  icon?: React.ReactNode;
  helpText?: string;
  disabled?: boolean;
}

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
  width: 100%;
  position: relative;
`;

const InputLabel = styled(motion.label)`
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  letter-spacing: 0.02em;
`;

const RequiredMark = styled.span`
  color: var(--error);
  margin-left: 4px;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.div`
  position: absolute;
  left: 1rem;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

const StyledInput = styled(motion.input)<{ hasError: boolean, hasIcon: boolean, disabled?: boolean }>`
  padding: 0.75rem ${props => props.hasIcon ? '2.5rem' : '1.25rem'};
  border-radius: 10px;
  border: 1.5px solid ${(props) => (props.hasError ? 'var(--error)' : 'var(--border)')};
  font-size: 1rem;
  width: 100%;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  background-color: var(--bg-light);
  color: var(--text-primary);
  box-shadow: ${(props) => (props.hasError ? '0 0 0 3px rgba(255, 87, 87, 0.15)' : '0 4px 10px rgba(0, 0, 0, 0.1)')};
  backdrop-filter: blur(var(--blur-amount));
  letter-spacing: 0.01em;
  
  &:focus {
    outline: none;
    border-color: ${(props) => (props.hasError ? 'var(--error)' : 'var(--primary)')};
    box-shadow: 0 0 0 3px ${(props) => (props.hasError ? 'rgba(255, 87, 87, 0.2)' : 'rgba(66, 99, 235, 0.2)')};
    background-color: var(--bg-light);
  }
  
  &:hover:not(:focus):not(:disabled) {
    border-color: ${(props) => (props.hasError ? 'var(--error)' : 'var(--primary-hover)')};
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
  
  &::placeholder {
    color: var(--text-tertiary);
    opacity: 0.7;
  }
  
  &:disabled {
    background-color: var(--bg-medium);
    cursor: not-allowed;
    opacity: 0.7;
    filter: grayscale(30%);
  }
  
  /* Анимация при автозаполнении */
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    -webkit-text-fill-color: var(--text-primary);
    transition: background-color 5000s ease-in-out 0s;
    box-shadow: 0 0 0 1000px var(--bg-light) inset;
  }
`;

const ErrorText = styled(motion.p)`
  color: var(--error);
  font-size: 0.8rem;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const HelpText = styled(motion.p)`
  color: var(--text-tertiary);
  font-size: 0.8rem;
  margin-top: 0.5rem;
  opacity: 0.8;
`;

const InputHighlight = styled(motion.div)<{ isFocused: boolean, hasError: boolean }>`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  width: 0;
  background: ${props => props.hasError ? 'var(--error)' : 'var(--gradient-secondary)'};
  transition: width 0.25s ease-out;
  border-radius: 0 0 4px 4px;
  opacity: 0;
  
  ${props => props.isFocused && `
    width: 100%;
    opacity: 1;
  `}
`;

export const Input = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  error,
  required = false,
  icon,
  helpText,
  disabled = false,
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <InputContainer>
      {label && (
        <InputLabel 
          htmlFor={name}
          animate={{ 
            color: error 
              ? 'var(--error)' 
              : isFocused 
                ? 'var(--text-primary)' 
                : 'var(--text-secondary)' 
          }}
          transition={{ duration: 0.2 }}
        >
          {label}
          {required && <RequiredMark>*</RequiredMark>}
        </InputLabel>
      )}
      
      <InputWrapper>
        {icon && <IconWrapper>{icon}</IconWrapper>}
        <StyledInput
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          hasError={!!error}
          hasIcon={!!icon}
          disabled={disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          required={required}
          initial={{ borderColor: error ? 'var(--error)' : 'var(--border)' }}
          animate={{ 
            borderColor: error 
              ? 'var(--error)' 
              : isFocused 
                ? 'var(--primary)' 
                : 'var(--border)',
            boxShadow: isFocused 
              ? error 
                ? '0 0 0 3px rgba(255, 87, 87, 0.2)' 
                : '0 0 0 3px rgba(66, 99, 235, 0.2)'
              : error 
                ? '0 0 0 3px rgba(255, 87, 87, 0.15)'
                : '0 4px 10px rgba(0, 0, 0, 0.1)'
          }}
          transition={{ duration: 0.2 }}
        />
        <InputHighlight 
          isFocused={isFocused} 
          hasError={!!error}
        />
      </InputWrapper>
      
      {error && (
        <ErrorText
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {error}
        </ErrorText>
      )}
      
      {helpText && !error && (
        <HelpText
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 0.2 }}
        >
          {helpText}
        </HelpText>
      )}
    </InputContainer>
  );
}; 