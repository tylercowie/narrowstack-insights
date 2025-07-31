import React from 'react';
import { useDashboard } from '@/lib/dashboard-context';
import clsx from 'clsx';

export const DashboardTabs: React.FC = () => {
  const { dashboard, changeTab } = useDashboard();

  if (!dashboard || dashboard.tabs.length <= 1) return null;

  const visibleTabs = dashboard.tabs.filter(tab => tab.visible);
  const activeTab = visibleTabs[0]; // First visible tab is active by default

  return (
    <div className="border-b border-metabase-gray-200 dark:border-metabase-gray-600">
      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
        {visibleTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => changeTab(tab.id)}
            className={clsx(
              'metabase-tab',
              tab.id === activeTab.id && 'metabase-tab-active'
            )}
          >
            {tab.name}
          </button>
        ))}
      </nav>
    </div>
  );
}; 