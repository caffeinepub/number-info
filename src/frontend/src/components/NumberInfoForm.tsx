import { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Loader2 } from 'lucide-react';

interface NumberInfoFormProps {
  onSubmit: (number: string) => void;
  isLoading: boolean;
}

export default function NumberInfoForm({ onSubmit, isLoading }: NumberInfoFormProps) {
  const [number, setNumber] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!number.trim()) {
      setError('Please enter a number');
      return;
    }

    setError('');
    onSubmit(number.trim());
  };

  const handleInputChange = (value: string) => {
    setNumber(value);
    if (error) {
      setError('');
    }
  };

  return (
    <Card className="terminal-card shadow-lg shadow-primary/10">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <span className="text-primary">&gt;_</span> Enter a Number
        </CardTitle>
        <CardDescription className="text-muted-foreground/80">
          Type any number to discover interesting facts and information about it
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="number-input" className="text-sm font-mono">Number</Label>
            <Input
              id="number-input"
              type="text"
              placeholder="e.g., 42, 3.14, 2024"
              value={number}
              onChange={(e) => handleInputChange(e.target.value)}
              className={`font-mono ${error ? 'border-destructive' : 'border-primary/30 focus:border-primary'}`}
              disabled={isLoading}
            />
            {error && (
              <p className="text-sm text-destructive font-mono">{error}</p>
            )}
          </div>
          
          <Button 
            type="submit" 
            className="w-full font-mono" 
            disabled={isLoading}
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Get Info
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
