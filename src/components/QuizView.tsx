import { useState, useMemo, useCallback } from 'react';
import { useKV } from '@/hooks/use-kv';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Cards, Brain, CheckCircle, Clock, Lightning, ArrowCounterClockwise, Trophy } from '@phosphor-icons/react';
import type { Entity, QuizCard } from '@/lib/types';

interface QuizViewProps {
  entities: Entity[];
}

function sm2(card: QuizCard, quality: number): Partial<QuizCard> {
  let { ease, interval, repetitions } = card;
  if (quality >= 3) {
    if (repetitions === 0) interval = 1;
    else if (repetitions === 1) interval = 6;
    else interval = Math.round(interval * ease);
    repetitions += 1;
  } else {
    repetitions = 0;
    interval = 1;
  }
  ease = ease + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (ease < 1.3) ease = 1.3;
  const nextReview = new Date(Date.now() + interval * 86400000).toISOString();
  return { ease, interval, repetitions, nextReview, lastReview: new Date().toISOString() };
}

function generateCardForEntity(entity: Entity): QuizCard | null {
  if (entity.type !== 'concept' && entity.type !== 'model') return null;
  const front =
    entity.type === 'concept'
      ? `What is ${entity.name}?`
      : `Describe the ${entity.name} model`;
  const back = entity.description && entity.description.length > 5
    ? entity.description
    : 'No description available';
  return {
    id: `quiz-${entity.id}`,
    entityId: entity.id,
    front,
    back,
    ease: 2.5,
    interval: 0,
    repetitions: 0,
    nextReview: new Date().toISOString(),
  };
}

const RATING_BUTTONS: { label: string; quality: number; color: string }[] = [
  { label: 'Again', quality: 1, color: 'bg-red-500/80 hover:bg-red-500 text-white' },
  { label: 'Hard', quality: 2, color: 'bg-orange-500/80 hover:bg-orange-500 text-white' },
  { label: 'Good', quality: 4, color: 'bg-[oklch(0.45_0.15_145)] hover:bg-[oklch(0.5_0.18_145)] text-white' },
  { label: 'Easy', quality: 5, color: 'bg-blue-500/80 hover:bg-blue-500 text-white' },
];

