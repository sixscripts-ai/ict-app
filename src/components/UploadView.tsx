import { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CloudArrowUp, Upload as UploadIcon, File, Database } from '@phosphor-icons/react';
import type { FileProcessingLog, Upload } from '@/lib/types';

interface UploadViewProps {
  uploads: Upload[];
  logs: FileProcessingLog[];
  onFileUpload: (files: FileList) => void;
  onRepoUpload: (url: string) => void;
  onDemoLoad?: () => void;
}

export function UploadView({ uploads, logs, onFileUpload, onRepoUpload, onDemoLoad }: UploadViewProps) {
  const [repoUrl, setRepoUrl] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) {
      onFileUpload(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleRepoSubmit = () => {
    if (repoUrl.trim()) {
      onRepoUpload(repoUrl.trim());
      setRepoUrl('');
    }
  };

  const currentUpload = uploads[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Upload & Ingest</h1>
          <p className="text-muted-foreground mt-1">Upload files or connect a GitHub repository</p>
        </div>
        {onDemoLoad && (
          <Button onClick={onDemoLoad} variant="outline" className="gap-2">
            <Database size={16} />
            Load Demo ICT Data
          </Button>
        )}
      </div>

      <Card 
        className={`p-12 border-2 border-dashed transition-all ${
          isDragging ? 'border-primary bg-primary/5' : 'border-border bg-card/50'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg bg-primary/10">
            <CloudArrowUp size={32} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Drop files here</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Supports: .json, .yaml, .yml, .md, .csv, .py, .sql, .txt, .png, .jpg, .pdf
            </p>
          </div>
          <Button 
            onClick={() => fileInputRef.current?.click()}
            className="mt-4"
          >
            <UploadIcon size={16} className="mr-2" />
            Choose Files
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".json,.yaml,.yml,.md,.csv,.py,.sql,.txt,.png,.jpg,.pdf"
            className="hidden"
            onChange={(e) => e.target.files && onFileUpload(e.target.files)}
          />
        </div>
      </Card>

      <Card className="p-6 bg-card/50 backdrop-blur border-border/50">
        <h2 className="text-xl font-semibold mb-4">GitHub Repository</h2>
        <div className="flex gap-2">
          <Input
            placeholder="https://github.com/user/repo"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleRepoSubmit()}
          />
          <Button onClick={handleRepoSubmit} disabled={!repoUrl.trim()}>
            Ingest Repo
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Example: https://github.com/sixscriptssoftware/train-ict
        </p>
      </Card>

      {currentUpload && currentUpload.status === 'processing' && (
        <Card className="p-6 bg-card/50 backdrop-blur border-border/50">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{currentUpload.name}</h3>
              <Badge>Processing</Badge>
            </div>
            <Progress 
              value={(currentUpload.processedCount / currentUpload.fileCount) * 100}
            />
            <p className="text-sm text-muted-foreground">
              {currentUpload.processedCount} / {currentUpload.fileCount} files processed
            </p>
          </div>
        </Card>
      )}

      <Card className="p-6 bg-card/50 backdrop-blur border-border/50">
        <h2 className="text-xl font-semibold mb-4">Processing Log</h2>
        <ScrollArea className="h-[400px]">
          <div className="space-y-2 font-mono text-xs">
            {logs.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No processing activity yet</p>
            ) : (
              logs.map((log) => (
                <div 
                  key={log.id} 
                  className={`p-3 rounded-lg ${
                    log.status === 'completed' ? 'bg-primary/10' : 
                    log.status === 'error' ? 'bg-destructive/10' : 
                    'bg-secondary/30'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <File size={16} className="mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="truncate">{log.filePath}</p>
                      <p className={`mt-1 ${
                        log.status === 'error' ? 'text-destructive' : 'text-muted-foreground'
                      }`}>
                        {log.message}
                      </p>
                    </div>
                    <span className="text-muted-foreground whitespace-nowrap text-[10px]">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
}
