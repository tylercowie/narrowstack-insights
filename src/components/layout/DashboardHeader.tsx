import React from 'react';
import { useDashboard } from '@/lib/dashboard-context';
import { Maximize2, Minimize2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface DashboardHeaderProps {
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  isFullscreen,
  onToggleFullscreen,
}) => {
  const { dashboard, embedConfig, parameters } = useDashboard();

  if (!dashboard) return null;

  // Replace variables in title and description
  const replaceVariables = (text: string): string => {
    return text.replace(/\{\{(\w+)\}\}/g, (match, paramName) => {
      const param = dashboard.parameters.find(p => p.slug === paramName || p.name === paramName);
      if (param && parameters[param.id] !== undefined) {
        return String(parameters[param.id]);
      }
      return match;
    });
  };

  const title = replaceVariables(dashboard.title);
  const description = dashboard.description ? replaceVariables(dashboard.description) : null;

  return (
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-metabase-gray-700 dark:text-metabase-gray-100">
          {title}
        </h1>
        {description && (
          <div className="mt-2 text-sm text-metabase-gray-600 dark:text-metabase-gray-400">
            <ReactMarkdown className="metabase-markdown prose-sm">
              {description}
            </ReactMarkdown>
          </div>
        )}
      </div>

      {embedConfig.fullscreen !== false && (
        <button
          onClick={onToggleFullscreen}
          className="ml-4 p-2 text-metabase-gray-600 hover:text-metabase-gray-700 dark:text-metabase-gray-400 dark:hover:text-metabase-gray-300 transition-colors"
          title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
        >
          {isFullscreen ? (
            <Minimize2 className="w-5 h-5" />
          ) : (
            <Maximize2 className="w-5 h-5" />
          )}
        </button>
      )}
    </div>
  );
}; 