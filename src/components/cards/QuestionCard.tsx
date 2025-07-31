import React from 'react';
import { QuestionCard as QuestionCardType } from '@/types';
import { BaseCard } from './BaseCard';
import { generateSampleData } from '@/data/sampleDashboards';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  FunnelChart, Funnel, LabelList
} from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface QuestionCardProps {
  card: QuestionCardType;
}

const COLORS = ['#509EE3', '#88BF4D', '#F9CF48', '#ED6E6E', '#A989C5'];

export const QuestionCard: React.FC<QuestionCardProps> = ({ card }) => {
  // Generate sample data based on visualization type
  const data = generateSampleData(card.visualization);

  const renderVisualization = () => {
    switch (card.visualization) {
      case 'number':
        return renderNumberCard(data);
      case 'line':
        return renderLineChart(data);
      case 'bar':
        return renderBarChart(data);
      case 'pie':
        return renderPieChart(data);
      case 'table':
        return renderTable(data);
      case 'funnel':
        return renderFunnelChart(data);
      case 'gauge':
        return renderGauge(data);
      default:
        return <div className="text-center text-metabase-gray-600">Visualization not implemented</div>;
    }
  };

  const renderNumberCard = (data: any) => {
    const formatNumber = (num: number) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(num);
    };

    return (
      <div className="text-center py-4">
        <div className="text-4xl font-bold text-metabase-gray-700 dark:text-metabase-gray-100">
          {formatNumber(data.value)}
        </div>
        {data.change !== undefined && (
          <div className="flex items-center justify-center mt-2">
            {data.change > 0 ? (
              <TrendingUp className="w-5 h-5 text-metabase-secondary mr-1" />
            ) : (
              <TrendingDown className="w-5 h-5 text-metabase-danger mr-1" />
            )}
            <span className={`text-sm font-medium ${data.change > 0 ? 'text-metabase-secondary' : 'text-metabase-danger'}`}>
              {Math.abs(data.change)}%
            </span>
            <span className="text-sm text-metabase-gray-600 ml-1">vs last period</span>
          </div>
        )}
      </div>
    );
  };

  const renderLineChart = (data: any) => (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="value"
          stroke={card.displayConfig?.colors?.[0] || COLORS[0]}
          strokeWidth={2}
          dot={{ r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );

  const renderBarChart = (data: any) => (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
        <XAxis dataKey="category" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip />
        <Bar dataKey="value" fill={card.displayConfig?.colors?.[0] || COLORS[0]} />
      </BarChart>
    </ResponsiveContainer>
  );

  const renderPieChart = (data: any) => (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={card.displayConfig?.labels !== false}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry: any, index: number) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        {card.displayConfig?.legend && <Legend />}
      </PieChart>
    </ResponsiveContainer>
  );

  const renderTable = (data: any) => (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-metabase-gray-300 dark:divide-metabase-gray-600">
        <thead>
          <tr>
            {data.columns.map((col: string, index: number) => (
              <th
                key={index}
                className="px-3 py-2 text-left text-xs font-medium text-metabase-gray-700 dark:text-metabase-gray-200 uppercase tracking-wider"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-metabase-gray-200 dark:divide-metabase-gray-600">
          {data.rows.map((row: any[], rowIndex: number) => (
            <tr key={rowIndex} className="hover:bg-metabase-gray-50 dark:hover:bg-metabase-gray-600">
              {row.map((cell: any, cellIndex: number) => (
                <td
                  key={cellIndex}
                  className="px-3 py-2 text-sm text-metabase-gray-600 dark:text-metabase-gray-300"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderFunnelChart = (data: any) => (
    <ResponsiveContainer width="100%" height={300}>
      <FunnelChart>
        <Tooltip />
        <Funnel
          dataKey="value"
          data={data}
          isAnimationActive
        >
          <LabelList position="center" fill="#fff" />
          {data.map((entry: any, index: number) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Funnel>
      </FunnelChart>
    </ResponsiveContainer>
  );

  const renderGauge = (data: any) => {
    const percentage = (data.value / data.max) * 100;
    const rotation = -90 + (percentage * 180) / 100;

    return (
      <div className="flex flex-col items-center justify-center py-8">
        <div className="relative w-48 h-24">
          <svg className="w-full h-full" viewBox="0 0 200 100">
            {/* Background arc */}
            <path
              d="M 10 90 A 80 80 0 0 1 190 90"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="20"
            />
            {/* Value arc */}
            <path
              d="M 10 90 A 80 80 0 0 1 190 90"
              fill="none"
              stroke={percentage >= 80 ? COLORS[1] : percentage >= 50 ? COLORS[2] : COLORS[3]}
              strokeWidth="20"
              strokeDasharray={`${percentage * 2.51} 251`}
            />
            {/* Needle */}
            <line
              x1="100"
              y1="90"
              x2="100"
              y2="20"
              stroke="#2E353B"
              strokeWidth="3"
              transform={`rotate(${rotation} 100 90)`}
            />
            <circle cx="100" cy="90" r="5" fill="#2E353B" />
          </svg>
        </div>
        <div className="text-2xl font-bold text-metabase-gray-700 dark:text-metabase-gray-100 mt-2">
          {data.value}%
        </div>
        {data.target && (
          <div className="text-sm text-metabase-gray-600 dark:text-metabase-gray-400">
            Target: {data.target}%
          </div>
        )}
      </div>
    );
  };

  return (
    <BaseCard card={card}>
      <div className="metabase-chart-container">
        {renderVisualization()}
      </div>
    </BaseCard>
  );
}; 