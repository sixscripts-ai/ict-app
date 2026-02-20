import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DashboardView } from './DashboardView';
import type { DatabaseStats } from '@/lib/types';
import '@testing-library/jest-dom';

describe('DashboardView', () => {
  const mockStats: DatabaseStats = {
    totalEntities: 0,
    totalRelationships: 0,
    totalUploads: 0,
    entitiesByType: {
      concept: 0, model: 0, trade: 0, schema: 0, code_module: 0, document: 0, journal: 0, training_data: 0, chart: 0
    },
    entitiesByDomain: {
      concepts: 0, models: 0, trades: 0, schemas: 0, training_data: 0, knowledge_base: 0, code: 0, journal: 0, charts: 0, rag_data: 0, relationships: 0
    },
    recentActivity: []
  };

  it('renders the dashboard with correct sections', () => {
    render(<DashboardView stats={mockStats} />);
    
    // Check for main section headers
    expect(screen.getByText('Knowledge Graph Breakdown')).toBeInTheDocument();
  });
});
