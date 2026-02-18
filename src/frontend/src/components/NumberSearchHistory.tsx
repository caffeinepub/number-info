import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { History, Trash2 } from 'lucide-react';

interface NumberSearchHistoryProps {
  history: string[];
  onSelectNumber: (number: string) => void;
  onClearHistory: () => void;
}

export default function NumberSearchHistory({
  history,
  onSelectNumber,
  onClearHistory,
}: NumberSearchHistoryProps) {
  if (history.length === 0) {
    return null;
  }

  return (
    <Card className="terminal-card">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <History className="h-5 w-5 text-primary" />
            <div>
              <CardTitle className="text-lg">Search History</CardTitle>
              <CardDescription className="text-xs">Recent queries</CardDescription>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearHistory}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px] w-full">
          <div className="space-y-1">
            {history.map((number, index) => (
              <button
                key={`${number}-${index}`}
                onClick={() => onSelectNumber(number)}
                className="w-full text-left px-3 py-2 rounded-md text-sm font-mono bg-muted/50 hover:bg-accent hover:text-accent-foreground transition-colors border border-border/50 hover:border-primary/50"
              >
                <span className="text-primary">&gt;</span> {number}
              </button>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
