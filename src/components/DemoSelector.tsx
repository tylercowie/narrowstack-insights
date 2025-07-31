import React from 'react';
import { Link } from 'react-router-dom';
import { sampleDashboards } from '@/data/sampleDashboards';
import { BarChart3, Users, Code, Play } from 'lucide-react';

export const DemoSelector: React.FC = () => {
  const embedTypes = [
    {
      type: 'public',
      title: 'Public Embed',
      description: 'No authentication required. Great for public websites.',
      icon: <BarChart3 className="w-6 h-6" />,
      features: ['Interactive filters', 'Export capabilities', 'No auth needed'],
    },
    {
      type: 'signed',
      title: 'Signed Embed',
      description: 'Secure with JWT signing. Lock parameters for data control.',
      icon: <Users className="w-6 h-6" />,
      features: ['JWT security', 'Locked parameters', 'Row-level access'],
    },
    {
      type: 'interactive',
      title: 'Interactive Embed',
      description: 'Full interactivity with SSO integration.',
      icon: <Code className="w-6 h-6" />,
      features: ['SSO integration', 'Full drill-through', 'Edit capabilities'],
    },
  ];

  return (
    <div className="min-h-screen bg-metabase-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-metabase-gray-700 mb-4">
            Metabase-Style Dashboard Demos
          </h1>
          <p className="text-lg text-metabase-gray-600 max-w-2xl mx-auto">
            Explore comprehensive examples of Metabase-style dashboards with various embedding options,
            component types, and interactive features.
          </p>
        </div>

        {/* Sample Dashboards */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-metabase-gray-700 mb-6">Sample Dashboards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sampleDashboards.map((dashboard) => (
              <div key={dashboard.id} className="metabase-card p-6">
                <h3 className="text-xl font-semibold text-metabase-gray-700 mb-2">
                  {dashboard.title}
                </h3>
                <p className="text-metabase-gray-600 mb-4">{dashboard.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-metabase-primary text-white text-xs rounded">
                    {dashboard.embedType} embed
                  </span>
                  <span className="px-2 py-1 bg-metabase-gray-200 text-metabase-gray-700 text-xs rounded">
                    {dashboard.tabs.length} tabs
                  </span>
                  <span className="px-2 py-1 bg-metabase-gray-200 text-metabase-gray-700 text-xs rounded">
                    {dashboard.parameters.length} filters
                  </span>
                </div>
                <Link
                  to={`/embed/${dashboard.embedType}/dashboard/${dashboard.id}`}
                  className="metabase-button metabase-button-primary inline-block"
                >
                  View Dashboard
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Embedding Types */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-metabase-gray-700 mb-6">Embedding Types</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {embedTypes.map((embed) => (
              <div key={embed.type} className="metabase-card p-6">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-metabase-primary bg-opacity-10 rounded-lg text-metabase-primary">
                    {embed.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-metabase-gray-700 ml-3">
                    {embed.title}
                  </h3>
                </div>
                <p className="text-metabase-gray-600 mb-4">{embed.description}</p>
                <ul className="space-y-2">
                  {embed.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-metabase-secondary mr-2">✓</span>
                      <span className="text-sm text-metabase-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="text-center">
          <Link
            to="/playground"
            className="metabase-button metabase-button-secondary inline-flex items-center gap-2"
          >
            <Play className="w-4 h-4" />
            Embedding Playground
          </Link>
        </div>
      </div>
    </div>
  );
}; 