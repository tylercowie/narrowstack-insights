import React, { useState } from 'react';
import { useDashboard } from '@/lib/dashboard-context';
import { DashboardHeader } from './DashboardHeader';
import { DashboardTabs } from './DashboardTabs';
import { FilterBar } from '../filters/FilterBar';
import { DashboardGrid } from './DashboardGrid';
import { RefreshButton } from './RefreshButton';
import clsx from 'clsx';

export const DashboardLayout: React.FC = () => {
  const { dashboard, embedConfig, isLoading } = useDashboard();
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!dashboard) return null;

  const showHeader = embedConfig.titled !== false;
  const showBorder = embedConfig.bordered !== false;
  const showFilters = !embedConfig.hideParameters && dashboard.parameters.length > 0;

  const containerClass = clsx(
    'metabase-dashboard',
    {
      'metabase-embed-borderless': !showBorder,
      'p-4': showBorder,
      'bg-metabase-gray-100': showBorder,
      'dark:bg-metabase-gray-700': showBorder,
      'min-h-screen': true,
    }
  );

  const contentClass = clsx(
    'metabase-dashboard-content',
    {
      'metabase-card': showBorder,
      'p-6': showBorder,
      'space-y-4': true,
    }
  );

  return (
    <div className={containerClass}>
      <div className={contentClass}>
        {showHeader && (
          <DashboardHeader 
            isFullscreen={isFullscreen}
            onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
          />
        )}

        {dashboard.tabs.length > 1 && (
          <DashboardTabs />
        )}

        {showFilters && (
          <FilterBar />
        )}

        <div className="relative">
          {embedConfig.fullscreen !== false && (
            <div className="absolute top-0 right-0 z-10">
              <RefreshButton />
            </div>
          )}

          <DashboardGrid />
        </div>

        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-metabase-gray-200 rounded-lg p-4 shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-metabase-primary"></div>
                <span className="text-sm font-medium">Refreshing dashboard...</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 