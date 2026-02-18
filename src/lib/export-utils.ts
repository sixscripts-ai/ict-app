import type { Entity } from './types';

export interface FilteredTradeData {
  id: string;
  name: string;
  type: string;
  domain: string;
  pair?: string;
  direction?: string;
  result?: string;
  setup?: string;
  killzone?: string;
  session?: string;
  riskReward?: number;
  grade?: number;
  exampleType?: string;
  entryPrice?: number;
  stopLoss?: number;
  target?: number;
  pnl?: number;
  concepts?: string[];
  models?: string[];
  timestamp?: string;
}

export function prepareTradeDataForExport(entities: Entity[]): FilteredTradeData[] {
  return entities
    .filter(e => e.type === 'trade')
    .map(trade => {
      const metadata = trade.metadata || {};
      const market = metadata.market || {};
      const setup = metadata.setup || {};
      const execution = metadata.execution || {};
      const meta = metadata.meta || {};
      const context = metadata.context || {};

      return {
        id: trade.id,
        name: trade.name,
        type: trade.type,
        domain: trade.domain,
        pair: market.pair || metadata.pair,
        direction: setup.direction || market.direction || metadata.direction,
        result: execution.result || metadata.result,
        setup: setup.setup_type || metadata.setup_type,
        killzone: context.killzone || metadata.killzone,
        session: context.session || metadata.session,
        riskReward: execution.risk_reward_ratio || metadata.risk_reward,
        grade: metadata.grade || execution.grade,
        exampleType: meta.example_type || metadata.example_type,
        entryPrice: execution.entry_price || market.entry || metadata.entry,
        stopLoss: execution.stop_loss || market.stop || metadata.stop,
        target: execution.target || metadata.target,
        pnl: execution.pnl || metadata.pnl,
        concepts: metadata.concepts || [],
        models: metadata.models || [],
        timestamp: trade.createdAt
      };
    });
}

export function exportToCSV(data: FilteredTradeData[], filename: string = 'ict-trades-export.csv') {
  if (data.length === 0) {
    throw new Error('No data to export');
  }

  const headers = [
    'ID',
    'Name',
    'Type',
    'Domain',
    'Pair',
    'Direction',
    'Result',
    'Setup',
    'Killzone',
    'Session',
    'Risk/Reward',
    'Grade',
    'Example Type',
    'Entry Price',
    'Stop Loss',
    'Target',
    'P&L',
    'Concepts',
    'Models',
    'Timestamp'
  ];

  const escapeCSV = (value: any): string => {
    if (value === null || value === undefined) return '';
    
    if (Array.isArray(value)) {
      value = value.join('; ');
    }
    
    const stringValue = String(value);
    
    if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
      return `"${stringValue.replace(/"/g, '""')}"`;
    }
    
    return stringValue;
  };

  const csvRows = [
    headers.join(','),
    ...data.map(row => [
      escapeCSV(row.id),
      escapeCSV(row.name),
      escapeCSV(row.type),
      escapeCSV(row.domain),
      escapeCSV(row.pair),
      escapeCSV(row.direction),
      escapeCSV(row.result),
      escapeCSV(row.setup),
      escapeCSV(row.killzone),
      escapeCSV(row.session),
      escapeCSV(row.riskReward),
      escapeCSV(row.grade),
      escapeCSV(row.exampleType),
      escapeCSV(row.entryPrice),
      escapeCSV(row.stopLoss),
      escapeCSV(row.target),
      escapeCSV(row.pnl),
      escapeCSV(row.concepts),
      escapeCSV(row.models),
      escapeCSV(row.timestamp)
    ].join(','))
  ];

  const csvContent = csvRows.join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  downloadBlob(blob, filename);
}

export function exportToJSON(data: FilteredTradeData[], filename: string = 'ict-trades-export.json') {
  if (data.length === 0) {
    throw new Error('No data to export');
  }

  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
  downloadBlob(blob, filename);
}

export function exportFullEntities(entities: Entity[], filename: string = 'ict-entities-full-export.json') {
  if (entities.length === 0) {
    throw new Error('No entities to export');
  }

  const jsonContent = JSON.stringify(entities, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
  downloadBlob(blob, filename);
}

function downloadBlob(blob: Blob, filename: string) {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

export function generateExportFilename(baseFilename: string, format: 'csv' | 'json', filters?: {
  result?: string;
  setup?: string;
  riskReward?: number;
  grade?: number;
}): string {
  const timestamp = new Date().toISOString().split('T')[0];
  const parts = [baseFilename, timestamp];

  if (filters) {
    if (filters.result) parts.push(filters.result);
    if (filters.setup) parts.push(filters.setup.replace(/\s+/g, '-').toLowerCase());
    if (filters.riskReward) parts.push(`${filters.riskReward}R`);
    if (filters.grade) parts.push(`grade${filters.grade}`);
  }

  return `${parts.join('-')}.${format}`;
}
