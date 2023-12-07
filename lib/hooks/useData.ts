import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export type Metadata = {
  TotalCount: number;
  PageSize: number;
  CurrentPage: number;
  TotalPages: number;
  HasNext: boolean;
  HasPrevious: boolean;
};

export type UseDataResult<TData> = UseQueryResult<TData> & {
  metadata: Metadata;
};

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
    ...options,
  })
    .then(async (res) => {
      return {
        data: await res?.json(),
        metadata: JSON.parse(res.headers.get('x-metadata') ?? '{}'),
      };
    })
    .catch((error) => {
      throw error;
    });

/**
 * Custom hook for fetching data with Tanstack's useQuery:
 * @param keys the array of keys to be passed to useQuery's queryKey
 * @param url the URL of the API endpoint.
 * @param options additional or overrides to fetch options, such as HTTP method or Headers.
 * @returns the result object from useQuery.
 */
export default function useData<TData>(
  keys: any[],
  url: string,
  params?: any,
  enabled: boolean = true,
  options?: any
): UseDataResult<TData> {
  const router = useRouter();
  const [pageSize, setPageSize] = useState<number | undefined>();
  const [page, setPage] = useState<number | undefined>();
  const [fetchUrl, setUrl] = useState<string>(url);

  useEffect(() => {
    if (router.query.page && router.query.per_page) {
      const params = new URLSearchParams(url.split('?')[1] || '');
      params.set('pageNumber', String(router.query.page));
      params.set('pageSize', String(router.query.per_page));
      
      const baseUrl = url.split('?')[0];

      setUrl(`${baseUrl}?${params.toString()}`);
    }
  }, [router.query.page, router.query.per_page]);

  const result = useQuery({
    queryKey: [fetchUrl],
    queryFn: () =>
      fetcher(
        fetchUrl,
        options
      ),
    enabled: enabled,
  });

  useEffect(() => {
    return;
  }, [keys, url, result]);

  // temporary
  //@ts-ignore
  return {
    ...result,
    data: result.data?.data,
    metadata: result.data?.metadata as Metadata,
  };
}
