import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sparkle, Brain, Target, Link, MagnifyingGlass, GraduationCap, Lightbulb } from '@phosphor-icons/react';
import { toast } from 'sonner';
import type { Entity, Relationship } from '@/lib/types';
import type { AIGraphInternal } from '@/lib/schema';
import { createDefaultSkillRegistry, type AgentSkill, type SkillCategory, type SkillResult } from '@/lib/agent-skills';

interface SkillsViewProps {
  entities: Entity[];
  relationships: Relationship[];
  aiGraph: AIGraphInternal;
  onEntitySelect?: (entity: Entity) => void;
}

const categoryIcons: Record<SkillCategory, React.ReactNode> = {
  analysis: <Brain size={18} />,
  extraction: <MagnifyingGlass size={18} />,
  validation: <Target size={18} />,
  relationship: <Link size={18} />,
  query: <Sparkle size={18} />,
  learning: <GraduationCap size={18} />,
  recommendation: <Lightbulb size={18} />,
};

const complexityColors: Record<string, string> = {
  basic: 'bg-primary/20 text-primary border-primary/30',
  intermediate: 'bg-accent/20 text-accent border-accent/30',
  advanced: 'bg-warning/20 text-warning border-warning/30',
  expert: 'bg-destructive/20 text-destructive border-destructive/30',
};

