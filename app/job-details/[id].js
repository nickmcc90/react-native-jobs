import { act, useCallback, useState } from 'react'
import { Text, View, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router'

import { Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn, Specifics } from '../../components'
import { COLORS, SIZES, icons } from '../../constants'
import useFetch from '../../hooks/useFetch'


const tabs = ["About", "Qualifications", "Responsibilities"];

const JobDetails = () => {

  const params = useLocalSearchParams()
  console.log(params);
  const router = useRouter()

  const { data, isLoading, error, refetch } = useFetch('job-details', { 
    job_id: params.id
  })

  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0])

  const displayTabContent = () => {
    switch (activeTab) {
      case (tabs[0]):
        return (
          <JobAbout 
            info={data[0].job_description ?? "No data provided"}
          />
        )
      case (tabs[1]):
        return (
          <Specifics 
            title={tabs[1]}
            points={data[0].job_highlights?.Qualifications ?? ["N/A"]}
          />
        )
      case (tabs[2]):
        return (
          <Specifics 
            title={tabs[2]}
            points={data[0].job_highlights?.Responsibilities ?? ["N/A"]}
          />
        )
    }
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    refetch();
    setRefreshing(false)
  })

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite}}>
      <Stack.Screen 
       options={{
        headerStyle: { backgroundColor: COLORS.lightWhite},
        headerShadowVisible: false,
        headerBackVisible: false,
        headerLeft: () => (
          <ScreenHeaderBtn 
            iconUrl={icons.left} dimension="60%" handlePress={() => router.back()}
          />
        ),
        headerRight: () => (
          <ScreenHeaderBtn iconUrl={icons.share} dimension="60%"/>
        ),
        headerTitle: ""
       }}
      />

      <>
       <ScrollView showsVerticalScrollIndicator={false} refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
       }>
        {isLoading ? (
        <ActivityIndicator size="large" colors={COLORS.primary}/>
        ) : error ? (
        <Text>Something went wrong...</Text>
        ) : data.length === 0 ? (
        <Text>No data.</Text>
        ) : (
          <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
            <Company 
              companyLogo={data[0].employer_logo}
              jobTitle={data[0].job_title}
              companyName={data[0].employer_name}
              Location={data[0].job_country}
            />

            <JobTabs 
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />

            {displayTabContent()}
          </View>
        )}
       </ScrollView>

       <JobFooter url={data[0]?.job_google_link ?? "https://careers.google.com/jobs/results"}/>
      </>
    </SafeAreaView>
  )
} 

export default JobDetails