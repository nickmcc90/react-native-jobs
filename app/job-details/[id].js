import { useCallback, useState } from 'react'
import { Text, View, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { Stack, useRouter, useSearchParams } from 'expo-router'

import { Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn, Specifics } from '../../components'
import { COLORS, SIZES, icons } from '../../constants'
import useFetch from '../../hooks/useFetch'


const JobDetails = () => {
  return (
    <Text>JobDetails</Text>
  )
}

export default JobDetails