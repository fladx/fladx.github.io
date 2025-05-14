import type { ChangeEvent } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  error?: string;
  required?: boolean;
}

const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
  width: 100%;
`;

const SelectLabel = styled.label`
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #212529;
  display: flex;
  align-items: center;
`;

const RequiredMark = styled.span`
  color: #FA5252;
  margin-left: 4px;
`;

const StyledSelect = styled.select<{ hasError: boolean }>`
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 2px solid ${(props) => (props.hasError ? '#FA5252' : '#DEE2E6')};
  font-size: 1rem;
  width: 100%;
  transition: all 0.2s ease;
  background-color: #FFFFFF;
  color: #212529;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1em;
  
  &:focus {
    outline: none;
    border-color: ${(props) => (props.hasError ? '#FA5252' : '#4263EB')};
    box-shadow: 0 0 0 2px ${(props) => (props.hasError ? 'rgba(250, 82, 82, 0.2)' : 'rgba(66, 99, 235, 0.2)')};
  }
`;

const ErrorText = styled(motion.p)`
  color: #FA5252;
  font-size: 0.8rem;
  margin-top: 0.5rem;
`;

export const Select = ({
  label,
  name,
  value,
  onChange,
  options,
  error,
  required = false,
}: SelectProps) => {
  return (
    <SelectContainer>
      <SelectLabel htmlFor={name}>
        {label}
        {required && <RequiredMark>*</RequiredMark>}
      </SelectLabel>
      <StyledSelect
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        hasError={!!error}
        required={required}
      >
        <option value="" disabled>
          Выберите опцию...
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </StyledSelect>
      {error && (
        <ErrorText
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          {error}
        </ErrorText>
      )}
    </SelectContainer>
  );
}; 