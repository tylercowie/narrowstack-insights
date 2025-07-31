import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DashboardProvider } from '@/lib/dashboard-context';
import { DashboardLayout } from '../layout/DashboardLayout';
import { Dashboard, EmbedConfig } from '@/types';
import { parseEmbedParameters } from '@/lib/embed-utils';
import { sampleDashboards } from '@/data/sampleDashboards';

interface EmbeddedDashboardProps {
  dashboard?: Dashboard;
}

export const EmbeddedDashboard: React.FC<EmbeddedDashboardProps> = ({ dashboard: propDashboard }) => {
  const { embedType, dashboardId } = useParams<{ embedType: string; dashboardId: string }>();
  const [dashboard, setDashboard] = useState<Dashboard | null>(propDashboard || null);
  const [embedConfig, setEmbedConfig] = useState<Partial<EmbedConfig>>({});
  const [initialParameters, setInitialParameters] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(!propDashboard);

  useEffect(() => {
    if (propDashboard) return;

    // Parse URL parameters
    const { parameters, embedConfig: urlEmbedConfig } = parseEmbedParameters(window.location.href);
    setEmbedConfig(urlEmbedConfig);
    setInitialParameters(parameters);

    // Load dashboard (in real app, this would be an API call)
    const loadDashboard = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const foundDashboard = sampleDashboards.find(d => d.id === dashboardId);
        if (foundDashboard) {
          // Override embed type from URL
          setDashboard({
            ...foundDashboard,
            embedType: embedType as any || foundDashboard.embedType,
          });
        }
      } catch (error) {
        console.error('Failed to load dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [dashboardId, embedType, propDashboard]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-metabase-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-metabase-primary mx-auto mb-4"></div>
          <p className="text-metabase-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-metabase-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-metabase-gray-700 mb-2">Dashboard Not Found</h1>
          <p className="text-metabase-gray-600">The requested dashboard does not exist or you don't have access to it.</p>
        </div>
      </div>
    );
  }

  return (
    <DashboardProvider
      dashboard={dashboard}
      initialParameters={initialParameters}
      embedConfig={embedConfig}
      onParameterChange={(params) => {
        // In a real app, this would update the URL or notify the parent window
        console.log('Parameters changed:', params);
        
        // Post message to parent window for cross-origin communication
        if (window.parent !== window) {
          window.parent.postMessage({
            type: 'metabase:parameters:change',
            dashboardId: dashboard.id,
            parameters: params,
          }, '*');
        }
      }}
    >
      <DashboardLayout />
    </DashboardProvider>
  );
}; 