import React from 'react';
import { Card } from '@/types';
import { useDashboard } from '@/lib/dashboard-context';
import clsx from 'clsx';
import { MoreVertical } from 'lucide-react';

interface BaseCardProps {
  card: Card;
  children: React.ReactNode;
}

export const BaseCard: React.FC<BaseCardProps> = ({ card, children }) => {
  const { parameters, embedConfig, canExport } = useDashboard();

  // Check visibility condition
  if (card.visibilityCondition) {
    const { parameter, operator, value } = card.visibilityCondition;
    const paramValue = parameters[parameter];

    let isVisible = false;
    switch (operator) {
      case '=':
        isVisible = paramValue === value;
        break;
      case '!=':
        isVisible = paramValue !== value;
        break;
      case '>':
        isVisible = paramValue > value;
        break;
      case '<':
        isVisible = paramValue < value;
        break;
      case '>=':
        isVisible = paramValue >= value;
        break;
      case '<=':
        isVisible = paramValue <= value;
        break;
      case 'in':
        isVisible = Array.isArray(value) && value.includes(paramValue);
        break;
      case 'not_in':
        isVisible = Array.isArray(value) && !value.includes(paramValue);
        break;
    }

    if (!isVisible) return null;
  }

  const cardClass = clsx(
    'metabase-card h-full',
    {
      'hover:shadow-md transition-shadow': card.type === 'question' && embedConfig.downloadButtons,
    }
  );

  return (
    <div className={cardClass}>
      {(card.title || canExport) && (
        <div className="metabase-card-header flex items-center justify-between">
          <div className="flex-1">
            {card.title && (
              <h3 className="text-sm font-semibold text-metabase-gray-700 dark:text-metabase-gray-100">
                {card.title}
              </h3>
            )}
            {card.subtitle && (
              <p className="text-xs text-metabase-gray-600 dark:text-metabase-gray-400 mt-1">
                {card.subtitle}
              </p>
            )}
          </div>
          {canExport && card.type === 'question' && (
            <button className="p-1 text-metabase-gray-500 hover:text-metabase-gray-700 dark:text-metabase-gray-400 dark:hover:text-metabase-gray-200">
              <MoreVertical className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
      <div className="p-4">
        {children}
      </div>
    </div>
  );
}; 