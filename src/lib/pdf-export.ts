import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import type { Entity } from './types';

export interface PDFExportOptions {
  includeCharts?: boolean;
  includeMetrics?: boolean;
  includeTradeList?: boolean;
  includePairAnalysis?: boolean;
  includeSetupAnalysis?: boolean;
  includeSessionAnalysis?: boolean;
  includeQualityMetrics?: boolean;
}

interface TradeMetrics {
  totalTrades: number;
  winners: number;
  losers: number;
  winRate: number;
  totalPnL: number;
  avgWin: number;
  avgLoss: number;
  profitFactor: number;
  avgRR: number;
  bestTrade: number;
  worstTrade: number;
  avgDuration: number;
  totalPips: number;
}

const COLORS = {
  primary: [116, 195, 143],
  accent: [105, 180, 201],
  text: [229, 229, 229],
  textMuted: [166, 166, 166],
  background: [26, 26, 46],
  card: [51, 51, 67],
  border: [89, 89, 106]
};

export class PDFExporter {
  private pdf: jsPDF;
  private pageWidth: number;
  private pageHeight: number;
  private margin: number = 20;
  private currentY: number = 20;
  private lineHeight: number = 7;

  constructor() {
    this.pdf = new jsPDF('p', 'mm', 'a4');
    this.pageWidth = this.pdf.internal.pageSize.getWidth();
    this.pageHeight = this.pdf.internal.pageSize.getHeight();
  }

  private checkPageBreak(requiredSpace: number = 20) {
    if (this.currentY + requiredSpace > this.pageHeight - this.margin) {
      this.pdf.addPage();
      this.currentY = this.margin;
    }
  }

  private addTitle(text: string) {
    this.pdf.setFontSize(24);
    this.pdf.setTextColor(...COLORS.primary);
    this.pdf.text(text, this.margin, this.currentY);
    this.currentY += 12;
  }

  private addSectionTitle(text: string) {
    this.checkPageBreak(15);
    this.pdf.setFontSize(16);
    this.pdf.setTextColor(...COLORS.primary);
    this.pdf.text(text, this.margin, this.currentY);
    this.currentY += 10;
  }

  private addSubtitle(text: string) {
    this.pdf.setFontSize(12);
    this.pdf.setTextColor(...COLORS.textMuted);
    this.pdf.text(text, this.margin, this.currentY);
    this.currentY += 8;
  }

  private addText(text: string, x?: number) {
    this.pdf.setFontSize(10);
    this.pdf.setTextColor(...COLORS.text);
    this.pdf.text(text, x || this.margin, this.currentY);
    this.currentY += this.lineHeight;
  }

  private addMetricBox(label: string, value: string, x: number, y: number, width: number, height: number, isPositive?: boolean) {
    this.pdf.setDrawColor(...COLORS.border);
    this.pdf.setFillColor(...COLORS.card);
    this.pdf.roundedRect(x, y, width, height, 2, 2, 'FD');

    this.pdf.setFontSize(9);
    this.pdf.setTextColor(...COLORS.textMuted);
    this.pdf.text(label, x + 3, y + 6);

    this.pdf.setFontSize(16);
    if (isPositive !== undefined) {
      this.pdf.setTextColor(...(isPositive ? COLORS.primary : [255, 99, 102]));
    } else {
      this.pdf.setTextColor(...COLORS.text);
    }
    this.pdf.text(value, x + 3, y + 16);
  }

  private addDivider() {
    this.checkPageBreak(5);
    this.pdf.setDrawColor(...COLORS.border);
    this.pdf.line(this.margin, this.currentY, this.pageWidth - this.margin, this.currentY);
    this.currentY += 8;
  }

  private async captureChart(elementId: string): Promise<string | null> {
    const element = document.getElementById(elementId);
    if (!element) return null;

    try {
      const canvas = await html2canvas(element, {
        backgroundColor: null,
        scale: 2
      });
      return canvas.toDataURL('image/png');
    } catch (error) {
      console.error('Error capturing chart:', error);
      return null;
    }
  }

