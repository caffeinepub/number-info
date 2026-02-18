import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { RefreshCw, AlertCircle, Info } from 'lucide-react';

interface NumberInfoResultProps {
  data: any;
  isLoading: boolean;
  error: Error | null;
  onRefresh: () => void;
  hasSubmitted: boolean;
}

export default function NumberInfoResult({
  data,
  isLoading,
  error,
  onRefresh,
  hasSubmitted,
}: NumberInfoResultProps) {
  if (!hasSubmitted) {
    return (
      <Card className="border-dashed border-primary/30">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Info className="h-12 w-12 text-primary/50 mb-4" />
          <p className="text-muted-foreground text-center font-mono text-sm">
            Enter a number above to see its information
          </p>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="terminal-card">
        <CardHeader>
          <Skeleton className="h-7 w-48 bg-muted" />
          <Skeleton className="h-4 w-64 mt-2 bg-muted" />
        </CardHeader>
        <CardContent className="space-y-3">
          <Skeleton className="h-4 w-full bg-muted" />
          <Skeleton className="h-4 w-full bg-muted" />
          <Skeleton className="h-4 w-3/4 bg-muted" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="border-destructive/50">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle className="font-mono">Error</AlertTitle>
        <AlertDescription className="mt-2 space-y-3">
          <p className="font-mono text-sm">Failed to fetch number information. Please try again.</p>
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            className="mt-2 font-mono"
          >
            <RefreshCw className="mr-2 h-3 w-3" />
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <Card className="terminal-card shadow-lg shadow-primary/10">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-2xl flex items-center gap-2 font-mono">
              <span className="text-primary">&gt;</span> Number Information
            </CardTitle>
            <CardDescription className="font-mono text-xs">Details about your number</CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            className="ml-4 border-primary/30 hover:border-primary"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="terminal-output rounded-lg bg-black/40 p-4 border border-primary/20">
          <pre className="text-sm font-mono overflow-x-auto whitespace-pre-wrap break-words text-primary/90">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      </CardContent>
    </Card>
  );
}
