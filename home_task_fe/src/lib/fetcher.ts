import { getSession } from 'next-auth/react';
import { BASE_API_URL } from '@/constants/env';

import { auth } from './auth';

export interface FetcherOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: unknown;
  cache?: RequestCache;
  revalidate?: number;
  signal?: AbortSignal;
}

export async function fetcher<T>(
  url: string,
  options: FetcherOptions = {}
): Promise<T> {
  const fullUrl = url.startsWith('http') ? url : `${BASE_API_URL}${url}`;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  let session;
  if (typeof window !== 'undefined') {
    session = await getSession();
  } else {
    session = await auth();
  }

  if (session?.user) {
    headers['Authorization'] = `Bearer ${session.user.access_token}`;
  }

  const fetchOptions: RequestInit = {
    method: options.method || 'GET',
    headers,
    cache: options.cache || 'no-store',
    next: options.revalidate ? { revalidate: options.revalidate } : undefined,
    signal: options.signal,
  };

  if (options.body && options.method !== 'GET') {
    fetchOptions.body = JSON.stringify(options.body);
  }

  try {
    const response = await fetch(fullUrl, fetchOptions);
    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorBody}`
      );
    }

    return response.json();
  } catch (error) {
    console.error('Fetcher Error:', error);
    throw error;
  }
}
