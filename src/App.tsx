import React, { useState } from 'react';
import GridLayout from 'react-grid-layout';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ScatterChart, Scatter, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

// Card types matching Metabase
type CardType = 'line' | 'bar' | 'area' | 'scatter' | 'pie' | 'donut' | 'number' | 'trend' | 
                'table' | 'pivot' | 'funnel' | 'progress' | 'gauge' | 'text' | 'filter' | 'map';

interface FilterConfig {
  type: string;
  name: string;
  widget: string;
  required?: boolean;
  multiSelect?: boolean;
  defaultValue?: string;
}

interface DashboardCard {
  id: string;
  type: CardType;
  title: string;
  x: number;
  y: number;
  w: number;
  h: number;
  filterConfig?: FilterConfig;
}

// Metabase colors
const COLORS = {
  brand: '#509EE3',
  success: '#84BB4C',
  danger: '#ED6E6E',
  warning: '#F9CF48',
  purple: '#A989C5',
  text: '#4C5773',
  textLight: '#949AAB',
  bg: '#F9FBFC',
  border: '#EEECEC'
};

const CHART_COLORS = ['#509EE3', '#88BF4D', '#A989C5', '#EF8C8C', '#F9CF48', '#7172AD', '#6DDDD2', '#E68AB1'];

// Sample data generators
const generateLineData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map(month => ({
    month,
    revenue: Math.floor(Math.random() * 50000) + 30000,
    profit: Math.floor(Math.random() * 20000) + 10000,
    customers: Math.floor(Math.random() * 1000) + 500
  }));
};

const generateBarData = () => {
  const categories = ['HVAC', 'Plumbing', 'Electrical', 'Appliance', 'Handyman'];
  return categories.map(category => ({
    category,
    sales: Math.floor(Math.random() * 10000) + 2000,
    returns: Math.floor(Math.random() * 500) + 100
  }));
};

const generatePieData = () => {
  return [
    { name: 'Desktop', value: 45, color: CHART_COLORS[0] },
    { name: 'Mobile', value: 30, color: CHART_COLORS[1] },
    { name: 'Tablet', value: 15, color: CHART_COLORS[2] },
    { name: 'Other', value: 10, color: CHART_COLORS[3] }
  ];
};

const generateScatterData = () => {
  return Array.from({ length: 50 }, () => ({
    x: Math.floor(Math.random() * 100),
    y: Math.floor(Math.random() * 100),
    z: Math.floor(Math.random() * 50) + 10
  }));
};

// Home Services Dashboard Template with better grid alignment
const createHomeServicesDashboard = (): { tabs: string[], cards: DashboardCard[], filters: DashboardCard[] } => {
  const timestamp = Date.now();
  return {
    tabs: ['Overview', 'Service Performance', 'Customer Insights', 'Financials', 'Operations'],
    filters: [
      // Filters for each tab
      { id: `filter-Overview-${timestamp}-1`, type: 'filter', title: 'Date Range', x: 0, y: 0, w: 4, h: 2 },
      { id: `filter-Overview-${timestamp}-2`, type: 'filter', title: 'Service Type', x: 4, y: 0, w: 3, h: 2 },
      { id: `filter-Service Performance-${timestamp}-1`, type: 'filter', title: 'Time Period', x: 0, y: 0, w: 4, h: 2 },
      { id: `filter-Service Performance-${timestamp}-2`, type: 'filter', title: 'Region', x: 4, y: 0, w: 3, h: 2 },
      { id: `filter-Customer Insights-${timestamp}-1`, type: 'filter', title: 'Customer Segment', x: 0, y: 0, w: 4, h: 2 },
      { id: `filter-Financials-${timestamp}-1`, type: 'filter', title: 'Fiscal Period', x: 0, y: 0, w: 4, h: 2 },
      { id: `filter-Operations-${timestamp}-1`, type: 'filter', title: 'Department', x: 0, y: 0, w: 3, h: 2 },
    ],
    cards: [
      // Overview Tab - 3 rows max
      // Row 1: 4 key metrics
      { id: `card-${timestamp}-1`, type: 'number', title: 'Total Revenue MTD', x: 0, y: 0, w: 4, h: 3 },
      { id: `card-${timestamp}-2`, type: 'trend', title: 'Active Jobs', x: 4, y: 0, w: 5, h: 3 },
      { id: `card-${timestamp}-3`, type: 'number', title: 'Customer Satisfaction', x: 9, y: 0, w: 4, h: 3 },
      { id: `card-${timestamp}-4`, type: 'gauge', title: 'On-Time Completion Rate', x: 13, y: 0, w: 5, h: 3 },
      
      // Row 2: 2 large charts
      { id: `card-${timestamp}-5`, type: 'line', title: 'Revenue Trend - Last 12 Months', x: 0, y: 3, w: 9, h: 5 },
      { id: `card-${timestamp}-6`, type: 'bar', title: 'Service Calls by Type', x: 9, y: 3, w: 9, h: 5 },
      
      // Row 3: Mixed content
      { id: `card-${timestamp}-7`, type: 'pie', title: 'Revenue by Service Category', x: 0, y: 8, w: 6, h: 4 },
      { id: `card-${timestamp}-8`, type: 'table', title: 'Top Performing Technicians', x: 6, y: 8, w: 7, h: 4 },
      { id: `card-${timestamp}-10`, type: 'text', title: 'Executive Summary', x: 13, y: 8, w: 5, h: 4 },
      
      // Service Performance Tab - 3 rows
      // Row 1
      { id: `card-${timestamp}-12`, type: 'bar', title: 'Average Response Time by Service Type', x: 0, y: 0, w: 6, h: 4 },
      { id: `card-${timestamp}-13`, type: 'line', title: 'First-Time Fix Rate Trend', x: 6, y: 0, w: 6, h: 4 },
      { id: `card-${timestamp}-14`, type: 'scatter', title: 'Job Duration vs Complexity', x: 12, y: 0, w: 6, h: 4 },
      // Row 2
      { id: `card-${timestamp}-15`, type: 'funnel', title: 'Service Request to Completion', x: 0, y: 4, w: 9, h: 4 },
      { id: `card-${timestamp}-16`, type: 'pivot', title: 'Service Metrics by Region', x: 9, y: 4, w: 9, h: 4 },
      // Row 3
      { id: `card-${timestamp}-17`, type: 'progress', title: 'Monthly Service Goal', x: 0, y: 8, w: 6, h: 3 },
      { id: `card-${timestamp}-18`, type: 'number', title: 'Avg Service Rating', x: 6, y: 8, w: 6, h: 3 },
      { id: `card-${timestamp}-37`, type: 'gauge', title: 'Efficiency Score', x: 12, y: 8, w: 6, h: 3 },
      
      // Customer Insights Tab - 3 rows
      // Row 1
      { id: `card-${timestamp}-19`, type: 'donut', title: 'Customer Segments', x: 0, y: 0, w: 6, h: 4 },
      { id: `card-${timestamp}-20`, type: 'area', title: 'Customer Acquisition Trend', x: 6, y: 0, w: 12, h: 4 },
      // Row 2
      { id: `card-${timestamp}-21`, type: 'bar', title: 'Customer Lifetime Value by Segment', x: 0, y: 4, w: 9, h: 4 },
      { id: `card-${timestamp}-22`, type: 'table', title: 'Recent Customer Feedback', x: 9, y: 4, w: 9, h: 4 },
      // Row 3
      { id: `card-${timestamp}-23`, type: 'number', title: 'Net Promoter Score', x: 0, y: 8, w: 6, h: 3 },
      { id: `card-${timestamp}-24`, type: 'trend', title: 'Repeat Customers', x: 6, y: 8, w: 6, h: 3 },
      { id: `card-${timestamp}-38`, type: 'progress', title: 'Satisfaction Target', x: 12, y: 8, w: 6, h: 3 },
      
      // Financials Tab - 3 rows
      // Row 1: 3 metrics
      { id: `card-${timestamp}-25`, type: 'number', title: 'Gross Margin %', x: 0, y: 0, w: 6, h: 3 },
      { id: `card-${timestamp}-26`, type: 'number', title: 'Operating Expenses', x: 6, y: 0, w: 6, h: 3 },
      { id: `card-${timestamp}-27`, type: 'trend', title: 'Cash Flow', x: 12, y: 0, w: 6, h: 3 },
      // Row 2: Large trend
      { id: `card-${timestamp}-28`, type: 'area', title: 'Revenue vs Costs Trend', x: 0, y: 3, w: 18, h: 4 },
      // Row 3: 2 panels
      { id: `card-${timestamp}-29`, type: 'bar', title: 'Revenue by Payment Method', x: 0, y: 7, w: 9, h: 4 },
      { id: `card-${timestamp}-30`, type: 'table', title: 'Outstanding Invoices', x: 9, y: 7, w: 9, h: 4 },
      
      // Operations Tab - 3 rows
      // Row 1
      { id: `card-${timestamp}-31`, type: 'gauge', title: 'Fleet Utilization', x: 0, y: 0, w: 6, h: 3 },
      { id: `card-${timestamp}-32`, type: 'number', title: 'Active Technicians', x: 6, y: 0, w: 6, h: 3 },
      { id: `card-${timestamp}-33`, type: 'progress', title: 'Inventory Health', x: 12, y: 0, w: 6, h: 3 },
      // Row 2
      { id: `card-${timestamp}-34`, type: 'line', title: 'Technician Productivity Trend', x: 0, y: 3, w: 9, h: 4 },
      { id: `card-${timestamp}-39`, type: 'bar', title: 'Inventory Levels by Category', x: 9, y: 3, w: 9, h: 4 },
      // Row 3
      { id: `card-${timestamp}-35`, type: 'table', title: 'Equipment Maintenance Schedule', x: 0, y: 7, w: 9, h: 4 },
      { id: `card-${timestamp}-36`, type: 'pie', title: 'Time Allocation by Activity', x: 9, y: 7, w: 9, h: 4 },
    ]
  };
};

