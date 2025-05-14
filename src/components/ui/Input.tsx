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
  color: var(--text);
  display: flex;
  align-items: center;
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
  color: var(--text-light);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

const StyledInput = styled(motion.input)<{ hasError: boolean, hasIcon: boolean }>`
  padding: 0.75rem ${props => props.hasIcon ? '2.5rem' : '1rem'};
  border-radius: 0.5rem;
  border: 2px solid ${(props) => (props.hasError ? 'var(--error)' : 'var(--border)')};
  font-size: 1rem;
  width: 100%;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  background-color: white;
  color: var(--text);
  
  &:focus {
    outline: none;
    border-color: ${(props) => (props.hasError ? 'var(--error)' : 'var(--primary)')};
    box-shadow: 0 0 0 3px ${(props) => (props.hasError ? 'rgba(250, 82, 82, 0.15)' : 'rgba(66, 99, 235, 0.15)')};
  }
  
  &::placeholder {
    color: #ADB5BD;
  }
  
  /* Анимация при автозаполнении */
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    -webkit-text-fill-color: var(--text);
    transition: background-color 5000s ease-in-out 0s;
    box-shadow: 0 0 0 1000px white inset;
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
  color: var(--text-light);
  font-size: 0.8rem;
  margin-top: 0.5rem;
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
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <InputContainer>
      {label && (
        <InputLabel 
          htmlFor={name}
          animate={{ color: error ? 'var(--error)' : isFocused ? 'var(--primary)' : 'var(--text)' }}
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
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          required={required}
          initial={{ borderColor: error ? 'var(--error)' : 'var(--border)' }}
          animate={{ 
            borderColor: error 
              ? 'var(--error)' 
              : isFocused 
                ? 'var(--primary)' 
                : 'var(--border)' 
          }}
          whileFocus={{ borderColor: error ? 'var(--error)' : 'var(--primary)' }}
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
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {helpText}
        </HelpText>
      )}
    </InputContainer>
  );
}; 