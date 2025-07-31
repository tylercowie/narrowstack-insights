import React from 'react';
import { useDashboard } from '@/lib/dashboard-context';
import { isParameterVisible } from '@/lib/embed-utils';
import { FilterWidget } from './FilterWidget';
import { Parameter } from '@/types';

export const FilterBar: React.FC = () => {
  const { dashboard, embedConfig, parameters, setParameter } = useDashboard();

  if (!dashboard) return null;

  const visibleParameters = dashboard.parameters.filter(param => 
    isParameterVisible(param, embedConfig)
  );

  if (visibleParameters.length === 0) return null;

  const handleParameterChange = (param: Parameter, value: any) => {
    setParameter(param.id, value);
  };

  return (
    <div className="bg-white dark:bg-metabase-gray-200 p-4 rounded-lg border border-metabase-gray-200 dark:border-metabase-gray-600">
      <div className="flex flex-wrap gap-4">
        {visibleParameters.map((param) => (
          <FilterWidget
            key={param.id}
            parameter={param}
            value={parameters[param.id]}
            onChange={(value) => handleParameterChange(param, value)}
          />
        ))}
      </div>
    </div>
  );
}; 