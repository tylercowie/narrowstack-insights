import React from 'react';
import { Parameter } from '@/types';

interface DateFilterProps {
  parameter: Parameter;
  value: any;
  onChange: (value: any) => void;
  disabled?: boolean;
}

export const DateFilter: React.FC<DateFilterProps> = ({
  parameter,
  value,
  onChange,
  disabled,
}) => {
  return (
    <input
      type="date"
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className="metabase-filter"
      placeholder={parameter.widgetConfig?.placeholder}
    />
  );
}; 