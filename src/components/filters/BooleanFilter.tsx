import React from 'react';
import { Parameter } from '@/types';

interface BooleanFilterProps {
  parameter: Parameter;
  value: any;
  onChange: (value: any) => void;
  disabled?: boolean;
}

export const BooleanFilter: React.FC<BooleanFilterProps> = ({
  parameter,
  value,
  onChange,
  disabled,
}) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={value === true}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className="sr-only peer"
      />
      <div className="w-11 h-6 bg-metabase-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-metabase-primary rounded-full peer dark:bg-metabase-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-metabase-primary"></div>
    </label>
  );
}; 