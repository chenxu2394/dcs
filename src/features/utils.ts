export function getQueryKey(QUERY_KEY: string, id?: string) {
  if (id) {
    return [QUERY_KEY, id]
  }
  return [QUERY_KEY]
}

export function getSearchQueryKey(QUERY_KEY: string, searchTerm: string) {
  return [QUERY_KEY, "search", searchTerm]
}
