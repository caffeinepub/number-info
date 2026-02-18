import { useState, useEffect } from 'react';

const HISTORY_STORAGE_KEY = 'number-info-history';
const MAX_HISTORY_ITEMS = 15;

export function useSearchHistory() {
  const [history, setHistory] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(HISTORY_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
      } catch {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
  }, [history]);

  const addToHistory = (number: string) => {
    setHistory(prev => {
      // Remove if already exists
      const filtered = prev.filter(item => item !== number);
      // Add to front and cap at MAX_HISTORY_ITEMS
      return [number, ...filtered].slice(0, MAX_HISTORY_ITEMS);
    });
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return { history, addToHistory, clearHistory };
}
