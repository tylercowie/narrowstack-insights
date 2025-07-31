import React from 'react';
import { IframeCard as IframeCardType } from '@/types';
import { BaseCard } from './BaseCard';
import { useDashboard } from '@/lib/dashboard-context';

interface IframeCardProps {
  card: IframeCardType;
}

export const IframeCard: React.FC<IframeCardProps> = ({ card }) => {
  const { parameters } = useDashboard();

  // Replace variables in URL
  const processUrl = (url: string): string => {
    return url.replace(/\{\{(\w+)\}\}/g, (match, paramName) => {
      if (parameters[paramName] !== undefined) {
        return encodeURIComponent(String(parameters[paramName]));
      }
      return match;
    });
  };

  const src = processUrl(card.url);
  const sandboxAttrs = card.sandbox || ['allow-scripts', 'allow-same-origin'];

  return (
    <BaseCard card={card}>
      <div className="w-full" style={{ height: `${card.height}px` }}>
        <iframe
          src={src}
          width="100%"
          height="100%"
          frameBorder="0"
          sandbox={sandboxAttrs.join(' ')}
          className="rounded"
          title={card.title || 'Embedded content'}
        />
      </div>
    </BaseCard>
  );
}; 