import React from 'react';
import { Parameter } from '@/types';

interface TextFilterProps {
  parameter: Parameter;
  value: any;
  onChange: (value: any) => void;
  disabled?: boolean;
}

export const TextFilter: React.FC<TextFilterProps> = ({
  parameter,
  value,
  onChange,
  disabled,
}) => {
  return (
    <input
      type="text"
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className="metabase-filter"
      placeholder={parameter.widgetConfig?.placeholder || parameter.name}
    />
  );
}; 