import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Dashboard, DashboardEvent, EmbedConfig } from '@/types';

interface DashboardContextValue {
  dashboard: Dashboard | null;
  parameters: Record<string, any>;
  embedConfig: EmbedConfig;
  isLoading: boolean;
  
  // Actions
  setParameter: (paramId: string, value: any) => void;
  setParameters: (params: Record<string, any>) => void;
  refreshDashboard: () => void;
  changeTab: (tabId: string) => void;
  
  // Events
  onEvent: (handler: (event: DashboardEvent) => void) => () => void;
  
  // Embed-specific
  isEmbedded: boolean;
  embedType: string;
  canEdit: boolean;
  canDrillThrough: boolean;
  canExport: boolean;
}

const DashboardContext = createContext<DashboardContextValue | null>(null);

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within DashboardProvider');
  }
  return context;
};

interface DashboardProviderProps {
  children: React.ReactNode;
  dashboard: Dashboard;
  initialParameters?: Record<string, any>;
  embedConfig?: Partial<EmbedConfig>;
  onParameterChange?: (params: Record<string, any>) => void;
}

export const DashboardProvider: React.FC<DashboardProviderProps> = ({
  children,
  dashboard,
  initialParameters = {},
  embedConfig: customEmbedConfig = {},
  onParameterChange,
}) => {
  const [parameters, setParametersState] = useState<Record<string, any>>(initialParameters);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTabId, setActiveTabId] = useState(dashboard.tabs[0]?.id);
  
  // Event handlers
  const eventHandlers = new Set<(event: DashboardEvent) => void>();
  
  // Merge embed configs
  const embedConfig: EmbedConfig = {
    downloadButtons: true,
    fullscreen: true,
    ...(dashboard.embedConfig || {}),
    ...customEmbedConfig,
  };
  
  // Parse URL parameters for embedded dashboards
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const urlParams = new URLSearchParams(window.location.search);
    const urlParameters: Record<string, any> = {};
    
    dashboard.parameters.forEach(param => {
      const value = urlParams.get(param.slug) || urlParams.get(`param_${param.slug}`);
      if (value !== null) {
        // Parse value based on parameter type
        if (param.type === 'number') {
          urlParameters[param.id] = parseFloat(value);
        } else if (param.type === 'boolean') {
          urlParameters[param.id] = value === 'true';
        } else if (param.type === 'date' || param.type === 'date/range') {
          urlParameters[param.id] = value; // Keep as string for date parsing
        } else {
          urlParameters[param.id] = value;
        }
      }
    });
    
    if (Object.keys(urlParameters).length > 0) {
      setParametersState(prev => ({ ...prev, ...urlParameters }));
    }
  }, [dashboard.parameters]);
  
  // Set parameter value
  const setParameter = useCallback((paramId: string, value: any) => {
    const param = dashboard.parameters.find(p => p.id === paramId);
    if (!param) return;
    
    // Check if parameter is locked
    if (param.locked || embedConfig.lockedParameters?.[paramId] !== undefined) {
      console.warn(`Parameter ${paramId} is locked and cannot be changed`);
      return;
    }
    
    setParametersState(prev => {
      const newParams = { ...prev, [paramId]: value };
      onParameterChange?.(newParams);
      
      // Emit event
      const event: DashboardEvent = {
        type: 'filter_change',
        payload: { paramId, value, allParams: newParams }
      };
      eventHandlers.forEach(handler => handler(event));
      
      return newParams;
    });
  }, [dashboard.parameters, embedConfig.lockedParameters, onParameterChange]);
  
  // Set multiple parameters
  const setParameters = useCallback((params: Record<string, any>) => {
    setParametersState(prev => {
      const newParams = { ...prev };
      
      Object.entries(params).forEach(([paramId, value]) => {
        const param = dashboard.parameters.find(p => p.id === paramId);
        if (param && !param.locked && embedConfig.lockedParameters?.[paramId] === undefined) {
          newParams[paramId] = value;
        }
      });
      
      onParameterChange?.(newParams);
      
      // Emit event
      const event: DashboardEvent = {
        type: 'filter_change',
        payload: { params: newParams }
      };
      eventHandlers.forEach(handler => handler(event));
      
      return newParams;
    });
  }, [dashboard.parameters, embedConfig.lockedParameters, onParameterChange]);
  
  // Refresh dashboard
  const refreshDashboard = useCallback(() => {
    setIsLoading(true);
    
    // Emit event
    const event: DashboardEvent = {
      type: 'refresh',
      payload: { timestamp: new Date().toISOString() }
    };
    eventHandlers.forEach(handler => handler(event));
    
    // Simulate refresh
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  
  // Change tab
  const changeTab = useCallback((tabId: string) => {
    const tab = dashboard.tabs.find(t => t.id === tabId);
    if (!tab || !tab.visible) return;
    
    setActiveTabId(tabId);
    
    // Emit event
    const event: DashboardEvent = {
      type: 'tab_change',
      payload: { tabId, tabName: tab.name }
    };
    eventHandlers.forEach(handler => handler(event));
  }, [dashboard.tabs]);
  
  // Event subscription
  const onEvent = useCallback((handler: (event: DashboardEvent) => void) => {
    eventHandlers.add(handler);
    return () => eventHandlers.delete(handler);
  }, []);
  
  // Determine capabilities based on embed type
  const isEmbedded = embedConfig !== dashboard.embedConfig;
  const canEdit = dashboard.embedType === 'interactive' && !embedConfig.lockedParameters;
  const canDrillThrough = dashboard.embedType !== 'public' && dashboard.embedType !== 'signed';
  const canExport = embedConfig.downloadButtons !== false;
  
  // Get current parameters with defaults and locked values
  const effectiveParameters = { ...parameters };
  dashboard.parameters.forEach(param => {
    // Apply defaults if not set
    if (effectiveParameters[param.id] === undefined && param.default !== undefined) {
      effectiveParameters[param.id] = param.default;
    }
    
    // Apply locked values
    if (embedConfig.lockedParameters?.[param.id] !== undefined) {
      effectiveParameters[param.id] = embedConfig.lockedParameters[param.id];
    }
  });
  
  const value: DashboardContextValue = {
    dashboard: {
      ...dashboard,
      tabs: dashboard.tabs.map(tab => ({
        ...tab,
        cards: tab.id === activeTabId ? tab.cards : []
      }))
    },
    parameters: effectiveParameters,
    embedConfig,
    isLoading,
    setParameter,
    setParameters,
    refreshDashboard,
    changeTab,
    onEvent,
    isEmbedded,
    embedType: dashboard.embedType,
    canEdit,
    canDrillThrough,
    canExport,
  };
  
  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}; 