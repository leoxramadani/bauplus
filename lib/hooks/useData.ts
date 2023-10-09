import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

/**
 * Fetcher function for react-query. Nothing complicated, just a wrapper for the native fetch() API.
 * @param url the URL to be fetched from.
 * @param options additional options or overrides to fetcher function, may include HTTP method or headers.
 * @returns 
 */
export const fetcher = (url: string, options: any) =>
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    ...options
  })
    .then((res) => res.json())
    .then((data) => data.result);

/**
 * Custom hook for fetching data with Tanstack's useQuery:
 * @param keys the array of keys to be passed to useQuery's queryKey
 * @param url the URL of the API endpoint.
 * @param options additional or overrides to fetch options, such as HTTP method or Headers.
 * @returns the result object from useQuery.
 */
export default function useData(
  keys: any[],
  url: string,
  options?: any
): UseQueryResult {
  const result = useQuery({
    queryKey: keys,
    queryFn: () => fetcher(url, options),
  });

  useEffect(() => {
    return;
  }, [keys, url, result.data]);

  return result;
}