import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import React from 'react';
import { MagnifyingGlass } from '@phosphor-icons/react';

interface EmptyStateProps {
  message?: string;
  description?: string;
  className?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export function EmptyState({ 
  message = "No items found", 
  description, 
  className,
  icon,
  children
}: EmptyStateProps) {
  return (
    <Card className={cn("p-12 text-center bg-card/50", className)}>
      <div className="mx-auto mb-4 text-muted-foreground flex justify-center">
        {icon || <MagnifyingGlass size={48} />}
      </div>
      <p className="text-lg font-medium">{message}</p>
      {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
      {children && <div className="mt-4">{children}</div>}
    </Card>
  );
}
