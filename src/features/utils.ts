export function getQueryKey(QUERY_KEY: string, id?: string) {
  if (id) {
    return [QUERY_KEY, id]
  }
  return [QUERY_KEY]
}

export function getSearchQueryKey(
  QUERY_KEY: string,
  searchTerm: string,
  category?: string,
  minPrice?: number,
  maxPrice?: number
) {
  return [
    QUERY_KEY,
    "search",
    searchTerm +
      (category ? `-${category}` : "") +
      (minPrice ? `-${minPrice}` : "") +
      (maxPrice ? `-${maxPrice}` : "")
  ]
}
