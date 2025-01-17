import type { UseFetchOptions } from '#imports'
import {ref} from "vue";

export function useApiFetch<T> (path: string, options: UseFetchOptions<T> = {}){
  let headers: any = {
    accept: "application/json",
    referer: "http://localhost:3000",
  }

  const token = useCookie('XSRF-TOKEN', {
    secure: true
  });

  if (token.value) {
    headers['X-XSRF-TOKEN'] = token.value as string;
  }

  if (process.server) {
    headers = {
      ...headers,
      ...useRequestHeaders(["cookie"])
    }
  }
  const fetchOptions = {
    credentials: 'include',
    watch: false,
    ...options,
    headers: {
      ...headers,
      ...options?.headers,
    },
  };

  return useFetch("http://localhost:80" + path, fetchOptions);
}