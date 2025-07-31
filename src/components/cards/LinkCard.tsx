import React from 'react';
import { LinkCard as LinkCardType } from '@/types';
import { BaseCard } from './BaseCard';
import { useDashboard } from '@/lib/dashboard-context';
import { ExternalLink } from 'lucide-react';

interface LinkCardProps {
  card: LinkCardType;
}

export const LinkCard: React.FC<LinkCardProps> = ({ card }) => {
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

  const href = processUrl(card.url);

  return (
    <BaseCard card={card}>
      <a
        href={href}
        target={card.openInNewTab ? '_blank' : '_self'}
        rel={card.openInNewTab ? 'noopener noreferrer' : undefined}
        className="flex items-center justify-center p-8 text-metabase-primary hover:text-blue-600 transition-colors"
      >
        <ExternalLink className="w-6 h-6 mr-2" />
        <span className="text-lg font-medium">Open Link</span>
      </a>
    </BaseCard>
  );
}; 