  private calculateMetrics(trades: Entity[]): TradeMetrics {
    const winners = trades.filter(t => t.metadata?.execution?.result === 'WIN');
    const losers = trades.filter(t => t.metadata?.execution?.result === 'LOSS');

    const totalPnL = trades.reduce((sum, t) => sum + (t.metadata?.execution?.pnl || 0), 0);
    const totalWinPnL = winners.reduce((sum, t) => sum + (t.metadata?.execution?.pnl || 0), 0);
    const totalLossPnL = Math.abs(losers.reduce((sum, t) => sum + (t.metadata?.execution?.pnl || 0), 0));
    const totalPips = trades.reduce((sum, t) => sum + (t.metadata?.execution?.pips || 0), 0);
    const avgDuration = trades.reduce((sum, t) => sum + (t.metadata?.execution?.duration_seconds || 0), 0) / (trades.length || 1);

    const allPnLs = trades.map(t => t.metadata?.execution?.pnl || 0);

    return {
      totalTrades: trades.length,
      winners: winners.length,
      losers: losers.length,
      winRate: trades.length > 0 ? (winners.length / trades.length) * 100 : 0,
      totalPnL,
      avgWin: winners.length > 0 ? totalWinPnL / winners.length : 0,
      avgLoss: losers.length > 0 ? totalLossPnL / losers.length : 0,
      profitFactor: totalLossPnL > 0 ? totalWinPnL / totalLossPnL : totalWinPnL > 0 ? 999 : 0,
      avgRR: trades.reduce((sum, t) => sum + (t.metadata?.execution?.risk_reward_ratio || 0), 0) / (trades.length || 1),
      bestTrade: allPnLs.length > 0 ? Math.max(...allPnLs) : 0,
      worstTrade: allPnLs.length > 0 ? Math.min(...allPnLs) : 0,
      avgDuration,
      totalPips
    };
  }

  private addMetricsOverview(metrics: TradeMetrics) {
    this.addSectionTitle('Performance Overview');

    const boxWidth = (this.pageWidth - this.margin * 2 - 9) / 4;
    const boxHeight = 24;
    const startY = this.currentY;

    this.addMetricBox('Total Trades', metrics.totalTrades.toString(), this.margin, startY, boxWidth, boxHeight);
    this.addMetricBox('Win Rate', `${metrics.winRate.toFixed(1)}%`, this.margin + boxWidth + 3, startY, boxWidth, boxHeight, metrics.winRate >= 50);
    this.addMetricBox('Total P&L', `$${metrics.totalPnL.toFixed(2)}`, this.margin + (boxWidth + 3) * 2, startY, boxWidth, boxHeight, metrics.totalPnL >= 0);
    this.addMetricBox('Profit Factor', metrics.profitFactor === 999 ? '∞' : metrics.profitFactor.toFixed(2), this.margin + (boxWidth + 3) * 3, startY, boxWidth, boxHeight, metrics.profitFactor > 1);

    this.currentY = startY + boxHeight + 10;

    const startY2 = this.currentY;
    this.addMetricBox('Avg Win', `$${metrics.avgWin.toFixed(2)}`, this.margin, startY2, boxWidth, boxHeight, true);
    this.addMetricBox('Avg Loss', `$${metrics.avgLoss.toFixed(2)}`, this.margin + boxWidth + 3, startY2, boxWidth, boxHeight, false);
    this.addMetricBox('Avg R:R', metrics.avgRR.toFixed(2), this.margin + (boxWidth + 3) * 2, startY2, boxWidth, boxHeight);
    this.addMetricBox('Total Pips', metrics.totalPips.toFixed(1), this.margin + (boxWidth + 3) * 3, startY2, boxWidth, boxHeight, metrics.totalPips >= 0);

    this.currentY = startY2 + boxHeight + 15;
  }

