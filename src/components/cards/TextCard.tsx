import React from 'react';
import ReactMarkdown from 'react-markdown';
import { TextCard as TextCardType } from '@/types';
import { BaseCard } from './BaseCard';
import { useDashboard } from '@/lib/dashboard-context';

interface TextCardProps {
  card: TextCardType;
}

export const TextCard: React.FC<TextCardProps> = ({ card }) => {
  const { parameters, dashboard } = useDashboard();

  // Replace variables in content
  const processContent = (content: string): string => {
    // Replace parameter variables
    let processed = content.replace(/\{\{(\w+)\}\}/g, (match, paramName) => {
      const param = dashboard?.parameters.find(p => 
        p.slug === paramName || p.name === paramName || p.id === paramName
      );
      if (param && parameters[param.id] !== undefined) {
        return String(parameters[param.id]);
      }
      return match;
    });

    // Replace custom variables
    if (card.variables) {
      Object.entries(card.variables).forEach(([key, value]) => {
        processed = processed.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), value);
      });
    }

    // Handle conditionals: [[text if {{param}} exists]]
    processed = processed.replace(/\[\[(.+?) if \{\{(\w+)\}\} exists\]\]/g, (match, text, paramName) => {
      const param = dashboard?.parameters.find(p => 
        p.slug === paramName || p.name === paramName || p.id === paramName
      );
      if (param && parameters[param.id] !== undefined && parameters[param.id] !== null && parameters[param.id] !== '') {
        return text;
      }
      return '';
    });

    return processed;
  };

  const content = processContent(card.content);

  return (
    <BaseCard card={card}>
      <div className="metabase-markdown">
        <ReactMarkdown
          components={{
            // Custom link component to handle variables in URLs
            a: ({ href, children, ...props }) => {
              const processedHref = href ? processContent(href) : undefined;
              return (
                <a 
                  href={processedHref} 
                  className="text-metabase-primary hover:text-blue-600 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                  {...props}
                >
                  {children}
                </a>
              );
            },
            // Style other markdown elements
            h1: ({ children }) => (
              <h1 className="text-2xl font-bold text-metabase-gray-700 dark:text-metabase-gray-100 mb-4">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-xl font-bold text-metabase-gray-700 dark:text-metabase-gray-100 mb-3">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-lg font-semibold text-metabase-gray-700 dark:text-metabase-gray-100 mb-2">
                {children}
              </h3>
            ),
            p: ({ children }) => (
              <p className="text-sm text-metabase-gray-600 dark:text-metabase-gray-300 mb-3">
                {children}
              </p>
            ),
            ul: ({ children }) => (
              <ul className="list-disc list-inside space-y-1 mb-3">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal list-inside space-y-1 mb-3">
                {children}
              </ol>
            ),
            li: ({ children }) => (
              <li className="text-sm text-metabase-gray-600 dark:text-metabase-gray-300">
                {children}
              </li>
            ),
            code: ({ children, ...props }: any) => {
              const isInline = !props.className?.includes('language-');
              if (isInline) {
                return (
                  <code className="bg-metabase-gray-200 dark:bg-metabase-gray-600 px-1 py-0.5 rounded text-xs">
                    {children}
                  </code>
                );
              }
              return (
                <pre className="bg-metabase-gray-200 dark:bg-metabase-gray-600 p-3 rounded-md overflow-x-auto mb-3">
                  <code className="text-xs">{children}</code>
                </pre>
              );
            },
            hr: () => (
              <hr className="border-metabase-gray-300 dark:border-metabase-gray-600 my-4" />
            ),
            table: ({ children }) => (
              <div className="overflow-x-auto mb-3">
                <table className="min-w-full divide-y divide-metabase-gray-300 dark:divide-metabase-gray-600">
                  {children}
                </table>
              </div>
            ),
            th: ({ children }) => (
              <th className="px-3 py-2 text-left text-xs font-medium text-metabase-gray-700 dark:text-metabase-gray-200 uppercase tracking-wider">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="px-3 py-2 text-sm text-metabase-gray-600 dark:text-metabase-gray-300">
                {children}
              </td>
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </BaseCard>
  );
}; 