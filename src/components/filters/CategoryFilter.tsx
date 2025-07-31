import React from 'react';
import { Parameter } from '@/types';

interface CategoryFilterProps {
  parameter: Parameter;
  value: any;
  onChange: (value: any) => void;
  disabled?: boolean;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  parameter,
  value,
  onChange,
  disabled,
}) => {
  const options = parameter.widgetConfig?.options || [];
  const isMultiSelect = parameter.widgetConfig?.multiSelect;

  if (isMultiSelect) {
    // For simplicity, using checkboxes for multi-select
    return (
      <div className="space-y-2">
        {options.map((option) => (
          <label key={option.value} className="flex items-center">
            <input
              type="checkbox"
              checked={Array.isArray(value) && value.includes(option.value)}
              onChange={(e) => {
                const currentValues = Array.isArray(value) ? value : [];
                if (e.target.checked) {
                  onChange([...currentValues, option.value]);
                } else {
                  onChange(currentValues.filter(v => v !== option.value));
                }
              }}
              disabled={disabled}
              className="mr-2"
            />
            <span className="text-sm text-metabase-gray-700">{option.label}</span>
          </label>
        ))}
      </div>
    );
  }

  return (
    <select
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className="metabase-filter w-full"
    >
      <option value="">Select {parameter.name}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}; 