import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { FilePdf, Spinner } from '@phosphor-icons/react';
import { exportAnalyticsToPDF, PDFExportOptions } from '@/lib/pdf-export';
import { toast } from 'sonner';
import type { Entity } from '@/lib/types';

interface PDFExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  entities: Entity[];
}

export function PDFExportDialog({ open, onOpenChange, entities }: PDFExportDialogProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [options, setOptions] = useState<PDFExportOptions>({
    includeMetrics: true,
    includeTradeList: true,
    includePairAnalysis: true,
    includeSetupAnalysis: true,
    includeSessionAnalysis: true,
    includeQualityMetrics: true
  });

  const handleOptionChange = (key: keyof PDFExportOptions, value: boolean) => {
    setOptions(prev => ({ ...prev, [key]: value }));
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await exportAnalyticsToPDF(entities, options);
      toast.success('PDF report generated successfully!', {
        description: 'Your analytics report has been downloaded.'
      });
      onOpenChange(false);
    } catch (error) {
      console.error('PDF export error:', error);
      toast.error('Failed to generate PDF report', {
        description: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    } finally {
      setIsExporting(false);
    }
  };

  const trades = entities.filter(e => e.type === 'trade' && e.metadata?.execution);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FilePdf size={24} className="text-primary" />
            Export Analytics Report
          </DialogTitle>
          <DialogDescription>
            Customize your PDF report by selecting the sections to include
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Checkbox
                id="includeMetrics"
                checked={options.includeMetrics}
                onCheckedChange={(checked) => handleOptionChange('includeMetrics', checked as boolean)}
              />
              <Label htmlFor="includeMetrics" className="cursor-pointer font-normal">
                Performance Overview & Statistics
              </Label>
            </div>

            <Separator />

            <div className="flex items-center space-x-3">
              <Checkbox
                id="includePairAnalysis"
                checked={options.includePairAnalysis}
                onCheckedChange={(checked) => handleOptionChange('includePairAnalysis', checked as boolean)}
              />
              <Label htmlFor="includePairAnalysis" className="cursor-pointer font-normal">
                Performance by Currency Pair
              </Label>
            </div>

            <div className="flex items-center space-x-3">
              <Checkbox
                id="includeSetupAnalysis"
                checked={options.includeSetupAnalysis}
                onCheckedChange={(checked) => handleOptionChange('includeSetupAnalysis', checked as boolean)}
              />
              <Label htmlFor="includeSetupAnalysis" className="cursor-pointer font-normal">
                Performance by Setup Type
              </Label>
            </div>

            <div className="flex items-center space-x-3">
              <Checkbox
                id="includeSessionAnalysis"
                checked={options.includeSessionAnalysis}
                onCheckedChange={(checked) => handleOptionChange('includeSessionAnalysis', checked as boolean)}
              />
              <Label htmlFor="includeSessionAnalysis" className="cursor-pointer font-normal">
                Performance by Killzone/Session
              </Label>
            </div>

            <div className="flex items-center space-x-3">
              <Checkbox
                id="includeQualityMetrics"
                checked={options.includeQualityMetrics}
                onCheckedChange={(checked) => handleOptionChange('includeQualityMetrics', checked as boolean)}
              />
              <Label htmlFor="includeQualityMetrics" className="cursor-pointer font-normal">
                Quality Metrics & Analysis
              </Label>
            </div>

            <Separator />

            <div className="flex items-center space-x-3">
              <Checkbox
                id="includeTradeList"
                checked={options.includeTradeList}
                onCheckedChange={(checked) => handleOptionChange('includeTradeList', checked as boolean)}
              />
              <Label htmlFor="includeTradeList" className="cursor-pointer font-normal">
                Trade History (Last 20 trades)
              </Label>
            </div>
          </div>

          <div className="rounded-lg bg-muted/50 p-3 text-sm text-muted-foreground">
            <div className="flex justify-between">
              <span>Total Trades:</span>
              <span className="font-medium text-foreground">{trades.length}</span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isExporting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleExport}
            disabled={isExporting || trades.length === 0}
            className="gap-2"
          >
            {isExporting ? (
              <>
                <Spinner size={18} className="animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <FilePdf size={18} />
                Generate PDF
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
