import React from 'react';
import { Parameter } from '@/types';
import { isParameterEditable } from '@/lib/embed-utils';
import { useDashboard } from '@/lib/dashboard-context';
import { DateFilter } from './DateFilter';
import { NumberFilter } from './NumberFilter';
import { TextFilter } from './TextFilter';
import { CategoryFilter } from './CategoryFilter';
import { BooleanFilter } from './BooleanFilter';

interface FilterWidgetProps {
  parameter: Parameter;
  value: any;
  onChange: (value: any) => void;
}

export const FilterWidget: React.FC<FilterWidgetProps> = ({
  parameter,
  value,
  onChange,
}) => {
  const { embedConfig } = useDashboard();
  const isEditable = isParameterEditable(parameter, embedConfig);

  const renderWidget = () => {
    switch (parameter.type) {
      case 'date':
      case 'date/range':
      case 'date/relative':
        return (
          <DateFilter
            parameter={parameter}
            value={value}
            onChange={onChange}
            disabled={!isEditable}
          />
        );

      case 'number':
        return (
          <NumberFilter
            parameter={parameter}
            value={value}
            onChange={onChange}
            disabled={!isEditable}
          />
        );

      case 'text':
        return (
          <TextFilter
            parameter={parameter}
            value={value}
            onChange={onChange}
            disabled={!isEditable}
          />
        );

      case 'category':
      case 'location':
        return (
          <CategoryFilter
            parameter={parameter}
            value={value}
            onChange={onChange}
            disabled={!isEditable}
          />
        );

      case 'boolean':
        return (
          <BooleanFilter
            parameter={parameter}
            value={value}
            onChange={onChange}
            disabled={!isEditable}
          />
        );

      default:
        return (
          <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            disabled={!isEditable}
            className="metabase-filter"
            placeholder={parameter.name}
          />
        );
    }
  };

  return (
    <div className="flex flex-col">
      <label className="text-xs font-medium text-metabase-gray-600 dark:text-metabase-gray-400 mb-1">
        {parameter.name}
        {parameter.required && <span className="text-metabase-danger ml-1">*</span>}
      </label>
      {renderWidget()}
    </div>
  );
}; 