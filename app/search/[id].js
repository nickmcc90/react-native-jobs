import { useState, useCallback } from 'react'
import { Text, View, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl }from 'react-native'
import { Stack, useRouter, useLocalSearchParams }from 'expo-router'


import useFetch from '../../hooks/useFetch'

const Search = () => {

  const params = useLocalSearchParams();
  console.log(params);

  const router = useRouter();

  const { data, isLoading, error, refetch } = useFetch('search', {
    query: params.id,
    num_pages: 1
  })

  return (
    <Text>yes</Text>
  )
}

export default Search