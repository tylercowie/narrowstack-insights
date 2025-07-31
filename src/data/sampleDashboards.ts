import { Dashboard } from '@/types';

export const sampleDashboards: Dashboard[] = [
  {
    id: 'sales-analytics',
    title: 'Sales Analytics Dashboard',
    description: 'Real-time sales performance metrics for {{region}} region',
    theme: 'light',
    embedType: 'public',
    embedConfig: {
      bordered: true,
      titled: true,
      downloadButtons: true,
      fullscreen: true,
    },
    tabs: [
      {
        id: 'overview',
        name: 'Overview',
        order: 1,
        visible: true,
        cards: [
          {
            id: 'revenue-metric',
            type: 'question',
            title: 'Total Revenue',
            subtitle: 'Year to date',
            visualization: 'number',
            gridPosition: { x: 0, y: 0, w: 6, h: 4 },
            query: {
              database: 'sample',
              type: 'query',
              query: {
                sourceTable: 1,
                aggregation: [{ type: 'sum', field: 'revenue' }],
                filter: [{ field: 'date', operator: '>=', value: '2025-01-01' }],
              },
            },
            displayConfig: {
              tooltips: true,
            },
          },
          {
            id: 'sales-trend',
            type: 'question',
            title: 'Sales Trend',
            visualization: 'line',
            gridPosition: { x: 6, y: 0, w: 12, h: 4 },
            query: {
              database: 'sample',
              type: 'query',
              query: {
                sourceTable: 1,
                aggregation: [{ type: 'sum', field: 'revenue' }],
                breakout: [{ field: 'date', temporal: 'month' }],
              },
            },
            displayConfig: {
              colors: ['#509EE3'],
              xAxis: { title: 'Month' },
              yAxis: { title: 'Revenue ($)' },
              tooltips: true,
              trendline: true,
            },
          },
          {
            id: 'info-text',
            type: 'text',
            gridPosition: { x: 0, y: 4, w: 18, h: 2 },
            content: `# Sales Performance Summary

**Current Region**: {{region}}  
**Report Period**: {{date_range}}

This dashboard provides real-time insights into sales performance metrics. [[Click here for detailed analysis if {{detailed_view}} exists]](https://example.com/analysis?region={{region}})

Key metrics include:
- Revenue trends
- Product performance
- Regional breakdowns
- Customer segments`,
            variables: {
              detailed_view: 'true',
            },
          },
        ],
      },
      {
        id: 'details',
        name: 'Detailed Analysis',
        order: 2,
        visible: true,
        cards: [
          {
            id: 'product-breakdown',
            type: 'question',
            title: 'Product Category Breakdown',
            visualization: 'pie',
            gridPosition: { x: 0, y: 0, w: 9, h: 6 },
            query: {
              database: 'sample',
              type: 'query',
              query: {
                sourceTable: 1,
                aggregation: [{ type: 'sum', field: 'revenue' }],
                breakout: [{ field: 'product_category' }],
              },
            },
            displayConfig: {
              colors: ['#509EE3', '#88BF4D', '#F9CF48', '#ED6E6E', '#A989C5'],
              labels: true,
              tooltips: true,
            },
          },
          {
            id: 'regional-table',
            type: 'question',
            title: 'Regional Performance',
            visualization: 'table',
            gridPosition: { x: 9, y: 0, w: 9, h: 6 },
            query: {
              database: 'sample',
              type: 'query',
              query: {
                sourceTable: 1,
                aggregation: [
                  { type: 'sum', field: 'revenue' },
                  { type: 'count' },
                  { type: 'avg', field: 'order_value' },
                ],
                breakout: [{ field: 'region' }],
                orderBy: [{ field: 'revenue', direction: 'desc' }],
              },
            },
            displayConfig: {
              conditionalFormatting: [
                {
                  column: 'revenue',
                  operator: '>',
                  value: 1000000,
                  backgroundColor: '#E6F7E6',
                },
              ],
            },
          },
        ],
      },
    ],
    parameters: [
      {
        id: 'region',
        name: 'Region',
        slug: 'region',
        type: 'category',
        widget: 'dropdown',
        default: 'North America',
        widgetConfig: {
          options: [
            { value: 'North America', label: 'North America' },
            { value: 'Europe', label: 'Europe' },
            { value: 'Asia Pacific', label: 'Asia Pacific' },
            { value: 'Latin America', label: 'Latin America' },
          ],
        },
        mappings: [
          { cardId: 'revenue-metric', target: ['filter', 'region'] },
          { cardId: 'sales-trend', target: ['filter', 'region'] },
          { cardId: 'product-breakdown', target: ['filter', 'region'] },
        ],
      },
      {
        id: 'date_range',
        name: 'Date Range',
        slug: 'date_range',
        type: 'date/range',
        widget: 'date_range',
        default: 'last_30_days',
        widgetConfig: {
          autoApply: true,
        },
        mappings: [
          { cardId: 'revenue-metric', target: ['filter', 'date'] },
          { cardId: 'sales-trend', target: ['filter', 'date'] },
        ],
      },
      {
        id: 'min_revenue',
        name: 'Minimum Revenue',
        slug: 'min_revenue',
        type: 'number',
        widget: 'number_input',
        widgetConfig: {
          min: 0,
          step: 1000,
          placeholder: 'Enter minimum revenue',
        },
        mappings: [
          { cardId: 'regional-table', target: ['filter', 'revenue', '>'] },
        ],
      },
    ],
    layout: {
      cols: 18,
      rowHeight: 60,
      margin: [16, 16],
      containerPadding: [16, 16],
    },
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z',
  },
  {
    id: 'customer-insights',
    title: 'Customer Insights Dashboard',
    description: 'Customer behavior and segmentation analysis',
    theme: 'light',
    embedType: 'signed',
    embedConfig: {
      bordered: true,
      titled: true,
      downloadButtons: false,
      fullscreen: true,
      lockedParameters: {
        company_id: '12345',
      },
      hiddenParameters: ['company_id'],
    },
    tabs: [
      {
        id: 'segments',
        name: 'Customer Segments',
        order: 1,
        visible: true,
        cards: [
          {
            id: 'segment-funnel',
            type: 'question',
            title: 'Customer Journey Funnel',
            visualization: 'funnel',
            gridPosition: { x: 0, y: 0, w: 9, h: 6 },
            query: {
              database: 'sample',
              type: 'query',
              query: {
                sourceTable: 2,
                aggregation: [{ type: 'count' }],
                breakout: [{ field: 'journey_stage' }],
              },
            },
            displayConfig: {
              colors: ['#509EE3'],
              labels: true,
              tooltips: true,
            },
          },
          {
            id: 'retention-gauge',
            type: 'question',
            title: 'Customer Retention Rate',
            visualization: 'gauge',
            gridPosition: { x: 9, y: 0, w: 9, h: 6 },
            query: {
              database: 'sample',
              type: 'native',
              native: {
                query: 'SELECT retention_rate FROM metrics WHERE company_id = {{company_id}}',
                templateTags: {
                  company_id: {
                    name: 'company_id',
                    displayName: 'Company ID',
                    type: 'text',
                    required: true,
                  },
                },
              },
            },
            displayConfig: {
              goalLine: 80,
              colors: ['#ED6E6E', '#F9CF48', '#88BF4D'],
            },
          },
          {
            id: 'action-buttons',
            type: 'action',
            title: 'Export Reports',
            actionType: 'http',
            label: 'Generate PDF Report',
            color: 'primary',
            gridPosition: { x: 0, y: 6, w: 6, h: 2 },
            payload: {
              url: '/api/reports/generate',
              method: 'POST',
              body: {
                dashboardId: 'customer-insights',
                format: 'pdf',
              },
            },
          },
          {
            id: 'external-link',
            type: 'link',
            title: 'View in CRM',
            url: 'https://crm.example.com/customers?company={{company_id}}&segment={{segment}}',
            openInNewTab: true,
            icon: 'external-link',
            gridPosition: { x: 6, y: 6, w: 6, h: 2 },
          },
        ],
      },
    ],
    parameters: [
      {
        id: 'company_id',
        name: 'Company ID',
        slug: 'company_id',
        type: 'text',
        widget: 'input',
        locked: true,
        hidden: true,
        mappings: [
          { cardId: 'retention-gauge', target: ['templateTags', 'company_id'] },
        ],
      },
      {
        id: 'segment',
        name: 'Customer Segment',
        slug: 'segment',
        type: 'category',
        widget: 'dropdown',
        widgetConfig: {
          options: [
            { value: 'enterprise', label: 'Enterprise' },
            { value: 'mid-market', label: 'Mid-Market' },
            { value: 'small-business', label: 'Small Business' },
          ],
          multiSelect: true,
        },
        mappings: [
          { cardId: 'segment-funnel', target: ['filter', 'segment'] },
        ],
      },
    ],
    layout: {
      cols: 18,
      rowHeight: 60,
      margin: [16, 16],
      containerPadding: [16, 16],
    },
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z',
  },
];

