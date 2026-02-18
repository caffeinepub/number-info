import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import NumberInfoForm from './components/NumberInfoForm';
import NumberInfoResult from './components/NumberInfoResult';
import NumberSearchHistory from './components/NumberSearchHistory';
import ThemeToggle from './components/ThemeToggle';
import { useNumberInfo } from './hooks/useQueries';
import { useSearchHistory } from './hooks/useSearchHistory';
import { useTheme } from './hooks/useTheme';
import { SiCaffeine } from 'react-icons/si';
import { Terminal } from 'lucide-react';

const queryClient = new QueryClient();

function AppContent() {
  const [submittedNumber, setSubmittedNumber] = useState<string | null>(null);
  const { data, isLoading, error, refetch } = useNumberInfo(submittedNumber);
  const { history, addToHistory, clearHistory } = useSearchHistory();
  const { theme } = useTheme();

  const handleSubmit = (number: string) => {
    setSubmittedNumber(number);
    addToHistory(number);
  };

  const handleHistorySelect = (number: string) => {
    setSubmittedNumber(number);
    addToHistory(number);
  };

  const handleRefresh = () => {
    if (submittedNumber) {
      refetch();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b border-primary/20 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight flex items-center gap-3">
                <Terminal className="h-8 w-8 text-primary" />
                <span className="font-mono">Number Info</span>
              </h1>
              <p className="text-muted-foreground mt-2 text-sm md:text-base font-mono">
                <span className="text-primary">&gt;</span> Discover fascinating facts about any number
              </p>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-3xl mx-auto space-y-6">
          <NumberInfoForm onSubmit={handleSubmit} isLoading={isLoading} />
          
          <NumberSearchHistory
            history={history}
            onSelectNumber={handleHistorySelect}
            onClearHistory={clearHistory}
          />
          
          <NumberInfoResult
            data={data}
            isLoading={isLoading}
            error={error}
            onRefresh={handleRefresh}
            hasSubmitted={submittedNumber !== null}
          />
        </div>
      </main>

      <footer className="border-t border-primary/20 bg-card/50 backdrop-blur-sm mt-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground font-mono">
              © {new Date().getFullYear()} Number Info. All rights reserved.
            </p>
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== 'undefined' ? window.location.hostname : 'number-info'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 font-mono"
            >
              Built with <SiCaffeine className="text-primary" /> using caffeine.ai
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}
