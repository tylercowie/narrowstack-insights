// Core Dashboard Types
export interface Dashboard {
  id: string;
  title: string;
  description?: string;
  theme: 'light' | 'dark' | 'custom';
  embedType: EmbedType;
  embedConfig: EmbedConfig;
  tabs: DashboardTab[];
  parameters: Parameter[];
  layout: GridLayout;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardTab {
  id: string;
  name: string;
  order: number;
  cards: Card[];
  visible: boolean;
}

// Embedding Types
export type EmbedType = 'public' | 'signed' | 'interactive' | 'sdk';

export interface EmbedConfig {
  bordered: boolean;
  titled: boolean;
  theme?: 'light' | 'dark' | 'night' | 'transparent';
  hideParameters?: boolean;
  lockedParameters?: Record<string, any>;
  hiddenParameters?: string[];
  font?: string;
  background?: string;
  downloadButtons?: boolean;
  fullscreen?: boolean;
}

// Card Types
export type CardType = 
  | 'question' 
  | 'text' 
  | 'link' 
  | 'action' 
  | 'iframe' 
  | 'static';

export interface BaseCard {
  id: string;
  type: CardType;
  title?: string;
  subtitle?: string;
  gridPosition: GridPosition;
  visibilityCondition?: VisibilityCondition;
}

export interface QuestionCard extends BaseCard {
  type: 'question';
  visualization: VisualizationType;
  query: Query;
  displayConfig: VisualizationConfig;
  drillThrough?: DrillThroughConfig;
}

export interface TextCard extends BaseCard {
  type: 'text';
  content: string; // Markdown content
  variables?: Record<string, string>;
}

export interface LinkCard extends BaseCard {
  type: 'link';
  url: string;
  openInNewTab: boolean;
  icon?: string;
}

export interface ActionCard extends BaseCard {
  type: 'action';
  actionType: 'query' | 'http';
  label: string;
  color: 'primary' | 'secondary' | 'danger' | 'warning';
  confirmation?: string;
  payload: any;
}

export interface IframeCard extends BaseCard {
  type: 'iframe';
  url: string;
  height: number;
  sandbox?: string[];
}

export type Card = QuestionCard | TextCard | LinkCard | ActionCard | IframeCard;

// Visualization Types
export type VisualizationType = 
  | 'bar' 
  | 'line' 
  | 'area' 
  | 'pie' 
  | 'scatter' 
  | 'funnel' 
  | 'gauge' 
  | 'progress' 
  | 'number' 
  | 'trend' 
  | 'table' 
  | 'pivot' 
  | 'map';

export interface VisualizationConfig {
  colors?: string[];
  xAxis?: AxisConfig;
  yAxis?: AxisConfig;
  legend?: LegendConfig;
  labels?: boolean;
  tooltips?: boolean;
  stacked?: boolean;
  normalized?: boolean;
  trendline?: boolean;
  goalLine?: number;
  conditionalFormatting?: ConditionalFormat[];
}

// Filter/Parameter Types
export type ParameterType = 
  | 'date' 
  | 'date/range' 
  | 'date/relative' 
  | 'number' 
  | 'text' 
  | 'category' 
  | 'location' 
  | 'id' 
  | 'boolean';

export interface Parameter {
  id: string;
  name: string;
  slug: string;
  type: ParameterType;
  default?: any;
  required?: boolean;
  widget: WidgetType;
  widgetConfig?: WidgetConfig;
  mappings: ParameterMapping[];
  locked?: boolean;
  hidden?: boolean;
}

export type WidgetType = 
  | 'input' 
  | 'dropdown' 
  | 'search' 
  | 'date_picker' 
  | 'date_range' 
  | 'relative_date' 
  | 'number_input' 
  | 'slider' 
  | 'toggle' 
  | 'location_picker';

export interface WidgetConfig {
  placeholder?: string;
  options?: SelectOption[];
  min?: number;
  max?: number;
  step?: number;
  multiSelect?: boolean;
  autoApply?: boolean;
  operators?: FilterOperator[];
}

export interface ParameterMapping {
  cardId: string;
  target: string[];
}

// Layout Types
export interface GridLayout {
  cols: number;
  rowHeight: number;
  margin: [number, number];
  containerPadding: [number, number];
}

export interface GridPosition {
  x: number;
  y: number;
  w: number;
  h: number;
  minW?: number;
  maxW?: number;
  minH?: number;
  maxH?: number;
  static?: boolean;
}

// Query and Data Types
export interface Query {
  database: string;
  type: 'native' | 'query';
  native?: {
    query: string;
    templateTags?: Record<string, TemplateTag>;
  };
  query?: StructuredQuery;
}

export interface TemplateTag {
  name: string;
  displayName: string;
  type: 'text' | 'number' | 'date' | 'dimension';
  required: boolean;
  default?: any;
}

export interface StructuredQuery {
  sourceTable: number;
  aggregation?: Aggregation[];
  breakout?: Breakout[];
  filter?: Filter[];
  orderBy?: OrderBy[];
  limit?: number;
}

// Supporting Types
export interface AxisConfig {
  title?: string;
  scale?: 'linear' | 'log' | 'time';
  min?: number;
  max?: number;
  format?: string;
}

export interface LegendConfig {
  show: boolean;
  position: 'top' | 'bottom' | 'left' | 'right';
}

export interface ConditionalFormat {
  column: string;
  operator: ComparisonOperator;
  value: any;
  color?: string;
  backgroundColor?: string;
  icon?: string;
}

export interface VisibilityCondition {
  parameter: string;
  operator: ComparisonOperator;
  value: any;
}

export interface DrillThroughConfig {
  type: 'dashboard' | 'url' | 'filter' | 'zoom';
  target?: string;
  parameterMappings?: Record<string, string>;
}

export interface SelectOption {
  value: string;
  label: string;
  icon?: string;
}

export type FilterOperator = 
  | '=' 
  | '!=' 
  | '>' 
  | '<' 
  | '>=' 
  | '<=' 
  | 'contains' 
  | 'starts_with' 
  | 'ends_with' 
  | 'between' 
  | 'is_null' 
  | 'not_null';

export type ComparisonOperator = '=' | '!=' | '>' | '<' | '>=' | '<=' | 'in' | 'not_in';

export interface Aggregation {
  type: 'count' | 'sum' | 'avg' | 'min' | 'max' | 'distinct';
  field?: string;
}

export interface Breakout {
  field: string;
  temporal?: 'minute' | 'hour' | 'day' | 'week' | 'month' | 'quarter' | 'year';
}

export interface Filter {
  field: string;
  operator: FilterOperator;
  value: any;
}

export interface OrderBy {
  field: string;
  direction: 'asc' | 'desc';
}

// Event Types
export interface DashboardEvent {
  type: 'filter_change' | 'card_click' | 'tab_change' | 'refresh' | 'export';
  payload: any;
}

// Auth/Security Types
export interface EmbedAuth {
  token?: string;
  expiresAt?: string;
  permissions?: string[];
  sandboxes?: Sandbox[];
}

export interface Sandbox {
  table: string;
  permission: 'read' | 'write';
  filter: Record<string, any>;
} 