// Generate sample data for visualizations
export const generateSampleData = (visualization: string, params?: any) => {
  switch (visualization) {
    case 'number':
      return {
        value: 2456789,
        previousValue: 2234567,
        change: 9.95,
      };

    case 'line':
      return Array.from({ length: 12 }, (_, i) => ({
        date: new Date(2024, i, 1).toISOString(),
        value: Math.floor(Math.random() * 100000) + 50000,
      }));

    case 'bar':
      return Array.from({ length: 5 }, (_, i) => ({
        category: `Category ${i + 1}`,
        value: Math.floor(Math.random() * 10000) + 1000,
      }));

    case 'pie':
      return [
        { name: 'Electronics', value: 35 },
        { name: 'Clothing', value: 25 },
        { name: 'Home & Garden', value: 20 },
        { name: 'Sports', value: 12 },
        { name: 'Other', value: 8 },
      ];

    case 'table':
      return {
        columns: ['Region', 'Revenue', 'Orders', 'Avg Order Value'],
        rows: [
          ['North America', '$1,234,567', '1,234', '$1,001'],
          ['Europe', '$987,654', '987', '$1,000'],
          ['Asia Pacific', '$876,543', '876', '$1,000'],
          ['Latin America', '$654,321', '654', '$1,000'],
        ],
      };

    case 'funnel':
      return [
        { stage: 'Visitors', value: 10000 },
        { stage: 'Sign-ups', value: 5000 },
        { stage: 'Active Users', value: 3000 },
        { stage: 'Paid Customers', value: 1000 },
        { stage: 'Enterprise', value: 200 },
      ];

    case 'gauge':
      return {
        value: 75,
        min: 0,
        max: 100,
        target: 80,
      };

    default:
      return null;
  }
}; 