export function QuizView({ entities }: QuizViewProps) {
  const [cards, setCards] = useKV<QuizCard[]>('quiz-cards', []);
  const [inSession, setInSession] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const safeCards = useMemo(() => cards || [], [cards]);

  const dueCards = useMemo(() => {
    const now = new Date().toISOString();
    return safeCards.filter(c => c.nextReview <= now);
  }, [safeCards]);

  const mastered = useMemo(() => safeCards.filter(c => c.repetitions >= 5).length, [safeCards]);
  const newCards = useMemo(() => safeCards.filter(c => c.repetitions === 0).length, [safeCards]);

  const handleGenerate = useCallback(() => {
    const existingEntityIds = new Set((cards || []).map(c => c.entityId));
    const newQuizCards: QuizCard[] = [];
    entities.forEach(entity => {
      if (existingEntityIds.has(entity.id)) return;
      const card = generateCardForEntity(entity);
      if (card) newQuizCards.push(card);
    });
    if (newQuizCards.length === 0) return;
    setCards(prev => [...(prev || []), ...newQuizCards]);
  }, [entities, cards, setCards]);

  const handleReset = useCallback(() => {
    setCards([]);
    setInSession(false);
    setCurrentIndex(0);
    setShowAnswer(false);
  }, [setCards]);

  const startSession = useCallback(() => {
    setInSession(true);
    setCurrentIndex(0);
    setShowAnswer(false);
  }, []);

  const handleRate = useCallback(
    (quality: number) => {
      const card = dueCards[currentIndex];
      if (!card) return;
      const updates = sm2(card, quality);
      setCards(prev =>
        (prev || []).map(c => (c.id === card.id ? { ...c, ...updates } : c))
      );
      setShowAnswer(false);
      if (currentIndex + 1 >= dueCards.length) {
        setInSession(false);
        setCurrentIndex(0);
      } else {
        setCurrentIndex(prev => prev + 1);
      }
    },
    [dueCards, currentIndex, setCards]
  );

  const upcomingCards = useMemo(() => {
    return [...safeCards]
      .sort((a, b) => a.nextReview.localeCompare(b.nextReview))
      .slice(0, 10);
  }, [safeCards]);

  // Active quiz session
  if (inSession) {
    const card = dueCards[currentIndex];
    if (!card) {
      return (
        <div className="flex flex-col items-center justify-center py-24 space-y-4">
          <Trophy size={64} className="text-[oklch(0.75_0.2_145)]" />
          <h2 className="text-2xl font-semibold">All caught up!</h2>
          <p className="text-muted-foreground">No more cards due for review right now.</p>
          <Button onClick={() => setInSession(false)} variant="outline">
            Back to Dashboard
          </Button>
        </div>
      );
    }

    return (
      <div className="max-w-2xl mx-auto space-y-6 py-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => { setInSession(false); setShowAnswer(false); }}>
            <ArrowCounterClockwise size={16} className="mr-2" />
            Exit
          </Button>
          <Badge variant="secondary" className="text-sm">
            Card {currentIndex + 1} of {dueCards.length}
          </Badge>
        </div>

        <Card className="bg-card/50 backdrop-blur border-border/50 overflow-hidden">
          <CardContent className="pt-10 pb-10 px-8">
            <div className="text-center space-y-2 mb-2">
              <Badge variant="outline" className="text-xs">QUESTION</Badge>
            </div>
            <p className="text-xl md:text-2xl font-medium text-center leading-relaxed">
              {card.front}
            </p>
          </CardContent>

          {showAnswer && (
            <div className="border-t border-border/50 bg-secondary/20">
              <CardContent className="pt-8 pb-8 px-8">
                <div className="text-center space-y-2 mb-4">
                  <Badge variant="outline" className="text-xs">ANSWER</Badge>
                </div>
                <p className="text-base text-center leading-relaxed text-muted-foreground">
                  {card.back}
                </p>
              </CardContent>
            </div>
          )}
        </Card>

        {!showAnswer ? (
          <div className="flex justify-center">
            <Button size="lg" onClick={() => setShowAnswer(true)} className="px-8">
              Show Answer
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground text-center">How well did you know this?</p>
            <div className="flex gap-3 justify-center">
              {RATING_BUTTONS.map(btn => (
                <Button
                  key={btn.label}
                  className={`px-6 ${btn.color}`}
                  onClick={() => handleRate(btn.quality)}
                >
                  {btn.label}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Dashboard view
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Spaced Repetition Quiz</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Review ICT concepts using flash cards with intelligent scheduling
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <Cards size={16} />
              Total Cards
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{safeCards.length}</div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <Clock size={16} />
              Due Today
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${dueCards.length > 0 ? 'text-yellow-400' : 'text-[oklch(0.75_0.2_145)]'}`}>
              {dueCards.length}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <Trophy size={16} />
              Mastered
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[oklch(0.75_0.2_145)]">{mastered}</div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <Lightning size={16} />
              New
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{newCards}</div>
          </CardContent>
        </Card>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 flex-wrap">
        <Button
          size="lg"
          onClick={startSession}
          disabled={dueCards.length === 0}
          className="gap-2"
        >
          <Brain size={20} />
          Start Review ({dueCards.length} due)
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={handleGenerate}
          className="gap-2"
        >
          <Cards size={20} />
          Generate Cards
        </Button>
        {safeCards.length > 0 && (
          <Button
            variant="ghost"
            size="lg"
            onClick={handleReset}
            className="gap-2 text-muted-foreground"
          >
            <ArrowCounterClockwise size={20} />
            Reset All
          </Button>
        )}
      </div>

      {/* Upcoming cards */}
      {safeCards.length > 0 && (
        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Upcoming Reviews</CardTitle>
            <CardDescription>Next 10 cards sorted by review date</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[320px]">
              <div className="space-y-2">
                {upcomingCards.map(card => {
                  const isDue = card.nextReview <= new Date().toISOString();
                  const entity = entities.find(e => e.id === card.entityId);
                  const reviewDate = new Date(card.nextReview);
                  const isToday = reviewDate.toDateString() === new Date().toDateString();

                  return (
                    <div
                      key={card.id}
                      className="flex items-center gap-3 p-3 rounded-lg bg-secondary/20 hover:bg-secondary/40 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{card.front}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {entity?.name || 'Unknown entity'}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {card.repetitions >= 5 ? (
                          <Badge className="bg-[oklch(0.75_0.2_145)]/20 text-[oklch(0.75_0.2_145)] border-0">
                            <CheckCircle size={12} className="mr-1" />
                            Mastered
                          </Badge>
                        ) : card.repetitions === 0 ? (
                          <Badge variant="secondary" className="text-xs">New</Badge>
                        ) : (
                          <Badge variant="outline" className="text-xs">
                            {card.repetitions} reps
                          </Badge>
                        )}
                        <Badge
                          variant="outline"
                          className={`text-xs ${isDue ? 'bg-yellow-500/20 text-yellow-400 border-0' : isToday ? 'bg-blue-500/20 text-blue-400 border-0' : ''}`}
                        >
                          {isDue
                            ? 'Due now'
                            : isToday
                              ? 'Today'
                              : reviewDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}

      {safeCards.length === 0 && (
        <Card className="p-12 text-center bg-card/50">
          <Cards size={48} className="mx-auto mb-4 text-muted-foreground" />
          <p className="text-lg font-medium">No quiz cards yet</p>
          <p className="text-muted-foreground mt-1">
            Click "Generate Cards" to create flash cards from your concepts and models.
          </p>
        </Card>
      )}
    </div>
  );
}