  private addStatisticsTable(metrics: TradeMetrics) {
    this.checkPageBreak(60);
    this.addSectionTitle('Detailed Statistics');

    const stats = [
      ['Total Trades', metrics.totalTrades.toString()],
      ['Winning Trades', `${metrics.winners} (${metrics.winRate.toFixed(1)}%)`],
      ['Losing Trades', `${metrics.losers} (${(100 - metrics.winRate).toFixed(1)}%)`],
      ['Total P&L', `$${metrics.totalPnL.toFixed(2)}`],
      ['Total Pips', metrics.totalPips.toFixed(1)],
      ['Average Win', `$${metrics.avgWin.toFixed(2)}`],
      ['Average Loss', `$${metrics.avgLoss.toFixed(2)}`],
      ['Best Trade', `$${metrics.bestTrade.toFixed(2)}`],
      ['Worst Trade', `$${metrics.worstTrade.toFixed(2)}`],
      ['Profit Factor', metrics.profitFactor === 999 ? '∞' : metrics.profitFactor.toFixed(2)],
      ['Average R:R', metrics.avgRR.toFixed(2)],
      ['Avg Trade Duration', `${Math.floor(metrics.avgDuration / 60)}m ${Math.floor(metrics.avgDuration % 60)}s`]
    ];

    const colWidth = (this.pageWidth - this.margin * 2) / 2;
    const rowHeight = 8;

    stats.forEach(([label, value], index) => {
      this.checkPageBreak(rowHeight + 5);
      const y = this.currentY;

      this.pdf.setFontSize(10);
      this.pdf.setTextColor(...COLORS.textMuted);
      this.pdf.text(label, this.margin, y);

      this.pdf.setTextColor(...COLORS.text);
      this.pdf.text(value, this.margin + colWidth, y);

      this.currentY += rowHeight;
    });

    this.currentY += 10;
  }

  private addPairAnalysis(trades: Entity[]) {
    this.checkPageBreak(40);
    this.addSectionTitle('Performance by Currency Pair');

    const pairMap = new Map<string, { wins: number; losses: number; pnl: number; trades: number }>();

    trades.forEach(trade => {
      const pair = trade.metadata?.market?.pair || 'Unknown';
      const result = trade.metadata?.execution?.result;
      const pnl = trade.metadata?.execution?.pnl || 0;

      if (pairMap.has(pair)) {
        const existing = pairMap.get(pair)!;
        existing.trades += 1;
        existing.pnl += pnl;
        if (result === 'WIN') existing.wins += 1;
        if (result === 'LOSS') existing.losses += 1;
      } else {
        pairMap.set(pair, {
          wins: result === 'WIN' ? 1 : 0,
          losses: result === 'LOSS' ? 1 : 0,
          pnl,
          trades: 1
        });
      }
    });

    const pairData = Array.from(pairMap.entries())
      .map(([pair, data]) => ({
        pair,
        ...data,
        winRate: data.trades > 0 ? (data.wins / data.trades) * 100 : 0
      }))
      .sort((a, b) => b.pnl - a.pnl);

    pairData.forEach(pair => {
      this.checkPageBreak(12);
      
      this.pdf.setFontSize(11);
      this.pdf.setTextColor(...COLORS.primary);
      this.pdf.text(pair.pair, this.margin, this.currentY);
      this.currentY += 6;

      this.pdf.setFontSize(9);
      this.pdf.setTextColor(...COLORS.text);
      this.pdf.text(`Trades: ${pair.trades}  |  Win Rate: ${pair.winRate.toFixed(1)}%  |  P&L: $${pair.pnl.toFixed(2)}  |  Record: ${pair.wins}W / ${pair.losses}L`, this.margin + 5, this.currentY);
      this.currentY += 8;
    });

    this.currentY += 5;
  }

