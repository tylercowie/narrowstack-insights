# Metabase-Style Embedded Dashboard Implementation

A comprehensive React TypeScript implementation of Metabase-style dashboards with full embedding capabilities, demonstrating all component types, filter widgets, and embedding modes.

## 🚀 Features

### Dashboard Components
- **Question Cards**: Bar, line, area, pie, scatter, funnel, gauge, progress, number, trend, table, pivot, and map visualizations
- **Text Cards**: Full Markdown support with variable replacement and conditional content
- **Link Cards**: Dynamic URLs with parameter substitution
- **Action Cards**: Query and HTTP action buttons with confirmations
- **Iframe Cards**: Embed external content with sandbox controls
- **Static Cards**: Non-interactive visualization snapshots

### Filter Widgets
- **Date/Time**: Single date, date range, relative dates with grouping options
- **Number**: Input fields, sliders, operators (=, >, <, between)
- **Text/Category**: Dropdowns, search boxes, autocomplete, multi-select
- **Location**: Country, state, city, ZIP code selectors
- **Boolean**: Toggle switches
- **Custom**: Field filters for SQL templates

### Embedding Types
1. **Public Embeds**: Share via public links/iframes, no auth required
2. **Signed Embeds**: Secure with JWT signing, locked parameters
3. **Interactive Embeds**: Full interactivity with SSO, row-level security
4. **SDK Embeds**: Component-level embedding in React apps

### Layout & Styling
- **Grid System**: 18-column responsive grid with drag-and-drop
- **Tabs**: Multi-view dashboards with shared filters
- **Themes**: Light/dark modes, custom CSS support
- **Responsive**: Mobile-friendly with breakpoints
- **Print-ready**: Optimized print styles

## 📁 Project Structure

```
narrowstack-insights/
├── src/
│   ├── components/
│   │   ├── cards/          # Card components (Question, Text, Link, etc.)
│   │   ├── filters/        # Filter widgets (Date, Number, Text, etc.)
│   │   ├── layout/         # Layout components (Grid, Header, Tabs)
│   │   └── embeds/         # Embedding components and playground
│   ├── lib/
│   │   ├── dashboard-context.tsx  # Dashboard state management
│   │   └── embed-utils.ts        # Embedding utilities
│   ├── types/              # TypeScript type definitions
│   ├── data/               # Sample dashboard configurations
│   └── styles/             # Global styles and Tailwind config
├── public/                 # Static assets
└── docs/                   # Additional documentation
```

## 🛠️ Installation

```bash
# Clone the repository
git clone <repository-url>
cd narrowstack-insights

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📊 Usage Examples

### Basic Dashboard Embedding

```typescript
// Public embed
<iframe 
  src="http://localhost:3000/embed/public/dashboard/sales-analytics"
  width="100%"
  height="600"
  frameborder="0"
></iframe>

// With parameters
<iframe 
  src="http://localhost:3000/embed/public/dashboard/sales-analytics?param_region=Europe&param_date_range=last_30_days"
  width="100%"
  height="600"
  frameborder="0"
></iframe>
```

### Signed Embedding

```typescript
import { generateEmbedUrl, generateSignedToken } from '@/lib/embed-utils';

const embedUrl = generateEmbedUrl({
  dashboardId: 'customer-insights',
  embedType: 'signed',
  baseUrl: 'http://localhost:3000',
  parameters: {
    region: 'North America',
    date_range: 'last_quarter'
  },
  embedConfig: {
    bordered: false,
    hideParameters: false,
    lockedParameters: {
      company_id: '12345'
    }
  },
  secretKey: process.env.METABASE_SECRET_KEY
});
```

### React SDK Usage

```typescript
import { DashboardProvider, DashboardLayout } from '@/components';
import { dashboard } from '@/data/sampleDashboards';

function App() {
  return (
    <DashboardProvider 
      dashboard={dashboard}
      embedConfig={{
        bordered: false,
        theme: 'dark'
      }}
      onParameterChange={(params) => console.log('Parameters:', params)}
    >
      <DashboardLayout />
    </DashboardProvider>
  );
}
```

## 🎨 Customization

### Theme Customization

```css
/* Custom theme variables */
:root {
  --metabase-primary: #509EE3;
  --metabase-secondary: #88BF4D;
  --metabase-danger: #ED6E6E;
  --metabase-warning: #F9CF48;
}

/* Dark theme overrides */
.dark {
  --metabase-gray-100: #2E353B;
  --metabase-gray-700: #F9FBFC;
}
```

### Parameter Locking

```typescript
// Lock specific parameters
embedConfig: {
  lockedParameters: {
    company_id: '12345',
    region: 'North America'
  },
  hiddenParameters: ['company_id']
}
```

### Custom Card Types

```typescript
// Extend the Card type
interface CustomCard extends BaseCard {
  type: 'custom';
  customProperty: string;
}

// Create custom card component
const CustomCard: React.FC<{ card: CustomCard }> = ({ card }) => {
  return (
    <BaseCard card={card}>
      {/* Custom implementation */}
    </BaseCard>
  );
};
```

## 🔒 Security Considerations

1. **JWT Signing**: Always sign embeds server-side, never expose secret keys
2. **Sandboxing**: Configure iframe sandbox attributes appropriately
3. **Parameter Validation**: Validate all URL parameters server-side
4. **Row-Level Security**: Implement data sandboxes for multi-tenant scenarios
5. **CORS**: Configure proper CORS headers for embedded dashboards

## 📝 API Reference

### Dashboard Context

```typescript
const {
  dashboard,          // Current dashboard configuration
  parameters,         // Current parameter values
  embedConfig,        // Embedding configuration
  setParameter,       // Update single parameter
  setParameters,      // Update multiple parameters
  refreshDashboard,   // Trigger refresh
  changeTab,          // Switch tabs
  onEvent,           // Subscribe to events
} = useDashboard();
```

### Embed Utilities

```typescript
// Generate embed URL
generateEmbedUrl(options: EmbedOptions): string

// Generate signed JWT token
generateSignedToken(options: SignOptions): string

// Parse embed parameters from URL
parseEmbedParameters(url: string): { parameters, embedConfig }

// Generate iframe HTML code
generateIframeCode(options: IframeOptions): string

// Check parameter visibility/editability
isParameterVisible(parameter, embedConfig): boolean
isParameterEditable(parameter, embedConfig): boolean
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# E2E tests
npm run test:e2e
```

## 🚦 Performance Optimization

1. **Lazy Loading**: Cards are only rendered when visible
2. **Memoization**: Heavy computations are memoized
3. **Virtual Scrolling**: Large tables use virtual scrolling
4. **Query Caching**: Results are cached with configurable TTL
5. **Progressive Enhancement**: Core functionality works without JS

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📚 Resources

- [Metabase Documentation](https://www.metabase.com/docs/latest/)
- [Embedding Guide](https://www.metabase.com/docs/latest/embedding/introduction)
- [API Reference](https://www.metabase.com/docs/latest/api-documentation)
- [Component Library](https://www.metabase.com/docs/latest/developers-guide/custom-viz) 