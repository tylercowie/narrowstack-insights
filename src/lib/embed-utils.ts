import jwt from 'jsonwebtoken';
import { Dashboard, EmbedConfig, EmbedType } from '@/types';

interface EmbedOptions {
  dashboardId: string;
  embedType: EmbedType;
  baseUrl: string;
  parameters?: Record<string, any>;
  embedConfig?: Partial<EmbedConfig>;
  expiresIn?: string | number;
  secretKey?: string;
}

/**
 * Generate an embed URL for a dashboard
 */
export function generateEmbedUrl(options: EmbedOptions): string {
  const {
    dashboardId,
    embedType,
    baseUrl,
    parameters = {},
    embedConfig = {},
  } = options;

  const url = new URL(`${baseUrl}/embed/${embedType}/dashboard/${dashboardId}`);

  // Add embed configuration parameters
  if (embedConfig.bordered === false) {
    url.searchParams.set('bordered', 'false');
  }
  if (embedConfig.titled === false) {
    url.searchParams.set('titled', 'false');
  }
  if (embedConfig.theme) {
    url.searchParams.set('theme', embedConfig.theme);
  }
  if (embedConfig.hideParameters) {
    url.searchParams.set('hide_parameters', 'true');
  }
  if (embedConfig.downloadButtons === false) {
    url.searchParams.set('hide_download_buttons', 'true');
  }

  // Add dashboard parameters
  Object.entries(parameters).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.set(`param_${key}`, String(value));
    }
  });

  // For signed embeds, add the JWT token
  if (embedType === 'signed' && options.secretKey) {
    const token = generateSignedToken({
      dashboardId,
      parameters,
      embedConfig,
      secretKey: options.secretKey,
      expiresIn: options.expiresIn,
    });
    url.hash = `signed=${token}`;
  }

  return url.toString();
}

/**
 * Generate a signed JWT token for secure embeds
 */
export function generateSignedToken(options: {
  dashboardId: string;
  parameters?: Record<string, any>;
  embedConfig?: Partial<EmbedConfig>;
  secretKey: string;
  expiresIn?: string | number;
}): string {
  const {
    dashboardId,
    parameters = {},
    embedConfig = {},
    secretKey,
    expiresIn = '10m',
  } = options;

  const payload = {
    resource: { dashboard: parseInt(dashboardId) },
    params: parameters,
    ...embedConfig.lockedParameters && { locked_params: embedConfig.lockedParameters },
    ...embedConfig.hiddenParameters && { hidden_params: embedConfig.hiddenParameters },
    exp: Math.floor(Date.now() / 1000) + (typeof expiresIn === 'number' ? expiresIn : 600),
  };

  return jwt.sign(payload, secretKey);
}

/**
 * Parse embed parameters from URL
 */
export function parseEmbedParameters(url: string): {
  parameters: Record<string, any>;
  embedConfig: Partial<EmbedConfig>;
} {
  const urlObj = new URL(url);
  const parameters: Record<string, any> = {};
  const embedConfig: Partial<EmbedConfig> = {};

  // Parse parameters
  urlObj.searchParams.forEach((value, key) => {
    if (key.startsWith('param_')) {
      const paramName = key.substring(6);
      parameters[paramName] = value;
    } else {
      // Parse embed config
      switch (key) {
        case 'bordered':
          embedConfig.bordered = value !== 'false';
          break;
        case 'titled':
          embedConfig.titled = value !== 'false';
          break;
        case 'theme':
          embedConfig.theme = value as any;
          break;
        case 'hide_parameters':
          embedConfig.hideParameters = value === 'true';
          break;
        case 'hide_download_buttons':
          embedConfig.downloadButtons = value !== 'true';
          break;
      }
    }
  });

  return { parameters, embedConfig };
}

/**
 * Generate iframe code for embedding
 */
export function generateIframeCode(options: {
  url: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  sandbox?: string[];
}): string {
  const {
    url,
    width = '100%',
    height = 600,
    className = '',
    sandbox = ['allow-scripts', 'allow-same-origin', 'allow-popups', 'allow-forms'],
  } = options;

  const widthAttr = typeof width === 'number' ? `${width}px` : width;
  const heightAttr = typeof height === 'number' ? `${height}px` : height;

  return `<iframe
  src="${url}"
  width="${widthAttr}"
  height="${heightAttr}"
  frameborder="0"
  ${className ? `class="${className}"` : ''}
  ${sandbox.length ? `sandbox="${sandbox.join(' ')}"` : ''}
  allowtransparency="true"
></iframe>`;
}

/**
 * Validate embed permissions
 */
export function validateEmbedPermissions(
  embedType: EmbedType,
  requestedPermissions: string[]
): boolean {
  const allowedPermissions: Record<EmbedType, string[]> = {
    public: ['view'],
    signed: ['view', 'export'],
    interactive: ['view', 'export', 'drill', 'filter'],
    sdk: ['view', 'export', 'drill', 'filter', 'edit'],
  };

  const allowed = allowedPermissions[embedType] || [];
  return requestedPermissions.every(perm => allowed.includes(perm));
}

/**
 * Build sandbox attributes for iframes
 */
export function buildSandboxAttributes(embedType: EmbedType): string[] {
  const baseAttributes = ['allow-scripts', 'allow-same-origin'];
  
  switch (embedType) {
    case 'public':
      return baseAttributes;
    case 'signed':
      return [...baseAttributes, 'allow-forms'];
    case 'interactive':
    case 'sdk':
      return [...baseAttributes, 'allow-forms', 'allow-popups', 'allow-modals'];
    default:
      return baseAttributes;
  }
}

/**
 * Check if a parameter should be visible
 */
export function isParameterVisible(
  parameter: { id: string; hidden?: boolean },
  embedConfig: EmbedConfig
): boolean {
  if (parameter.hidden) return false;
  if (embedConfig.hideParameters) return false;
  if (embedConfig.hiddenParameters?.includes(parameter.id)) return false;
  return true;
}

/**
 * Check if a parameter is editable
 */
export function isParameterEditable(
  parameter: { id: string; locked?: boolean },
  embedConfig: EmbedConfig
): boolean {
  if (parameter.locked) return false;
  if (embedConfig.lockedParameters?.[parameter.id] !== undefined) return false;
  return true;
}

/**
 * Get effective parameter value
 */
export function getEffectiveParameterValue(
  parameterId: string,
  currentValue: any,
  defaultValue: any,
  embedConfig: EmbedConfig
): any {
  // Locked parameters take precedence
  if (embedConfig.lockedParameters?.[parameterId] !== undefined) {
    return embedConfig.lockedParameters[parameterId];
  }
  
  // Use current value if set
  if (currentValue !== undefined) {
    return currentValue;
  }
  
  // Fall back to default
  return defaultValue;
} 