export function SkillsView({ entities, relationships, aiGraph, onEntitySelect }: SkillsViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | 'all'>('all');
  const [selectedSkill, setSelectedSkill] = useState<AgentSkill | null>(null);
  const [executionParams, setExecutionParams] = useState<Record<string, unknown>>({});
  const [executionResult, setExecutionResult] = useState<SkillResult | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);

  const skillRegistry = createDefaultSkillRegistry();
  const skills = selectedCategory === 'all'
    ? skillRegistry.listSkills()
    : skillRegistry.listSkills(selectedCategory as SkillCategory);

  const stats = skillRegistry.getExecutionStats();

  const handleExecuteSkill = async () => {
    if (!selectedSkill) return;

    setIsExecuting(true);
    setExecutionResult(null);

    try {
      const result = await skillRegistry.executeSkill(
        selectedSkill.id,
        executionParams,
        { entities, relationships, aiGraph }
      );

      setExecutionResult(result);

      if (result.success) {
        toast.success(`${selectedSkill.name} executed successfully`, {
          description: `Confidence: ${(result.confidence * 100).toFixed(0)}%`,
        });
      } else {
        toast.error(`${selectedSkill.name} failed`, {
          description: result.reasoning,
        });
      }
    } catch (error) {
      toast.error('Execution error', {
        description: error instanceof Error ? error.message : 'Unknown error',
      });
      setExecutionResult({
        success: false,
        reasoning: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      setIsExecuting(false);
    }
  };

  const handleParamChange = (paramName: string, value: unknown) => {
    setExecutionParams(prev => ({
      ...prev,
      [paramName]: value,
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <Sparkle size={28} className="text-primary" />
            Agent Skills
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            AI-powered capabilities for analyzing and querying your ICT knowledge base
          </p>
        </div>

        {stats.totalExecutions > 0 && (
          <Card className="p-4 bg-card/50">
            <div className="text-xs text-muted-foreground mb-1">Performance</div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-semibold">{stats.totalExecutions}</div>
                <div className="text-xs text-muted-foreground">Executions</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-primary">
                  {(stats.successRate * 100).toFixed(0)}%
                </div>
                <div className="text-xs text-muted-foreground">Success</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-accent">
                  {(stats.averageConfidence * 100).toFixed(0)}%
                </div>
                <div className="text-xs text-muted-foreground">Confidence</div>
              </div>
            </div>
          </Card>
        )}
      </div>

      <Tabs value={selectedCategory} onValueChange={(v) => setSelectedCategory(v as SkillCategory | 'all')}>
        <TabsList>
          <TabsTrigger value="all">All Skills</TabsTrigger>
          <TabsTrigger value="query" className="gap-2">
            {categoryIcons.query} Query
          </TabsTrigger>
          <TabsTrigger value="analysis" className="gap-2">
            {categoryIcons.analysis} Analysis
          </TabsTrigger>
          <TabsTrigger value="learning" className="gap-2">
            {categoryIcons.learning} Learning
          </TabsTrigger>
          <TabsTrigger value="recommendation" className="gap-2">
            {categoryIcons.recommendation} Recommend
          </TabsTrigger>
        </TabsList>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-1">
            <ScrollArea className="h-[calc(100vh-320px)]">
              <div className="space-y-2 pr-4">
                {skills.map(skill => (
                  <Card
                    key={skill.id}
                    className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                      selectedSkill?.id === skill.id
                        ? 'bg-primary/5 border-primary'
                        : 'hover:bg-accent/5'
                    }`}
                    onClick={() => {
                      setSelectedSkill(skill);
                      setExecutionParams({});
                      setExecutionResult(null);
                    }}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        {categoryIcons[skill.category]}
                        <h3 className="font-medium text-sm">{skill.name}</h3>
                      </div>
                      <Badge
                        variant="outline"
                        className={`text-xs ${complexityColors[skill.complexity]}`}
                      >
                        {skill.complexity}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {skill.description}
                    </p>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>

          <div className="lg:col-span-2">
            {selectedSkill ? (
              <Card className="p-6">
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold flex items-center gap-2">
                        {categoryIcons[selectedSkill.category]}
                        {selectedSkill.name}
                      </h3>
                      <Badge className={complexityColors[selectedSkill.complexity]}>
                        {selectedSkill.complexity}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {selectedSkill.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Examples</h4>
                    <div className="space-y-1">
                      {selectedSkill.examples.map((example, idx) => (
                        <div
                          key={idx}
                          className="text-xs text-muted-foreground bg-muted/30 px-3 py-2 rounded border border-border/50"
                        >
                          "{example}"
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedSkill.parameters.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium mb-3">Parameters</h4>
                      <div className="space-y-3">
                        {selectedSkill.parameters.map(param => (
                          <div key={param.name}>
                            <Label htmlFor={param.name} className="text-xs">
                              {param.name}
                              {param.required && <span className="text-destructive ml-1">*</span>}
                            </Label>
                            <Input
                              id={param.name}
                              placeholder={param.description}
                              value={executionParams[param.name] || param.defaultValue || ''}
                              onChange={(e) => handleParamChange(param.name, e.target.value)}
                              className="mt-1"
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                              {param.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button
                    onClick={handleExecuteSkill}
                    disabled={isExecuting}
                    className="w-full"
                    size="lg"
                  >
                    {isExecuting ? (
                      <>
                        <Sparkle size={18} className="mr-2 animate-spin" />
                        Executing...
                      </>
                    ) : (
                      <>
                        <Sparkle size={18} className="mr-2" />
                        Execute Skill
                      </>
                    )}
                  </Button>

                  {executionResult && (
                    <div className="space-y-4 pt-4 border-t border-border">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium">Result</h4>
                        <Badge
                          variant={executionResult.success ? 'default' : 'destructive'}
                        >
                          {executionResult.success ? 'Success' : 'Failed'}
                        </Badge>
                      </div>

                      {executionResult.success && (
                        <>
                          <div className="flex items-center gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Confidence:</span>
                              <span className="ml-2 font-medium text-primary">
                                {(executionResult.confidence * 100).toFixed(0)}%
                              </span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Sources:</span>
                              <span className="ml-2 font-medium">
                                {executionResult.sources?.length || 0}
                              </span>
                            </div>
                          </div>

                          <div>
                            <div className="text-xs text-muted-foreground mb-2">Reasoning</div>
                            <div className="text-sm bg-muted/30 p-3 rounded border border-border/50">
                              {executionResult.reasoning}
                            </div>
                          </div>

                          <ScrollArea className="max-h-[300px]">
                            <div className="text-xs text-muted-foreground mb-2">Data</div>
                            <pre className="text-xs bg-muted/30 p-3 rounded border border-border/50 overflow-x-auto">
                              {JSON.stringify(executionResult.data, null, 2)}
                            </pre>
                          </ScrollArea>

                          {executionResult.suggestedFollowUp && executionResult.suggestedFollowUp.length > 0 && (
                            <div>
                              <div className="text-xs text-muted-foreground mb-2">
                                Suggested Follow-up
                              </div>
                              <div className="space-y-2">
                                {executionResult.suggestedFollowUp.map((suggestion: string, idx: number) => (
                                  <Button
                                    key={idx}
                                    variant="outline"
                                    size="sm"
                                    className="w-full justify-start text-xs"
                                    onClick={() => {
                                      toast.info(suggestion);
                                    }}
                                  >
                                    <Sparkle size={14} className="mr-2" />
                                    {suggestion}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          )}

                          {executionResult.sources && executionResult.sources.length > 0 && onEntitySelect && (
                            <div>
                              <div className="text-xs text-muted-foreground mb-2">
                                Referenced Entities ({executionResult.sources.length})
                              </div>
                              <div className="space-y-1">
                                {executionResult.sources.slice(0, 5).map((entity: Entity) => (
                                  <Button
                                    key={entity.id}
                                    variant="ghost"
                                    size="sm"
                                    className="w-full justify-start text-xs"
                                    onClick={() => onEntitySelect(entity)}
                                  >
                                    <Badge variant="outline" className="mr-2 text-xs">
                                      {entity.type}
                                    </Badge>
                                    {entity.name}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          )}
                        </>
                      )}

                      {!executionResult.success && (
                        <div className="text-sm text-destructive bg-destructive/10 p-3 rounded border border-destructive/20">
                          {executionResult.reasoning}
                        </div>
                      )}

                      {executionResult.warnings && executionResult.warnings.length > 0 && (
                        <div className="space-y-1">
                          <div className="text-xs text-muted-foreground">Warnings</div>
                          {executionResult.warnings.map((warning: string, idx: number) => (
                            <div
                              key={idx}
                              className="text-xs text-warning bg-warning/10 p-2 rounded border border-warning/20"
                            >
                              {warning}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </Card>
            ) : (
              <Card className="p-12 text-center">
                <Sparkle size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Select a Skill</h3>
                <p className="text-sm text-muted-foreground">
                  Choose a skill from the list to view details and execute
                </p>
              </Card>
            )}
          </div>
        </div>
      </Tabs>
    </div>
  );
}
