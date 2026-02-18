import { useQuery } from '@tanstack/react-query';
import { fetchNumberInfo } from '@/lib/numberInfoApi';

export function useNumberInfo(number: string | null) {
  return useQuery({
    queryKey: ['numberInfo', number],
    queryFn: () => fetchNumberInfo(number!),
    enabled: number !== null && number.trim() !== '',
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
}
