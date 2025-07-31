import React from 'react';
import { RefreshCw } from 'lucide-react';
import { useDashboard } from '@/lib/dashboard-context';

export const RefreshButton: React.FC = () => {
  const { refreshDashboard, isLoading } = useDashboard();

  return (
    <button
      onClick={refreshDashboard}
      disabled={isLoading}
      className="metabase-button metabase-button-primary flex items-center gap-2"
      title="Refresh dashboard"
    >
      <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
      <span className="hidden sm:inline">Refresh</span>
    </button>
  );
}; 