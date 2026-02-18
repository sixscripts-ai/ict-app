import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { PaperPlaneRight, User, Brain } from '@phosphor-icons/react';
import type { ChatMessage, Entity } from '@/lib/types';

interface ChatViewProps {
  entities: Entity[];
  onAskQuestion: (question: string) => Promise<{ answer: string; sources: Entity[] }>;
}

export function ChatView({ entities, onAskQuestion }: ChatViewProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: input,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const { answer, sources } = await onAskQuestion(input);
      
      const assistantMessage: ChatMessage = {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        content: answer,
        sources,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        content: 'Sorry, I encountered an error processing your question.',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const exampleQuestions = [
    "Define Fair Value Gap with bearish/bullish displacement examples.",
    "Filter trades: OB + FVG confluence resulting in >2R returns.",
    "List the entry criteria and time windows for the Silver Bullet setup.",
    "Show me high-probability A+ Setups from my training data.",
    "Which trades failed due to liquidity sweep invalidation?",
    "Compare win rates: London vs NY killzone executions.",
    "Show all Model 12 setups with OTE retracement confluence.",
    "What displacement characteristics preceded my best FVG entries?"
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-120px)]">
      <div className="mb-4">
        <h1 className="text-3xl font-semibold tracking-tight">AI Chat</h1>
        <p className="text-muted-foreground mt-1">Ask questions about your ICT knowledge base</p>
      </div>

      {messages.length === 0 && (
        <Card className="p-8 bg-card/50 backdrop-blur border-border/50 mb-4">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg bg-accent/10">
              <Brain size={32} className="text-accent" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">ICT Knowledge Analysis</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Query concepts, filter trade setups, analyze patterns, and explore model relationships
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-6">
              {exampleQuestions.map((question) => (
                <button
                  key={question}
                  onClick={() => setInput(question)}
                  className="p-3 text-left text-sm rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors border border-border/50"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        </Card>
      )}

      <ScrollArea className="flex-1 mb-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {message.role === 'assistant' && (
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Brain size={20} className="text-accent" />
                </div>
              )}
              <Card className={`max-w-[80%] p-4 ${
                message.role === 'user' 
                  ? 'bg-primary/10 border-primary/20' 
                  : 'bg-card/50 backdrop-blur border-border/50'
              }`}>
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                {message.sources && message.sources.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-border/50">
                    <p className="text-xs text-muted-foreground mb-2">Sources:</p>
                    <div className="flex flex-wrap gap-2">
                      {message.sources.map((source) => (
                        <Badge key={source.id} variant="secondary" className="text-xs">
                          {source.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                <span className="text-xs text-muted-foreground mt-2 block">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </span>
              </Card>
              {message.role === 'user' && (
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <User size={20} className="text-primary" />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                <Brain size={20} className="text-accent" />
              </div>
              <Card className="p-4 bg-card/50 backdrop-blur border-border/50">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </Card>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="flex gap-2">
        <Input
          placeholder="Ask a question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSubmit()}
          disabled={isLoading}
          className="flex-1"
        />
        <Button onClick={handleSubmit} disabled={!input.trim() || isLoading}>
          <PaperPlaneRight size={16} />
        </Button>
      </div>

      <p className="text-xs text-muted-foreground mt-2 text-center">
        Total entities in knowledge base: {entities.length}
      </p>
    </div>
  );
}