  private addSetupAnalysis(trades: Entity[]) {
    this.checkPageBreak(40);
    this.addSectionTitle('Performance by Setup Type');

    const setupMap = new Map<string, { wins: number; losses: number; pnl: number; trades: number }>();

    trades.forEach(trade => {
      const setup = trade.metadata?.setup?.setup_type || 'Unknown';
      const result = trade.metadata?.execution?.result;
      const pnl = trade.metadata?.execution?.pnl || 0;

      if (setupMap.has(setup)) {
        const existing = setupMap.get(setup)!;
        existing.trades += 1;
        existing.pnl += pnl;
        if (result === 'WIN') existing.wins += 1;
        if (result === 'LOSS') existing.losses += 1;
      } else {
        setupMap.set(setup, {
          wins: result === 'WIN' ? 1 : 0,
          losses: result === 'LOSS' ? 1 : 0,
          pnl,
          trades: 1
        });
      }
    });

    const setupData = Array.from(setupMap.entries())
      .map(([setup, data]) => ({
        setup: setup.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        ...data,
        winRate: data.trades > 0 ? (data.wins / data.trades) * 100 : 0
      }))
      .sort((a, b) => b.winRate - a.winRate);

    setupData.forEach(setup => {
      this.checkPageBreak(12);
      
      this.pdf.setFontSize(11);
      this.pdf.setTextColor(...COLORS.primary);
      this.pdf.text(setup.setup, this.margin, this.currentY);
      this.currentY += 6;

      this.pdf.setFontSize(9);
      this.pdf.setTextColor(...COLORS.text);
      this.pdf.text(`Trades: ${setup.trades}  |  Win Rate: ${setup.winRate.toFixed(1)}%  |  P&L: $${setup.pnl.toFixed(2)}`, this.margin + 5, this.currentY);
      this.currentY += 8;
    });

    this.currentY += 5;
  }

  private addSessionAnalysis(trades: Entity[]) {
    this.checkPageBreak(40);
    this.addSectionTitle('Performance by Killzone/Session');

    const sessionMap = new Map<string, { wins: number; losses: number; pnl: number; trades: number }>();

    trades.forEach(trade => {
      const session = trade.metadata?.context?.killzone || 'Unknown';
      const result = trade.metadata?.execution?.result;
      const pnl = trade.metadata?.execution?.pnl || 0;

      if (sessionMap.has(session)) {
        const existing = sessionMap.get(session)!;
        existing.trades += 1;
        existing.pnl += pnl;
        if (result === 'WIN') existing.wins += 1;
        if (result === 'LOSS') existing.losses += 1;
      } else {
        sessionMap.set(session, {
          wins: result === 'WIN' ? 1 : 0,
          losses: result === 'LOSS' ? 1 : 0,
          pnl,
          trades: 1
        });
      }
    });

    const sessionData = Array.from(sessionMap.entries())
      .map(([session, data]) => ({
        session: session.replace(/_/g, ' '),
        ...data,
        winRate: data.trades > 0 ? (data.wins / data.trades) * 100 : 0
      }))
      .sort((a, b) => b.pnl - a.pnl);

    sessionData.forEach(session => {
      this.checkPageBreak(12);
      
      this.pdf.setFontSize(11);
      this.pdf.setTextColor(...COLORS.primary);
      this.pdf.text(session.session, this.margin, this.currentY);
      this.currentY += 6;

      this.pdf.setFontSize(9);
      this.pdf.setTextColor(...COLORS.text);
      this.pdf.text(`Trades: ${session.trades}  |  Win Rate: ${session.winRate.toFixed(1)}%  |  P&L: $${session.pnl.toFixed(2)}`, this.margin + 5, this.currentY);
      this.currentY += 8;
    });

    this.currentY += 5;
  }

