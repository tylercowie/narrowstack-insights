import React from 'react';
import { Parameter } from '@/types';

interface NumberFilterProps {
  parameter: Parameter;
  value: any;
  onChange: (value: any) => void;
  disabled?: boolean;
}

export const NumberFilter: React.FC<NumberFilterProps> = ({
  parameter,
  value,
  onChange,
  disabled,
}) => {
  return (
    <input
      type="number"
      value={value || ''}
      onChange={(e) => onChange(e.target.value ? Number(e.target.value) : undefined)}
      disabled={disabled}
      className="metabase-filter"
      placeholder={parameter.widgetConfig?.placeholder}
      min={parameter.widgetConfig?.min}
      max={parameter.widgetConfig?.max}
      step={parameter.widgetConfig?.step}
    />
  );
}; 