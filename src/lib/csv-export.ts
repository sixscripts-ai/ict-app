import type { Entity } from './types';

export interface CSVExportOptions {
  includeMetadata?: boolean;
  fields?: string[];
}

function escapeCSVValue(value: any): string {
  if (value === null || value === undefined) return '';
  
  const stringValue = String(value);
  
  if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  
  return stringValue;
}

export function exportTradesToCSV(entities: Entity[], options: CSVExportOptions = {}): void {
  const { includeMetadata = true } = options;
  
  const trades = entities.filter(e => e.type === 'trade' && e.metadata?.execution);
  
  if (trades.length === 0) {
    throw new Error('No trades available to export');
  }

  const headers = [
    'Date',
    'Pair',
    'Direction',
    'Setup Type',
    'Entry Price',
    'Stop Loss',
    'Take Profit',
    'Result',
    'P&L',
    'Pips',
    'Risk/Reward',
    'Duration (sec)',
    'Killzone',
    'Session',
    'Grade',
    'Confluence Count'
  ];

  if (includeMetadata) {
    headers.push('Created At', 'Trade ID', 'Description');
  }

  const rows = trades.map(trade => {
    const row = [
      trade.metadata?.context?.date || trade.createdAt.split('T')[0],
      trade.metadata?.market?.pair || '',
      trade.metadata?.market?.direction || '',
      trade.metadata?.setup?.setup_type || '',
      trade.metadata?.execution?.entry_price || '',
      trade.metadata?.execution?.stop_loss || '',
      trade.metadata?.execution?.take_profit || '',
      trade.metadata?.execution?.result || '',
      trade.metadata?.execution?.pnl || 0,
      trade.metadata?.execution?.pips || 0,
      trade.metadata?.execution?.risk_reward_ratio || 0,
      trade.metadata?.execution?.duration_seconds || 0,
      trade.metadata?.context?.killzone || '',
      trade.metadata?.context?.session || '',
      trade.metadata?.meta?.grade || '',
      trade.metadata?.context?.confluence_count || 0
    ];

    if (includeMetadata) {
      row.push(
        trade.createdAt,
        trade.id,
        trade.description || ''
      );
    }

    return row.map(escapeCSVValue).join(',');
  });

  const csv = [headers.map(escapeCSVValue).join(','), ...rows].join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `ict-trades-${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
}

export function exportAnalyticsToCSV(entities: Entity[]): void {
  const trades = entities.filter(e => e.type === 'trade' && e.metadata?.execution);
  
  if (trades.length === 0) {
    throw new Error('No trades available to export analytics');
  }

  const pairStats = new Map<string, { wins: number; losses: number; pnl: number; trades: number }>();
  const setupStats = new Map<string, { wins: number; losses: number; pnl: number; trades: number }>();
  const sessionStats = new Map<string, { wins: number; losses: number; pnl: number; trades: number }>();

  trades.forEach(trade => {
    const pair = trade.metadata?.market?.pair || 'Unknown';
    const setup = trade.metadata?.setup?.setup_type || 'Unknown';
    const session = trade.metadata?.context?.killzone || 'Unknown';
    const result = trade.metadata?.execution?.result;
    const pnl = trade.metadata?.execution?.pnl || 0;

    [
      { map: pairStats, key: pair },
      { map: setupStats, key: setup },
      { map: sessionStats, key: session }
    ].forEach(({ map, key }) => {
      if (map.has(key)) {
        const existing = map.get(key)!;
        existing.trades += 1;
        existing.pnl += pnl;
        if (result === 'WIN') existing.wins += 1;
        if (result === 'LOSS') existing.losses += 1;
      } else {
        map.set(key, {
          wins: result === 'WIN' ? 1 : 0,
          losses: result === 'LOSS' ? 1 : 0,
          pnl,
          trades: 1
        });
      }
    });
  });

  const sections = [
    {
      title: 'Performance by Currency Pair',
      data: Array.from(pairStats.entries()).map(([name, stats]) => ({
        name,
        ...stats,
        winRate: stats.trades > 0 ? ((stats.wins / stats.trades) * 100).toFixed(2) : '0.00'
      }))
    },
    {
      title: 'Performance by Setup Type',
      data: Array.from(setupStats.entries()).map(([name, stats]) => ({
        name,
        ...stats,
        winRate: stats.trades > 0 ? ((stats.wins / stats.trades) * 100).toFixed(2) : '0.00'
      }))
    },
    {
      title: 'Performance by Session/Killzone',
      data: Array.from(sessionStats.entries()).map(([name, stats]) => ({
        name,
        ...stats,
        winRate: stats.trades > 0 ? ((stats.wins / stats.trades) * 100).toFixed(2) : '0.00'
      }))
    }
  ];

  let csv = '';

  sections.forEach((section, sectionIndex) => {
    if (sectionIndex > 0) csv += '\n\n';
    
    csv += `${section.title}\n`;
    csv += 'Name,Total Trades,Wins,Losses,Win Rate (%),Total P&L\n';
    
    section.data.forEach(item => {
      csv += `${escapeCSVValue(item.name)},${item.trades},${item.wins},${item.losses},${item.winRate},${item.pnl.toFixed(2)}\n`;
    });
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `ict-analytics-${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
}

export function exportEntitiesToJSON(entities: Entity[], filename?: string): void {
  const json = JSON.stringify(entities, null, 2);
  
  const blob = new Blob([json], { type: 'application/json;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename || `ict-entities-${new Date().toISOString().split('T')[0]}.json`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
}