export const App: React.FC = () => {
  const [cards, setCards] = useState<DashboardCard[]>([]);
  const [dashboardName, setDashboardName] = useState('Executive Dashboard');
  const [activeTab, setActiveTab] = useState('Overview');
  const [tabs, setTabs] = useState(['Overview', 'Details', 'Analysis']);
  const [containerWidth, setContainerWidth] = useState(1200);
  const [filters, setFilters] = useState<DashboardCard[]>([]);
  const [showFilterBuilder, setShowFilterBuilder] = useState(false);
  const [filterBuilderConfig, setFilterBuilderConfig] = useState<FilterConfig>({
    type: 'date',
    name: '',
    widget: 'date-range'
  });
  
  // Update container width on window resize
  React.useEffect(() => {
    const updateWidth = () => {
      const padding = 48; // 24px on each side
      setContainerWidth(window.innerWidth - padding);
    };
    
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const addCard = (type: CardType) => {
    const titles: Record<CardType, string> = {
      line: 'Revenue Trend',
      bar: 'Sales by Category',
      area: 'Traffic Sources',
      scatter: 'Price vs Performance',
      pie: 'Market Share',
      donut: 'User Demographics',
      number: 'Total Revenue',
      trend: 'Growth Rate',
      table: 'Recent Transactions',
      pivot: 'Sales by Region',
      funnel: 'Conversion Funnel',
      progress: 'Goal Progress',
      gauge: 'Performance Score',
      text: 'Key Insights',
      filter: 'Date Range',
      map: 'Sales by Location'
    };

    const sizes: Record<CardType, { w: number; h: number }> = {
      line: { w: 8, h: 5 },
      bar: { w: 6, h: 5 },
      area: { w: 8, h: 5 },
      scatter: { w: 6, h: 5 },
      pie: { w: 4, h: 5 },
      donut: { w: 4, h: 5 },
      number: { w: 3, h: 3 },
      trend: { w: 3, h: 3 },
      table: { w: 8, h: 6 },
      pivot: { w: 6, h: 5 },
      funnel: { w: 4, h: 5 },
      progress: { w: 3, h: 2 },
      gauge: { w: 3, h: 3 },
      text: { w: 4, h: 3 },
      filter: { w: 3, h: 2 },
      map: { w: 6, h: 6 }
    };

    // Calculate position for new card
    let newX = 0;
    let newY = 0;
    
    if (type !== 'filter') {
      // For regular cards, find the rightmost position in the current row
      const visibleCards = cards.filter(card => {
        // Filter cards based on active tab if using Home Services template
        if (dashboardName.includes('Home Services')) {
          switch (activeTab) {
            case 'Overview':
              return card.id.includes('-1') || card.id.includes('-2') || card.id.includes('-3') || 
                     card.id.includes('-4') || card.id.includes('-5') || card.id.includes('-6') || 
                     card.id.includes('-7') || card.id.includes('-8') || card.id.includes('-9') || 
                     card.id.includes('-10') || card.id.includes('-11');
            case 'Service Performance':
              return card.id.includes('-12') || card.id.includes('-13') || card.id.includes('-14') || 
                     card.id.includes('-15') || card.id.includes('-16') || card.id.includes('-17') || 
                     card.id.includes('-18') || card.id.includes('-37');
            case 'Customer Insights':
              return card.id.includes('-19') || card.id.includes('-20') || card.id.includes('-21') || 
                     card.id.includes('-22') || card.id.includes('-23') || card.id.includes('-24') || 
                     card.id.includes('-38');
            case 'Financials':
              return card.id.includes('-25') || card.id.includes('-26') || card.id.includes('-27') || 
                     card.id.includes('-28') || card.id.includes('-29') || card.id.includes('-30');
            case 'Operations':
              return card.id.includes('-31') || card.id.includes('-32') || card.id.includes('-33') || 
                     card.id.includes('-34') || card.id.includes('-35') || card.id.includes('-36') || 
                     card.id.includes('-39');
            default:
              return true;
          }
        }
        return true;
      });
      
      if (visibleCards.length > 0) {
        // Group cards by row (y position)
        const rows = new Map<number, DashboardCard[]>();
        visibleCards.forEach(card => {
          const row = rows.get(card.y) || [];
          row.push(card);
          rows.set(card.y, row);
        });
        
        // Find the last row
        const lastY = Math.max(...Array.from(rows.keys()));
        const lastRowCards = rows.get(lastY) || [];
        
        // Calculate the rightmost position in the last row
        let rightmostX = 0;
        lastRowCards.forEach(card => {
          const cardRight = card.x + card.w;
          if (cardRight > rightmostX) {
            rightmostX = cardRight;
          }
        });
        
        // Check if new card fits in the current row
        if (rightmostX + sizes[type].w <= 18) {
          newX = rightmostX;
          newY = lastY;
        } else {
          // Move to next row
          newX = 0;
          newY = lastY + Math.max(...lastRowCards.map(c => c.h));
        }
      }
    }
    
    const newCard: DashboardCard = {
      id: `card-${Date.now()}`,
      type,
      title: titles[type],
      x: newX,
      y: newY,
      ...sizes[type]
    };
    
    if (type === 'filter') {
      // Add filters to the filter area with automatic wrapping
      const tabFilters = filters.filter(f => f.id.includes(`-${activeTab}-`));
      newCard.id = `filter-${activeTab}-${Date.now()}`;
      
      // Calculate position with wrapping
      let x = 0;
      let y = 0;
      tabFilters.forEach(filter => {
        if (x + filter.w > 18) {
          x = 0;
          y += 2;
        }
        x += filter.w;
      });
      
      // Check if new filter fits in current row
      if (x + newCard.w > 18) {
        x = 0;
        y += 2;
      }
      
      newCard.x = x;
      newCard.y = y;
      setFilters([...filters, newCard]);
    } else {
      setCards([...cards, newCard]);
    }
  };

  const onLayoutChange = (layout: any[]) => {
    setCards(cards.map(card => {
      const layoutItem = layout.find(l => l.i === card.id);
      if (layoutItem) {
        return {
          ...card,
          x: layoutItem.x,
          y: layoutItem.y,
          w: layoutItem.w,
          h: layoutItem.h
        };
      }
      return card;
    }));
  };

  const autoOrganizeCards = () => {
    const visibleCards = cards.filter(card => {
      if (dashboardName.includes('Home Services')) {
        switch (activeTab) {
          case 'Overview':
            return card.id.includes('-1') || card.id.includes('-2') || card.id.includes('-3') || 
                   card.id.includes('-4') || card.id.includes('-5') || card.id.includes('-6') || 
                   card.id.includes('-7') || card.id.includes('-8') || card.id.includes('-9') || 
                   card.id.includes('-10') || card.id.includes('-11');
          case 'Service Performance':
            return card.id.includes('-12') || card.id.includes('-13') || card.id.includes('-14') || 
                   card.id.includes('-15') || card.id.includes('-16') || card.id.includes('-17') || 
                   card.id.includes('-18') || card.id.includes('-37');
          case 'Customer Insights':
            return card.id.includes('-19') || card.id.includes('-20') || card.id.includes('-21') || 
                   card.id.includes('-22') || card.id.includes('-23') || card.id.includes('-24') || 
                   card.id.includes('-38');
          case 'Financials':
            return card.id.includes('-25') || card.id.includes('-26') || card.id.includes('-27') || 
                   card.id.includes('-28') || card.id.includes('-29') || card.id.includes('-30');
          case 'Operations':
            return card.id.includes('-31') || card.id.includes('-32') || card.id.includes('-33') || 
                   card.id.includes('-34') || card.id.includes('-35') || card.id.includes('-36') || 
                   card.id.includes('-39');
          default:
            return true;
        }
      }
      return true;
    });

    // For Home Services template, use the original template layout
    if (dashboardName.includes('Home Services')) {
      const template = createHomeServicesDashboard();
      const templateCards = template.cards;
      
      setCards(cards.map(card => {
        const templateCard = templateCards.find(tc => tc.id.split('-').pop() === card.id.split('-').pop());
        if (templateCard && visibleCards.find(vc => vc.id === card.id)) {
          return {
            ...card,
            x: templateCard.x,
            y: templateCard.y,
            w: templateCard.w,
            h: templateCard.h
          };
        }
        return card;
      }));
      return;
    }

    // For other dashboards, use the auto-organize algorithm
    // Sort cards by size (larger first), excluding filters
    const sortedCards = [...visibleCards].filter(c => c.type !== 'filter').sort((a, b) => {
      const areaA = a.w * a.h;
      const areaB = b.w * b.h;
      return areaB - areaA;
    });

    let currentY = 0;
    let currentRow: DashboardCard[] = [];
    let rowWidth = 0;
    const GRID_WIDTH = 18;
    const updatedCards: DashboardCard[] = [];

    sortedCards.forEach(card => {
      if (rowWidth + card.w > GRID_WIDTH && currentRow.length > 0) {
        // Start new row
        let x = 0;
        const maxHeight = Math.max(...currentRow.map(c => c.h));
        
        // Position cards in current row
        currentRow.forEach(rowCard => {
          updatedCards.push({ ...rowCard, x, y: currentY });
          x += rowCard.w;
        });
        
        currentY += maxHeight;
        currentRow = [card];
        rowWidth = card.w;
      } else {
        currentRow.push(card);
        rowWidth += card.w;
      }
    });

    // Handle last row
    if (currentRow.length > 0) {
      let x = 0;
      currentRow.forEach(rowCard => {
        updatedCards.push({ ...rowCard, x, y: currentY });
        x += rowCard.w;
      });
    }

    // Update all cards, preserving non-visible ones
    setCards(cards.map(card => {
      const updated = updatedCards.find(c => c.id === card.id);
      return updated || card;
    }));
  };

  const renderCard = (card: DashboardCard) => {
    const commonChartProps = {
      margin: { top: 5, right: 5, left: 5, bottom: 5 }
    };
    
    // Calculate responsive font sizes based on card dimensions
    const cardPixelWidth = (containerWidth / 18) * card.w;
    const cardPixelHeight = 50 * card.h;
    const isSmallCard = card.w < 4 || card.h < 3;
    const isMediumCard = card.w < 6 || card.h < 4;
    
    const numberFontSize = isSmallCard ? '2xl' : isMediumCard ? '3xl' : '5xl';
    const textFontSize = isSmallCard ? 'xs' : 'sm';

    const content: Record<CardType, JSX.Element> = {
      line: (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={generateLineData()} {...commonChartProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke={COLORS.textLight} />
            <YAxis tick={{ fontSize: 11 }} stroke={COLORS.textLight} />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" stroke={CHART_COLORS[0]} strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="profit" stroke={CHART_COLORS[1]} strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      ),
      bar: (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={generateBarData()} {...commonChartProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="category" tick={{ fontSize: 11 }} stroke={COLORS.textLight} />
            <YAxis tick={{ fontSize: 11 }} stroke={COLORS.textLight} />
            <Tooltip />
            <Bar dataKey="sales" fill={CHART_COLORS[0]} />
            <Bar dataKey="returns" fill={CHART_COLORS[1]} />
          </BarChart>
        </ResponsiveContainer>
      ),
      area: (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={generateLineData()} {...commonChartProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke={COLORS.textLight} />
            <YAxis tick={{ fontSize: 11 }} stroke={COLORS.textLight} />
            <Tooltip />
            <Area type="monotone" dataKey="revenue" stackId="1" stroke={CHART_COLORS[0]} fill={CHART_COLORS[0]} fillOpacity={0.6} />
            <Area type="monotone" dataKey="profit" stackId="1" stroke={CHART_COLORS[1]} fill={CHART_COLORS[1]} fillOpacity={0.6} />
          </AreaChart>
        </ResponsiveContainer>
      ),
      scatter: (
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart {...commonChartProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis type="number" dataKey="x" tick={{ fontSize: 11 }} stroke={COLORS.textLight} />
            <YAxis type="number" dataKey="y" tick={{ fontSize: 11 }} stroke={COLORS.textLight} />
            <Tooltip />
            <Scatter data={generateScatterData()} fill={CHART_COLORS[0]} />
          </ScatterChart>
        </ResponsiveContainer>
      ),
      pie: (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={generatePieData()}
              cx="50%"
              cy="50%"
              outerRadius="80%"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {generatePieData().map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      ),
      donut: (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={generatePieData()}
              cx="50%"
              cy="50%"
              innerRadius="40%"
              outerRadius="80%"
              dataKey="value"
            >
              {generatePieData().map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      ),
      number: (
        <div className="flex flex-col items-center justify-center h-full p-4">
          <div 
            className="font-light" 
            style={{ 
              color: COLORS.brand,
              fontSize: isSmallCard ? '1.5rem' : isMediumCard ? '2rem' : '3rem'
            }}
          >
            {card.title.includes('Revenue') ? '$2.4M' : 
             card.title.includes('Satisfaction') ? '4.7/5' :
             card.title.includes('Rating') ? '4.8' :
             card.title.includes('Margin') ? '42%' :
             card.title.includes('Expenses') ? '$1.2M' :
             card.title.includes('Promoter') ? '72' :
             card.title.includes('Technicians') ? '47' :
             '324'}
          </div>
          <div 
            className="mt-2" 
            style={{ 
              color: COLORS.success,
              fontSize: isSmallCard ? '0.75rem' : '0.875rem'
            }}
          >
            ↑ 12.5% vs last period
          </div>
        </div>
      ),
      trend: (
        <div className="flex flex-col h-full p-4">
          <div 
            className="font-light" 
            style={{ 
              color: COLORS.text,
              fontSize: isSmallCard ? '1.25rem' : isMediumCard ? '1.875rem' : '2.25rem'
            }}
          >
            {card.title.includes('Jobs') ? '127' : 
             card.title.includes('Cash') ? '$890K' :
             card.title.includes('Customers') ? '82%' :
             '324'}
          </div>
          <div 
            className="truncate" 
            style={{ 
              color: COLORS.textLight,
              fontSize: isSmallCard ? '0.75rem' : '0.875rem'
            }}
          >
            {card.title}
          </div>
          <div className="flex-1 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={generateLineData().slice(0, 7)} {...commonChartProps}>
                <Line type="monotone" dataKey="customers" stroke={COLORS.brand} strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      ),
      table: (
        <div className="p-4 h-full overflow-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                <th className="text-left py-2 font-medium" style={{ color: COLORS.textLight }}>Date</th>
                <th className="text-left py-2 font-medium" style={{ color: COLORS.textLight }}>Customer</th>
                <th className="text-left py-2 font-medium" style={{ color: COLORS.textLight }}>Amount</th>
                <th className="text-left py-2 font-medium" style={{ color: COLORS.textLight }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                  <td className="py-2">2024-01-{15 + i}</td>
                  <td className="py-2">Customer {i + 1}</td>
                  <td className="py-2">${(Math.random() * 1000).toFixed(2)}</td>
                  <td className="py-2">
                    <span className="px-2 py-1 rounded text-xs" style={{ 
                      backgroundColor: i % 2 === 0 ? '#E8F5E9' : '#FFF3E0',
                      color: i % 2 === 0 ? '#2E7D32' : '#E65100'
                    }}>
                      {i % 2 === 0 ? 'Completed' : 'Pending'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ),
      pivot: (
        <div className="p-4 h-full overflow-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: `2px solid ${COLORS.border}` }}>
                <th className="text-left py-2 font-medium" style={{ color: COLORS.textLight }}>Region</th>
                <th className="text-center py-2 font-medium" style={{ color: COLORS.textLight }}>Q1</th>
                <th className="text-center py-2 font-medium" style={{ color: COLORS.textLight }}>Q2</th>
                <th className="text-center py-2 font-medium" style={{ color: COLORS.textLight }}>Q3</th>
                <th className="text-center py-2 font-medium" style={{ color: COLORS.textLight }}>Q4</th>
              </tr>
            </thead>
            <tbody>
              {['North', 'South', 'East', 'West'].map((region) => (
                <tr key={region} style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                  <td className="py-2 font-medium">{region}</td>
                  {[...Array(4)].map((_, i) => (
                    <td key={i} className="text-center py-2">
                      ${(Math.random() * 100).toFixed(0)}k
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ),
      funnel: (
        <div className="p-4 h-full flex flex-col justify-center">
          {[
            { label: 'Visitors', value: 10000, color: CHART_COLORS[0] },
            { label: 'Signups', value: 5000, color: CHART_COLORS[1] },
            { label: 'Active', value: 2000, color: CHART_COLORS[2] },
            { label: 'Customers', value: 500, color: CHART_COLORS[3] }
          ].map((stage, index) => (
            <div key={stage.label} className="mb-2">
              <div className="flex justify-between text-xs mb-1">
                <span>{stage.label}</span>
                <span>{stage.value.toLocaleString()}</span>
              </div>
              <div className="h-8 rounded" style={{ 
                backgroundColor: stage.color,
                width: `${100 - (index * 25)}%`,
                opacity: 0.8
              }} />
            </div>
          ))}
        </div>
      ),
      progress: (
        <div className="p-4 h-full flex flex-col justify-center">
          <div 
            className="mb-2 truncate" 
            style={{ 
              color: COLORS.textLight,
              fontSize: isSmallCard ? '0.75rem' : '0.875rem'
            }}
            title={card.title}
          >
            {card.title}
          </div>
          <div className="h-6 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full" 
              style={{ width: '73%', backgroundColor: COLORS.success }}
            />
          </div>
          <div 
            className="text-right mt-1" 
            style={{ 
              color: COLORS.text,
              fontSize: isSmallCard ? '0.75rem' : '0.875rem'
            }}
          >
            73%
          </div>
        </div>
      ),
      gauge: (
        <div className="flex items-center justify-center h-full p-4">
          <div className="relative">
            <svg width="120" height="120" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="#f0f0f0"
                strokeWidth="10"
              />
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke={COLORS.brand}
                strokeWidth="10"
                strokeDasharray={`${2 * Math.PI * 50 * 0.75} ${2 * Math.PI * 50 * 0.25}`}
                strokeDashoffset={2 * Math.PI * 50 * 0.25}
                transform="rotate(-90 60 60)"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-2xl font-light">75%</div>
            </div>
          </div>
        </div>
      ),
      text: (
        <div className="p-4" style={{ color: COLORS.text }}>
          {card.title === 'Executive Summary' ? (
            <>
              <p className="mb-2 font-medium">Key Performance Highlights:</p>
              <ul className="list-disc list-inside text-sm space-y-1" style={{ color: COLORS.textLight }}>
                <li>Service revenue up 18% YoY, driven by HVAC season</li>
                <li>Customer satisfaction at 4.7/5.0 stars</li>
                <li>First-time fix rate improved to 87%</li>
                <li>Average response time reduced to 2.3 hours</li>
              </ul>
            </>
          ) : (
            <>
              <p className="mb-2">Key insights from this period:</p>
              <ul className="list-disc list-inside text-sm space-y-1" style={{ color: COLORS.textLight }}>
                <li>Revenue increased by 12.5% compared to last quarter</li>
                <li>Customer acquisition cost decreased by 8%</li>
                <li>User engagement metrics are trending upward</li>
              </ul>
            </>
          )}
        </div>
      ),
      filter: (
        <div className="p-3">
          {card.filterConfig ? (
            // Render based on filter configuration
            <>
              {card.filterConfig.type === 'date' && (
                <>
                  {card.filterConfig.widget === 'date-range' && (
                    <div className="flex gap-2">
                      <input type="date" className="flex-1 px-2 py-1 text-sm border rounded" style={{ borderColor: COLORS.border }} />
                      <span className="text-sm self-center">to</span>
                      <input type="date" className="flex-1 px-2 py-1 text-sm border rounded" style={{ borderColor: COLORS.border }} />
                    </div>
                  )}
                  {card.filterConfig.widget === 'single-date' && (
                    <input type="date" className="w-full px-2 py-1 text-sm border rounded" style={{ borderColor: COLORS.border }} />
                  )}
                  {(card.filterConfig.widget === 'month-year' || card.filterConfig.widget === 'quarter-year' || 
                    card.filterConfig.widget === 'relative-date' || card.filterConfig.widget === 'all-options') && (
                    <select className="w-full px-3 py-1.5 text-sm border rounded" style={{ borderColor: COLORS.border }}>
                      <option>{card.filterConfig.defaultValue || 'Last 30 days'}</option>
                      <option>Last 7 days</option>
                      <option>Last 30 days</option>
                      <option>Last 90 days</option>
                      <option>Last 12 months</option>
                      <option>This month</option>
                      <option>This quarter</option>
                      <option>This year</option>
                    </select>
                  )}
                </>
              )}
              
              {card.filterConfig.type === 'text' && (
                <>
                  {(card.filterConfig.widget === 'dropdown' || card.filterConfig.widget === 'is') && (
                    <select 
                      className="w-full px-3 py-1.5 text-sm border rounded" 
                      style={{ borderColor: COLORS.border }}
                      multiple={card.filterConfig.multiSelect}
                    >
                      <option>Option 1</option>
                      <option>Option 2</option>
                      <option>Option 3</option>
                    </select>
                  )}
                  {(card.filterConfig.widget === 'search' || card.filterConfig.widget === 'input' || 
                    card.filterConfig.widget === 'contains' || card.filterConfig.widget === 'starts-with' || 
                    card.filterConfig.widget === 'ends-with') && (
                    <input 
                      type="text" 
                      className="w-full px-3 py-1.5 text-sm border rounded" 
                      style={{ borderColor: COLORS.border }}
                      placeholder={card.filterConfig.widget === 'contains' ? 'Contains...' : 
                                  card.filterConfig.widget === 'starts-with' ? 'Starts with...' :
                                  card.filterConfig.widget === 'ends-with' ? 'Ends with...' : 'Search...'}
                    />
                  )}
                </>
              )}
              
              {card.filterConfig.type === 'number' && (
                <>
                  {card.filterConfig.widget === 'between' && (
                    <div className="flex gap-2">
                      <input type="number" className="flex-1 px-2 py-1 text-sm border rounded" style={{ borderColor: COLORS.border }} placeholder="Min" />
                      <span className="text-sm self-center">to</span>
                      <input type="number" className="flex-1 px-2 py-1 text-sm border rounded" style={{ borderColor: COLORS.border }} placeholder="Max" />
                    </div>
                  )}
                  {(card.filterConfig.widget === 'equal' || card.filterConfig.widget === 'not-equal' || 
                    card.filterConfig.widget === 'greater-equal' || card.filterConfig.widget === 'less-equal') && (
                    <input 
                      type="number" 
                      className="w-full px-3 py-1.5 text-sm border rounded" 
                      style={{ borderColor: COLORS.border }}
                      placeholder={card.filterConfig.widget === 'equal' ? 'Equals' :
                                  card.filterConfig.widget === 'not-equal' ? 'Not equal to' :
                                  card.filterConfig.widget === 'greater-equal' ? 'Greater than or equal' :
                                  'Less than or equal'}
                    />
                  )}
                </>
              )}
              
              {card.filterConfig.type === 'location' && (
                <select className="w-full px-3 py-1.5 text-sm border rounded" style={{ borderColor: COLORS.border }}>
                  <option>Select {card.filterConfig.widget}</option>
                  {card.filterConfig.widget === 'state' && (
                    <>
                      <option>California</option>
                      <option>Texas</option>
                      <option>New York</option>
                      <option>Florida</option>
                    </>
                  )}
                  {card.filterConfig.widget === 'country' && (
                    <>
                      <option>United States</option>
                      <option>Canada</option>
                      <option>Mexico</option>
                      <option>United Kingdom</option>
                    </>
                  )}
                </select>
              )}
              
              {card.filterConfig.type === 'id' && (
                <input 
                  type="text" 
                  className="w-full px-3 py-1.5 text-sm border rounded" 
                  style={{ borderColor: COLORS.border }}
                  placeholder="Enter ID..."
                />
              )}
              
              {card.filterConfig.type === 'boolean' && (
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm" style={{ color: COLORS.text }}>Active</span>
                </label>
              )}
            </>
          ) : (
            // Fallback for filters without config
            <select className="w-full px-3 py-1.5 text-sm border rounded" style={{ borderColor: COLORS.border }}>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>Last 12 months</option>
              <option>Custom range...</option>
            </select>
          )}
        </div>
      ),
      map: (
        <div className="flex items-center justify-center h-full" style={{ backgroundColor: '#E8F4F8' }}>
          <div className="text-center">
            <svg className="w-24 h-24 mx-auto mb-2" style={{ color: COLORS.brand }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <p className="text-sm" style={{ color: COLORS.textLight }}>Interactive Map</p>
          </div>
        </div>
      )
    };

    return content[card.type] || <div>Unknown card type</div>;
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.bg }}>
      {/* Filter Builder Modal */}
      {showFilterBuilder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
            <div className="px-6 py-4 border-b" style={{ borderColor: COLORS.border }}>
              <h2 className="text-lg font-medium" style={{ color: COLORS.text }}>Add Filter</h2>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-140px)]">
              {/* Filter Name */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2" style={{ color: COLORS.text }}>
                  Filter Name
                </label>
                <input
                  type="text"
                  value={filterBuilderConfig.name}
                  onChange={(e) => setFilterBuilderConfig({ ...filterBuilderConfig, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                  style={{ borderColor: COLORS.border }}
                  placeholder="e.g., Date Range, Customer Type, Region"
                />
              </div>

              {/* Filter Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2" style={{ color: COLORS.text }}>
                  Filter Type
                </label>
                <select
                  value={filterBuilderConfig.type}
                  onChange={(e) => {
                    const type = e.target.value;
                    let defaultWidget = 'date-range';
                    if (type === 'text') defaultWidget = 'dropdown';
                    else if (type === 'number') defaultWidget = 'between';
                    else if (type === 'location') defaultWidget = 'state';
                    else if (type === 'boolean') defaultWidget = 'checkbox';
                    setFilterBuilderConfig({ ...filterBuilderConfig, type, widget: defaultWidget });
                  }}
                  className="w-full px-3 py-2 border rounded-md"
                  style={{ borderColor: COLORS.border }}
                >
                  <option value="date">Date/Time</option>
                  <option value="text">Text/Category</option>
                  <option value="number">Number</option>
                  <option value="location">Location</option>
                  <option value="id">ID</option>
                  <option value="boolean">True/False</option>
                </select>
              </div>

              {/* Widget Type based on Filter Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2" style={{ color: COLORS.text }}>
                  Widget Type
                </label>
                <select
                  value={filterBuilderConfig.widget}
                  onChange={(e) => setFilterBuilderConfig({ ...filterBuilderConfig, widget: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                  style={{ borderColor: COLORS.border }}
                >
                  {filterBuilderConfig.type === 'date' && (
                    <>
                      <option value="month-year">Month and Year</option>
                      <option value="quarter-year">Quarter and Year</option>
                      <option value="single-date">Single Date</option>
                      <option value="date-range">Date Range</option>
                      <option value="relative-date">Relative Date</option>
                      <option value="all-options">All Options</option>
                    </>
                  )}
                  {filterBuilderConfig.type === 'text' && (
                    <>
                      <option value="dropdown">Dropdown List</option>
                      <option value="search">Search Box</option>
                      <option value="input">Plain Input</option>
                      <option value="is">Is (multiple select)</option>
                      <option value="is-not">Is Not</option>
                      <option value="contains">Contains</option>
                      <option value="starts-with">Starts With</option>
                      <option value="ends-with">Ends With</option>
                    </>
                  )}
                  {filterBuilderConfig.type === 'number' && (
                    <>
                      <option value="equal">Equal To</option>
                      <option value="not-equal">Not Equal To</option>
                      <option value="between">Between</option>
                      <option value="greater-equal">Greater Than or Equal</option>
                      <option value="less-equal">Less Than or Equal</option>
                    </>
                  )}
                  {filterBuilderConfig.type === 'location' && (
                    <>
                      <option value="city">City</option>
                      <option value="state">State/Province</option>
                      <option value="zip">ZIP/Postal Code</option>
                      <option value="country">Country</option>
                    </>
                  )}
                  {filterBuilderConfig.type === 'id' && (
                    <option value="input">ID Input Box</option>
                  )}
                  {filterBuilderConfig.type === 'boolean' && (
                    <option value="checkbox">Checkbox</option>
                  )}
                </select>
              </div>

              {/* Additional Options */}
              <div className="mb-6 space-y-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={filterBuilderConfig.required || false}
                    onChange={(e) => setFilterBuilderConfig({ ...filterBuilderConfig, required: e.target.checked })}
                  />
                  <span className="text-sm" style={{ color: COLORS.text }}>
                    Require a value (filter must be set)
                  </span>
                </label>

                {(filterBuilderConfig.type === 'text' || filterBuilderConfig.type === 'number') && (
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={filterBuilderConfig.multiSelect || false}
                      onChange={(e) => setFilterBuilderConfig({ ...filterBuilderConfig, multiSelect: e.target.checked })}
                    />
                    <span className="text-sm" style={{ color: COLORS.text }}>
                      Allow multiple selections
                    </span>
                  </label>
                )}
              </div>

              {/* Default Value */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2" style={{ color: COLORS.text }}>
                  Default Value (optional)
                </label>
                <input
                  type="text"
                  value={filterBuilderConfig.defaultValue || ''}
                  onChange={(e) => setFilterBuilderConfig({ ...filterBuilderConfig, defaultValue: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                  style={{ borderColor: COLORS.border }}
                  placeholder="Enter default value"
                />
              </div>
            </div>

            <div className="px-6 py-4 border-t flex justify-end gap-2" style={{ borderColor: COLORS.border }}>
              <button
                onClick={() => {
                  setShowFilterBuilder(false);
                  setFilterBuilderConfig({ type: 'date', name: '', widget: 'date-range' });
                }}
                className="px-4 py-2 text-sm border rounded"
                style={{ borderColor: COLORS.border, color: COLORS.text }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (filterBuilderConfig.name) {
                    const newFilter: DashboardCard = {
                      id: `filter-${activeTab}-${Date.now()}`,
                      type: 'filter',
                      title: filterBuilderConfig.name,
                      x: 0,
                      y: 0,
                      w: 4,
                      h: 2,
                      filterConfig: filterBuilderConfig
                    };
                    
                    // Calculate position
                    const tabFilters = filters.filter(f => f.id.includes(`-${activeTab}-`));
                    let x = 0;
                    let y = 0;
                    tabFilters.forEach(filter => {
                      if (x + filter.w > 18) {
                        x = 0;
                        y += 2;
                      }
                      x += filter.w;
                    });
                    
                    if (x + newFilter.w > 18) {
                      x = 0;
                      y += 2;
                    }
                    
                    newFilter.x = x;
                    newFilter.y = y;
                    
                    setFilters([...filters, newFilter]);
                    setShowFilterBuilder(false);
                    setFilterBuilderConfig({ type: 'date', name: '', widget: 'date-range' });
                  }
                }}
                className="px-4 py-2 text-sm text-white rounded"
                style={{ backgroundColor: COLORS.brand }}
                disabled={!filterBuilderConfig.name}
              >
                Add Filter
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white" style={{ borderBottom: `1px solid ${COLORS.border}` }}>
        <div className="px-6 py-4 flex items-center justify-between">
          <input
            type="text"
            value={dashboardName}
            onChange={(e) => setDashboardName(e.target.value)}
            className="text-2xl font-light bg-transparent border-none outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 flex-1"
            style={{ color: COLORS.text }}
          />
          <div className="flex gap-2 ml-4">
            <button 
              onClick={autoOrganizeCards} 
              className="px-3 py-1.5 text-sm border rounded hover:bg-gray-50 flex items-center gap-1" 
              style={{ borderColor: COLORS.brand, color: COLORS.brand }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
              </svg>
              Auto-Organize
            </button>
            <button
              onClick={() => {
                const template = createHomeServicesDashboard();
                setDashboardName('Home Services Executive Dashboard');
                setTabs(template.tabs);
                setCards(template.cards);
                setFilters(template.filters);
                setActiveTab('Overview');
              }}
              className="px-4 py-1.5 text-sm border rounded transition-colors hover:bg-gray-50"
              style={{ borderColor: COLORS.warning, backgroundColor: '#FFFBEB', color: '#92400E' }}
            >
              📋 Load Home Services Template
            </button>
            <button
              onClick={() => {
                const data = { name: dashboardName, tabs, cards, filters };
                localStorage.setItem('dashboard-' + dashboardName, JSON.stringify(data));
                alert('Dashboard saved!');
              }}
              className="px-4 py-1.5 text-sm text-white rounded transition-colors hover:opacity-90"
              style={{ backgroundColor: COLORS.brand }}
            >
              Save Dashboard
            </button>
            <button
              onClick={() => {
                const savedDashboards = Object.keys(localStorage)
                  .filter(key => key.startsWith('dashboard-'))
                  .map(key => key.replace('dashboard-', ''));
                
                if (savedDashboards.length === 0) {
                  alert('No saved dashboards');
                  return;
                }
                
                const selected = prompt('Select dashboard:\n' + savedDashboards.join('\n'));
                if (selected) {
                  const data = localStorage.getItem('dashboard-' + selected);
                  if (data) {
                    const parsed = JSON.parse(data);
                    setDashboardName(parsed.name);
                    setTabs(parsed.tabs);
                    setCards(parsed.cards);
                    setFilters(parsed.filters || []);
                  }
                }
              }}
              className="px-4 py-1.5 text-sm border rounded transition-colors hover:bg-gray-50"
              style={{ borderColor: COLORS.border, color: COLORS.text }}
            >
              Load Dashboard
            </button>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="px-6 flex">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === tab 
                  ? '' 
                  : 'hover:bg-gray-50'
              }`}
              style={{
                borderBottom: activeTab === tab ? `3px solid ${COLORS.brand}` : '3px solid transparent',
                color: activeTab === tab ? COLORS.brand : COLORS.textLight
              }}
            >
              {tab}
            </button>
          ))}
          <button 
            onClick={() => {
              const newTab = prompt('Tab name:');
              if (newTab) setTabs([...tabs, newTab]);
            }}
            className="px-4 py-3 text-sm hover:bg-gray-50"
            style={{ color: COLORS.textLight }}
          >
            + Add Tab
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white px-6 py-3" style={{ borderBottom: `1px solid ${COLORS.border}` }}>
        <div className="flex items-center gap-2 flex-wrap">
          {/* Chart buttons */}
          {[
            { type: 'line' as CardType, icon: '📈', label: 'Line' },
            { type: 'bar' as CardType, icon: '📊', label: 'Bar' },
            { type: 'area' as CardType, icon: '📉', label: 'Area' },
            { type: 'scatter' as CardType, icon: '⚡', label: 'Scatter' },
            { type: 'pie' as CardType, icon: '🥧', label: 'Pie' },
            { type: 'donut' as CardType, icon: '🍩', label: 'Donut' },
            { type: 'number' as CardType, icon: '🔢', label: 'Number' },
            { type: 'trend' as CardType, icon: '📈', label: 'Trend' },
            { type: 'table' as CardType, icon: '📋', label: 'Table' },
            { type: 'pivot' as CardType, icon: '🔄', label: 'Pivot' },
            { type: 'funnel' as CardType, icon: '🔻', label: 'Funnel' },
            { type: 'progress' as CardType, icon: '📊', label: 'Progress' },
            { type: 'gauge' as CardType, icon: '🎯', label: 'Gauge' },
            { type: 'text' as CardType, icon: '📝', label: 'Text' },
            { type: 'map' as CardType, icon: '🗺️', label: 'Map' }
          ].map(({ type, icon, label }) => (
            <button
              key={type}
              onClick={() => addCard(type)}
              className="px-3 py-1.5 text-sm bg-white border rounded hover:bg-gray-50 transition-colors"
              style={{ borderColor: COLORS.border, color: COLORS.text }}
            >
              <span className="mr-1">{icon}</span> {label}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Area */}
      {(filters.filter(f => f.id.includes(`-${activeTab}-`)).length > 0 || true) && (
        <div className="px-6 pt-4 pb-2" style={{ backgroundColor: '#F9FAFB', borderBottom: `1px solid ${COLORS.border}` }}>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider" style={{ color: COLORS.textLight }}>
              Filters
            </span>
            <button
              onClick={() => setShowFilterBuilder(true)}
              className="px-3 py-1 text-xs bg-white border rounded hover:bg-gray-50 transition-colors flex items-center gap-1"
              style={{ borderColor: COLORS.border, color: COLORS.text }}
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Filter
            </button>
          </div>
          <GridLayout
            className="filter-layout"
            layout={filters.filter(f => f.id.includes(`-${activeTab}-`)).map((filter, index) => {
              // Calculate position with automatic wrapping
              const previousFilters = filters.filter(f => f.id.includes(`-${activeTab}-`)).slice(0, index);
              let x = 0;
              let y = 0;
              
              previousFilters.forEach(pf => {
                if (x + pf.w > 18) {
                  x = 0;
                  y += 2;
                }
                x += pf.w;
              });
              
              if (x + filter.w > 18) {
                x = 0;
                y += 2;
              }
              
              return {
                i: filter.id,
                x: x,
                y: y,
                w: filter.w,
                h: 2
              };
            })}
            cols={18}
            rowHeight={50}
            width={containerWidth}
            onLayoutChange={(layout) => {
              setFilters(filters.map(filter => {
                const layoutItem = layout.find(l => l.i === filter.id);
                if (layoutItem) {
                  return {
                    ...filter,
                    x: layoutItem.x,
                    y: layoutItem.y,
                    w: layoutItem.w
                  };
                }
                return filter;
              }));
            }}
            draggableHandle=".filter-header"
            compactType="vertical"
            preventCollision={false}
            margin={[16, 16]}
            containerPadding={[0, 0]}
            useCSSTransforms={true}
          >
            {filters.filter(f => f.id.includes(`-${activeTab}-`)).map(filter => (
              <div 
                key={filter.id} 
                className="bg-white rounded-lg shadow-sm overflow-hidden relative group"
                style={{ border: `1px solid ${COLORS.border}` }}
              >
                <button
                  onClick={() => {
                    setFilters(filters.filter(f => f.id !== filter.id));
                  }}
                  className="absolute top-2 right-2 z-20 bg-white rounded-full w-5 h-5 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity text-gray-500 hover:text-red-500 hover:bg-red-50 text-xs"
                  title="Remove filter"
                >
                  ×
                </button>
                <div
                  className="filter-header px-3 py-2 cursor-move flex items-center justify-between"
                  style={{ backgroundColor: '#FAFAFA' }}
                >
                  <input
                    type="text"
                    value={filter.title}
                    onChange={(e) => {
                      setFilters(filters.map(f =>
                        f.id === filter.id ? { ...f, title: e.target.value } : f
                      ));
                    }}
                    className="font-medium bg-transparent outline-none text-xs hover:bg-gray-100 px-1 py-0.5 rounded cursor-text w-full truncate"
                    style={{ color: COLORS.text }}
                    placeholder="Filter name"
                    title={filter.title}
                  />
                </div>
                <div className="px-3 pb-2">
                  {renderCard(filter)}
                </div>
              </div>
            ))}
          </GridLayout>
        </div>
      )}

      {/* Dashboard Grid */}
      <div className="px-6 py-6">
        <GridLayout
          className="layout"
          layout={cards.filter(card => {
            // Filter cards based on active tab
            const tabIndex = tabs.indexOf(activeTab);
            if (dashboardName.includes('Home Services')) {
              // For Home Services template, show cards based on their position
              switch (activeTab) {
                case 'Overview':
                  return card.id.includes('-1') || card.id.includes('-2') || card.id.includes('-3') || 
                         card.id.includes('-4') || card.id.includes('-5') || card.id.includes('-6') || 
                         card.id.includes('-7') || card.id.includes('-8') || card.id.includes('-9') || 
                         card.id.includes('-10') || card.id.includes('-11');
                case 'Service Performance':
                  return card.id.includes('-12') || card.id.includes('-13') || card.id.includes('-14') || 
                         card.id.includes('-15') || card.id.includes('-16') || card.id.includes('-17') || 
                         card.id.includes('-18') || card.id.includes('-37');
                case 'Customer Insights':
                  return card.id.includes('-19') || card.id.includes('-20') || card.id.includes('-21') || 
                         card.id.includes('-22') || card.id.includes('-23') || card.id.includes('-24') || 
                         card.id.includes('-38');
                case 'Financials':
                  return card.id.includes('-25') || card.id.includes('-26') || card.id.includes('-27') || 
                         card.id.includes('-28') || card.id.includes('-29') || card.id.includes('-30');
                case 'Operations':
                  return card.id.includes('-31') || card.id.includes('-32') || card.id.includes('-33') || 
                         card.id.includes('-34') || card.id.includes('-35') || card.id.includes('-36') || 
                         card.id.includes('-39');
                default:
                  return true;
              }
            }
            // For regular dashboards, show all cards
            return true;
          }).map(card => ({
            i: card.id,
            x: card.x,
            y: card.y,
            w: card.w,
            h: card.h
          }))}
          cols={18}
          rowHeight={50}
          width={containerWidth}
          onLayoutChange={onLayoutChange}
          draggableHandle=".card-header"
          compactType={null}
          preventCollision={false}
          margin={[16, 16]}
          containerPadding={[0, 0]}
          useCSSTransforms={true}
        >
          {cards.filter(card => {
            // Filter cards based on active tab
            if (dashboardName.includes('Home Services')) {
              // For Home Services template, show cards based on their position
              switch (activeTab) {
                case 'Overview':
                  return card.id.includes('-1') || card.id.includes('-2') || card.id.includes('-3') || 
                         card.id.includes('-4') || card.id.includes('-5') || card.id.includes('-6') || 
                         card.id.includes('-7') || card.id.includes('-8') || card.id.includes('-9') || 
                         card.id.includes('-10') || card.id.includes('-11');
                case 'Service Performance':
                  return card.id.includes('-12') || card.id.includes('-13') || card.id.includes('-14') || 
                         card.id.includes('-15') || card.id.includes('-16') || card.id.includes('-17') || 
                         card.id.includes('-18') || card.id.includes('-37');
                case 'Customer Insights':
                  return card.id.includes('-19') || card.id.includes('-20') || card.id.includes('-21') || 
                         card.id.includes('-22') || card.id.includes('-23') || card.id.includes('-24') || 
                         card.id.includes('-38');
                case 'Financials':
                  return card.id.includes('-25') || card.id.includes('-26') || card.id.includes('-27') || 
                         card.id.includes('-28') || card.id.includes('-29') || card.id.includes('-30');
                case 'Operations':
                  return card.id.includes('-31') || card.id.includes('-32') || card.id.includes('-33') || 
                         card.id.includes('-34') || card.id.includes('-35') || card.id.includes('-36') || 
                         card.id.includes('-39');
                default:
                  return true;
              }
            }
            // For regular dashboards, show all cards
            return true;
          }).map(card => (
            <div 
              key={card.id} 
              className="bg-white rounded-lg shadow-sm overflow-hidden relative group"
              style={{ border: `1px solid ${COLORS.border}` }}
            >
              <button
                onClick={() => {
                  const updatedCards = cards.filter(c => c.id !== card.id);
                  setCards(updatedCards);
                }}
                className="absolute top-2 right-2 z-20 bg-white rounded-full w-6 h-6 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity text-gray-500 hover:text-red-500 hover:bg-red-50"
                title="Delete card"
              >
                ×
              </button>
                            <div
                className="card-header px-4 py-3 cursor-move flex items-center justify-between"
                style={{ borderBottom: `1px solid ${COLORS.border}`, backgroundColor: '#FAFAFA' }}
              >
                <input
                  type="text"
                  value={card.title}
                  onChange={(e) => {
                    setCards(cards.map(c =>
                      c.id === card.id ? { ...c, title: e.target.value } : c
                    ));
                  }}
                  className="font-medium bg-transparent outline-none text-sm hover:bg-gray-100 px-1 py-0.5 rounded cursor-text w-full truncate"
                  style={{ color: COLORS.text }}
                  placeholder="Card title"
                  title={card.title}
                />
              </div>
              <div className="h-full" style={{ height: 'calc(100% - 49px)' }}>
                {renderCard(card)}
              </div>
            </div>
          ))}
        </GridLayout>
      </div>
    </div>
  );
}; 