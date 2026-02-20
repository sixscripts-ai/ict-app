import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { BookOpen, Cube, Graph, Warning, Clock, ListChecks } from '@phosphor-icons/react';

// Sub-components
import { ConceptsTab } from '@/components/knowledge-base/ConceptsTab';
import { ModelsTab } from '@/components/knowledge-base/ModelsTab';
import { RelationshipsTab } from '@/components/knowledge-base/RelationshipsTab';
import { AntiPatternsTab } from '@/components/knowledge-base/AntiPatternsTab';
import { RulesTimingTab } from '@/components/knowledge-base/RulesTimingTab';
import { ChecklistConfluenceTab } from '@/components/knowledge-base/ChecklistConfluenceTab';

export function KnowledgeBaseView() {
  const [activeTab, setActiveTab] = useState('concepts');

  const tabs = [
    { id: 'concepts', label: 'Core Concepts', icon: BookOpen },
    { id: 'models', label: 'Models', icon: Cube },
    { id: 'relationships', label: 'Relationships', icon: Graph },
    { id: 'antipatterns', label: 'Anti-Patterns', icon: Warning },
    { id: 'rules', label: 'Rules & Timing', icon: Clock },
    { id: 'checklist', label: 'Checklist & Confluence', icon: ListChecks },
  ];

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">ICT Knowledge Base</h2>
          <p className="text-muted-foreground">
            Reference for Inner Circle Trader concepts, models, and rules
          </p>
        </div>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden border-0 shadow-sm bg-background/50 backdrop-blur-sm">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <div className="px-6 py-4 border-b bg-card/50">
            <ScrollArea orientation="horizontal" className="w-full">
              <TabsList className="w-full justify-start h-auto bg-transparent p-0 space-x-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <TabsTrigger
                      key={tab.id}
                      value={tab.id}
                      className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none border border-transparent data-[state=active]:border-primary/20 rounded-md px-4 py-2 h-auto space-x-2"
                    >
                      <Icon className="h-4 w-4" />
                      <span>{tab.label}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </ScrollArea>
          </div>

          <CardContent className="flex-1 p-0 overflow-hidden relative">
            <div className="absolute inset-0 overflow-auto">
              <TabsContent value="concepts" className="h-full m-0 p-6">
                <ConceptsTab />
              </TabsContent>
              <TabsContent value="models" className="h-full m-0 p-6">
                <ModelsTab />
              </TabsContent>
              <TabsContent value="relationships" className="h-full m-0 p-6">
                <RelationshipsTab />
              </TabsContent>
              <TabsContent value="antipatterns" className="h-full m-0 p-6">
                <AntiPatternsTab />
              </TabsContent>
              <TabsContent value="rules" className="h-full m-0 p-6">
                <RulesTimingTab />
              </TabsContent>
              <TabsContent value="checklist" className="h-full m-0 p-6">
                <ChecklistConfluenceTab />
              </TabsContent>
            </div>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
}
