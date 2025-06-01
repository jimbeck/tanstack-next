'use client';

import useSWR from 'swr'

export function useRecipes () {
  const { data, error, isLoading, mutate } = useSWR(`/api/recipes`)
  return {
    data,
    mutate,
    isLoading,
    isError: error
  }
}