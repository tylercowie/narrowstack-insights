import React, { useState } from 'react';
import { sampleDashboards } from '@/data/sampleDashboards';
import { generateEmbedUrl, generateIframeCode } from '@/lib/embed-utils';
import { Copy, Code } from 'lucide-react';

export const EmbedPlayground: React.FC = () => {
  const [selectedDashboard, setSelectedDashboard] = useState(sampleDashboards[0].id);
  const [embedType, setEmbedType] = useState<'public' | 'signed' | 'interactive' | 'sdk'>('public');
  const [bordered, setBordered] = useState(true);
  const [titled, setTitled] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark' | 'night' | 'transparent'>('light');
  const [hideParameters, setHideParameters] = useState(false);
  const [width, setWidth] = useState('100%');
  const [height, setHeight] = useState('600');
  const [parameters, setParameters] = useState<Record<string, string>>({});
  const [lockedParams, setLockedParams] = useState<string[]>([]);

  const dashboard = sampleDashboards.find(d => d.id === selectedDashboard);
  
  const embedUrl = generateEmbedUrl({
    dashboardId: selectedDashboard,
    embedType,
    baseUrl: window.location.origin,
    parameters,
    embedConfig: {
      bordered,
      titled,
      theme,
      hideParameters,
      lockedParameters: lockedParams.reduce((acc, param) => ({
        ...acc,
        [param]: parameters[param],
      }), {}),
    },
    secretKey: 'your-secret-key', // In production, this would be server-side
  });

  const iframeCode = generateIframeCode({
    url: embedUrl,
    width,
    height,
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-metabase-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-metabase-gray-700 mb-8">Embedding Playground</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Configuration Panel */}
          <div className="lg:col-span-1">
            <div className="metabase-card p-6 space-y-6">
              <h2 className="text-lg font-semibold text-metabase-gray-700">Configuration</h2>

              {/* Dashboard Selection */}
              <div>
                <label className="block text-sm font-medium text-metabase-gray-700 mb-2">
                  Dashboard
                </label>
                <select
                  value={selectedDashboard}
                  onChange={(e) => setSelectedDashboard(e.target.value)}
                  className="metabase-filter w-full"
                >
                  {sampleDashboards.map(d => (
                    <option key={d.id} value={d.id}>{d.title}</option>
                  ))}
                </select>
              </div>

              {/* Embed Type */}
              <div>
                <label className="block text-sm font-medium text-metabase-gray-700 mb-2">
                  Embed Type
                </label>
                <select
                  value={embedType}
                  onChange={(e) => setEmbedType(e.target.value as any)}
                  className="metabase-filter w-full"
                >
                  <option value="public">Public</option>
                  <option value="signed">Signed</option>
                  <option value="interactive">Interactive</option>
                  <option value="sdk">SDK</option>
                </select>
              </div>

              {/* Theme */}
              <div>
                <label className="block text-sm font-medium text-metabase-gray-700 mb-2">
                  Theme
                </label>
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value as any)}
                  className="metabase-filter w-full"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="night">Night</option>
                  <option value="transparent">Transparent</option>
                </select>
              </div>

              {/* Display Options */}
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={bordered}
                    onChange={(e) => setBordered(e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-metabase-gray-700">Show Border</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={titled}
                    onChange={(e) => setTitled(e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-metabase-gray-700">Show Title</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={hideParameters}
                    onChange={(e) => setHideParameters(e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-metabase-gray-700">Hide Parameters</span>
                </label>
              </div>

              {/* Dimensions */}
              <div>
                <label className="block text-sm font-medium text-metabase-gray-700 mb-2">
                  Dimensions
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    placeholder="Width"
                    className="metabase-filter"
                  />
                  <input
                    type="text"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="Height"
                    className="metabase-filter"
                  />
                </div>
              </div>

              {/* Parameters */}
              {dashboard && dashboard.parameters.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-metabase-gray-700 mb-2">
                    Parameters
                  </label>
                  <div className="space-y-2">
                    {dashboard.parameters.map(param => (
                      <div key={param.id}>
                        <input
                          type="text"
                          value={parameters[param.id] || ''}
                          onChange={(e) => setParameters({
                            ...parameters,
                            [param.id]: e.target.value,
                          })}
                          placeholder={param.name}
                          className="metabase-filter w-full mb-1"
                        />
                        {embedType === 'signed' && (
                          <label className="flex items-center text-xs">
                            <input
                              type="checkbox"
                              checked={lockedParams.includes(param.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setLockedParams([...lockedParams, param.id]);
                                } else {
                                  setLockedParams(lockedParams.filter(p => p !== param.id));
                                }
                              }}
                              className="mr-1"
                            />
                            Lock this parameter
                          </label>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Preview and Code */}
          <div className="lg:col-span-2 space-y-6">
            {/* Embed URL */}
            <div className="metabase-card p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-metabase-gray-700">Embed URL</h3>
                <button
                  onClick={() => copyToClipboard(embedUrl)}
                  className="p-2 text-metabase-gray-600 hover:text-metabase-gray-700"
                  title="Copy URL"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <code className="block p-3 bg-metabase-gray-100 rounded text-xs overflow-x-auto">
                {embedUrl}
              </code>
            </div>

            {/* Iframe Code */}
            <div className="metabase-card p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-metabase-gray-700">Iframe Code</h3>
                <button
                  onClick={() => copyToClipboard(iframeCode)}
                  className="p-2 text-metabase-gray-600 hover:text-metabase-gray-700"
                  title="Copy code"
                >
                  <Code className="w-4 h-4" />
                </button>
              </div>
              <pre className="p-3 bg-metabase-gray-100 rounded text-xs overflow-x-auto">
                <code>{iframeCode}</code>
              </pre>
            </div>

            {/* Live Preview */}
            <div className="metabase-card p-6">
              <h3 className="text-lg font-semibold text-metabase-gray-700 mb-3">Live Preview</h3>
              <div className="border border-metabase-gray-300 rounded overflow-hidden">
                <iframe
                  src={embedUrl}
                  width={width}
                  height={height}
                  frameBorder="0"
                  className="mx-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 