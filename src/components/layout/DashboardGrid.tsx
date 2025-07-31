import React from 'react';
import GridLayout from 'react-grid-layout';
import { useDashboard } from '@/lib/dashboard-context';
import { Card } from '@/types';
import { QuestionCard } from '../cards/QuestionCard';
import { TextCard } from '../cards/TextCard';
import { LinkCard } from '../cards/LinkCard';
import { ActionCard } from '../cards/ActionCard';
import { IframeCard } from '../cards/IframeCard';
import 'react-grid-layout/css/styles.css';

export const DashboardGrid: React.FC = () => {
  const { dashboard } = useDashboard();

  if (!dashboard) return null;

  const activeTab = dashboard.tabs.find(tab => tab.cards.length > 0);
  if (!activeTab) return null;

  const renderCard = (card: Card) => {
    switch (card.type) {
      case 'question':
        return <QuestionCard key={card.id} card={card} />;
      case 'text':
        return <TextCard key={card.id} card={card} />;
      case 'link':
        return <LinkCard key={card.id} card={card} />;
      case 'action':
        return <ActionCard key={card.id} card={card} />;
      case 'iframe':
        return <IframeCard key={card.id} card={card} />;
      default:
        return null;
    }
  };

  const layout = activeTab.cards.map(card => ({
    i: card.id,
    x: card.gridPosition.x,
    y: card.gridPosition.y,
    w: card.gridPosition.w,
    h: card.gridPosition.h,
    minW: card.gridPosition.minW,
    maxW: card.gridPosition.maxW,
    minH: card.gridPosition.minH,
    maxH: card.gridPosition.maxH,
    static: card.gridPosition.static,
  }));

  return (
    <GridLayout
      className="metabase-grid"
      layout={layout}
      cols={dashboard.layout.cols}
      rowHeight={dashboard.layout.rowHeight}
      margin={dashboard.layout.margin}
      containerPadding={dashboard.layout.containerPadding}
      isDraggable={false}
      isResizable={false}
      compactType="vertical"
      preventCollision={false}
    >
      {activeTab.cards.map(card => (
        <div key={card.id}>
          {renderCard(card)}
        </div>
      ))}
    </GridLayout>
  );
}; 