  private addTradeList(trades: Entity[]) {
    this.checkPageBreak(40);
    this.addSectionTitle('Trade History');

    const sortedTrades = [...trades].sort((a, b) => 
      new Date(b.metadata?.context?.date || b.createdAt).getTime() - 
      new Date(a.metadata?.context?.date || a.createdAt).getTime()
    );

    sortedTrades.slice(0, 20).forEach((trade, index) => {
      this.checkPageBreak(15);

      const date = trade.metadata?.context?.date || trade.createdAt.split('T')[0];
      const pair = trade.metadata?.market?.pair || 'N/A';
      const direction = trade.metadata?.market?.direction || 'N/A';
      const setup = trade.metadata?.setup?.setup_type || 'N/A';
      const result = trade.metadata?.execution?.result || 'N/A';
      const pnl = trade.metadata?.execution?.pnl || 0;
      const rr = trade.metadata?.execution?.risk_reward_ratio || 0;

      this.pdf.setFontSize(10);
      this.pdf.setTextColor(...COLORS.text);
      this.pdf.text(`${index + 1}. ${date} - ${pair} ${direction.toUpperCase()}`, this.margin, this.currentY);
      this.currentY += 5;

      this.pdf.setFontSize(9);
      this.pdf.setTextColor(...COLORS.textMuted);
      this.pdf.text(`Setup: ${setup.replace(/_/g, ' ')}`, this.margin + 5, this.currentY);
      this.currentY += 5;

      const isWin = result === 'WIN';
      this.pdf.setTextColor(...(isWin ? COLORS.primary : [255, 99, 102]));
      this.pdf.text(`Result: ${result}  |  P&L: $${pnl.toFixed(2)}  |  R:R: ${rr.toFixed(2)}`, this.margin + 5, this.currentY);
      this.currentY += 8;
    });

    if (sortedTrades.length > 20) {
      this.checkPageBreak(10);
      this.pdf.setFontSize(9);
      this.pdf.setTextColor(...COLORS.textMuted);
      this.pdf.text(`... and ${sortedTrades.length - 20} more trades`, this.margin, this.currentY);
      this.currentY += 10;
    }
  }

  private addChartImage(imageData: string, title: string) {
    this.checkPageBreak(100);
    
    this.pdf.setFontSize(12);
    this.pdf.setTextColor(...COLORS.primary);
    this.pdf.text(title, this.margin, this.currentY);
    this.currentY += 8;

    const imgWidth = this.pageWidth - this.margin * 2;
    const imgHeight = 80;

    try {
      this.pdf.addImage(imageData, 'PNG', this.margin, this.currentY, imgWidth, imgHeight);
      this.currentY += imgHeight + 10;
    } catch (error) {
      console.error('Error adding chart image:', error);
      this.pdf.setFontSize(10);
      this.pdf.setTextColor(...COLORS.textMuted);
      this.pdf.text('Chart could not be rendered', this.margin, this.currentY);
      this.currentY += 10;
    }
  }

  async generateReport(entities: Entity[], options: PDFExportOptions = {}): Promise<void> {
    const {
      includeMetrics = true,
      includeTradeList = true,
      includePairAnalysis = true,
      includeSetupAnalysis = true,
      includeSessionAnalysis = true,
      includeQualityMetrics = true
    } = options;

    const trades = entities.filter(e => e.type === 'trade' && e.metadata?.execution);
    const metrics = this.calculateMetrics(trades);

    this.addTitle('ICT Knowledge Engine');
    this.addSubtitle('Performance Analytics Report');
    this.addSubtitle(`Generated: ${new Date().toLocaleString()}`);
    this.currentY += 5;

    this.addDivider();

    if (includeMetrics) {
      this.addMetricsOverview(metrics);
      this.addDivider();
      this.addStatisticsTable(metrics);
      this.addDivider();
    }

    if (includePairAnalysis && trades.length > 0) {
      this.addPairAnalysis(trades);
      this.addDivider();
    }

    if (includeSetupAnalysis && trades.length > 0) {
      this.addSetupAnalysis(trades);
      this.addDivider();
    }

    if (includeSessionAnalysis && trades.length > 0) {
      this.addSessionAnalysis(trades);
      this.addDivider();
    }

    if (includeTradeList && trades.length > 0) {
      this.addTradeList(trades);
    }

    const totalPages = this.pdf.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      this.pdf.setPage(i);
      this.pdf.setFontSize(8);
      this.pdf.setTextColor(...COLORS.textMuted);
      this.pdf.text(
        `Page ${i} of ${totalPages}`,
        this.pageWidth / 2,
        this.pageHeight - 10,
        { align: 'center' }
      );
    }
  }

  save(filename: string = 'ict-analytics-report.pdf') {
    this.pdf.save(filename);
  }

  getBlob(): Blob {
    return this.pdf.output('blob');
  }
}

export async function exportAnalyticsToPDF(
  entities: Entity[],
  options?: PDFExportOptions
): Promise<void> {
  const exporter = new PDFExporter();
  await exporter.generateReport(entities, options);
  exporter.save(`ict-analytics-${new Date().toISOString().split('T')[0]}.pdf`);
}
