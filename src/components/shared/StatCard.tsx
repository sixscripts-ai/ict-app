import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  description?: string;
  className?: string;
  iconContainerClassName?: string;
  onClick?: () => void;
}

export function StatCard({ label, value, icon, description, className, iconContainerClassName, onClick }: StatCardProps) {
  return (
    <Card 
      className={cn(
        "p-5 bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-colors",
        onClick && "cursor-pointer hover:bg-card/80",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        {icon && (
          <div className={cn("p-2.5 rounded-lg bg-primary/10 text-primary", iconContainerClassName)}>
            {icon}
          </div>
        )}
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">{label}</p>
          <div className="text-2xl font-semibold">{value}</div>
          {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
        </div>
      </div>
    </Card>
  );
}
