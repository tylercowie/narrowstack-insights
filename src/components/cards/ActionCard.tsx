import React from 'react';
import { ActionCard as ActionCardType } from '@/types';
import { BaseCard } from './BaseCard';
import clsx from 'clsx';

interface ActionCardProps {
  card: ActionCardType;
}

export const ActionCard: React.FC<ActionCardProps> = ({ card }) => {
  const handleClick = () => {
    if (card.confirmation) {
      if (!window.confirm(card.confirmation)) {
        return;
      }
    }

    // In a real app, this would execute the action
    console.log('Executing action:', card.actionType, card.payload);

    if (card.actionType === 'http') {
      // Simulate HTTP request
      fetch(card.payload.url, {
        method: card.payload.method || 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(card.payload.body),
      })
        .then(response => response.json())
        .then(data => console.log('Action response:', data))
        .catch(error => console.error('Action error:', error));
    }
  };

  const buttonClass = clsx(
    'metabase-button w-full',
    {
      'metabase-button-primary': card.color === 'primary',
      'metabase-button-secondary': card.color === 'secondary',
      'metabase-button-danger': card.color === 'danger',
      'bg-metabase-warning hover:bg-yellow-600 text-white': card.color === 'warning',
    }
  );

  return (
    <BaseCard card={card}>
      <div className="flex items-center justify-center p-4">
        <button
          onClick={handleClick}
          className={buttonClass}
        >
          {card.label}
        </button>
      </div>
    </BaseCard>
  );
}; 