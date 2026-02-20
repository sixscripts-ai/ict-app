import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ChatView } from './ChatView';
import '@testing-library/jest-dom';

vi.mock('@/hooks/use-kv', () => ({
  useKV: (key: string, _defaultVal: any) => {
    // Return array [value, setValue, removeValue]
    if (key === 'chat-sessions') return [[], vi.fn(), vi.fn()];
    if (key === 'chat-active-session') return [null, vi.fn(), vi.fn()];
    return [null, vi.fn(), vi.fn()];
  },
}));

// Mock scrollIntoView which is not implemented in JSDOM
window.HTMLElement.prototype.scrollIntoView = vi.fn();

describe('ChatView', () => {
  it('renders input area', () => {
    const mockAsk = vi.fn().mockResolvedValue({ answer: 'Test Answer', sources: [] });
    render(<ChatView entities={[]} onAskQuestion={mockAsk} />);
    
    const input = screen.getByPlaceholderText(/Ask about ICT concepts/i);
    expect(input).toBeInTheDocument();
  });
});
