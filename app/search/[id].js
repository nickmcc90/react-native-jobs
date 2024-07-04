import { useState, useCallback, useEffect } from 'react'
import { Text, View, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl, FlatList, TouchableOpacity, Image }from 'react-native'
import { Stack, useRouter, useLocalSearchParams } from 'expo-router'

import { COLORS, icons, FONT } from '../../constants'
import axios from 'axios'

import styles from './search.style'


import ScreenHeaderBtn from '../../components/common/header/ScreenHeaderBtn'
import NearbyJobCard from '../../components/common/cards/nearby/NearbyJobCard'

const Search = () => {

  const params = useLocalSearchParams();
  console.log(params);

  const router = useRouter();

  const [page, setPage] = useState(1);
  const [searchData, setSearchData] = useState([])
  const [searchLoading, setSearchLoading] = useState(false)
  const [searchError, setSearchError] = useState(null)

  const handleSearch = async () => {
    setSearchLoading(true)
    setSearchData([])

    try {
      const options = {
        method: 'GET',
        url: 'https://jsearch.p.rapidapi.com/search',
        params: {
          query: params.id,
          page: page.toString()
        },
        headers: {
          'x-rapidapi-key': 'cbfbecf049msh03b65b571cfced7p122765jsnc725569fb211',
          'x-rapidapi-host': 'jsearch.p.rapidapi.com'
        }
      };

      const response = await axios.request(options)
      setSearchData(response.data.data)
    } catch (error) {
      setSearchError(error)
    } finally {
      setSearchLoading(false)
    }
  }


  const handlePage = (direction) => {
    if(direction === 'left' && page > 1) {
      setPage(page - 1)
      handleSearch()
    }
    if(direction === 'right') {
      setPage(page + 1)
      handleSearch()
    }
  }

  useEffect(() => {
    handleSearch();
  }, [])



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite}}>
      <Stack.Screen 
        options={{
          headerStyle: {backgroundColor: COLORS.lightWhite},
          headerShadowVisible: false,
          headerTitle: "",
          headerLeft: () => (
            <ScreenHeaderBtn iconUrl={icons.left} dimension="60%" handlePress={() => router.back()}/>
          )
        }}
      />

      <ScrollView style={{ flex: 1 }}>
        {searchLoading ? (
          <ActivityIndicator size="large" color={COLORS.gray}/>
        ) : searchError ? (
          <Text>Something went wrong...</Text>
        ) : searchData.length === 0 ? (
          <Text>No data</Text>
        ) : (
          <View>
            <FlatList 
              data={searchData}
              renderItem={({ item }) => (
                <NearbyJobCard 
                  job={item}
                  handleNavigate={() => router.push(`/job-details/${item.job_id}`)}
                />
              )}
              keyExtractor={item => item}
              ListHeaderComponent={() => (
                <View>
                  <Text style={{ fontfamily: FONT.medium, fontSize: 24 }}>{params.id}</Text>
                  <Text>Job Opportunities</Text>
                </View>
              )}
              ListFooterComponent={() => (
                <View style={styles.everythingContainer}>
                  <TouchableOpacity 
                    onPress={() => {handlePage('left')}}
                    style={styles.button}
                  >
                    <Image 
                      source={icons.chevronLeft}
                      resizeMode="contain"
                      style={styles.buttonImage("50%")}
                    />
                  </TouchableOpacity>
                  <Text>{page}</Text>
                  <TouchableOpacity 
                    onPress={() => {handlePage('right')}}
                    style={styles.button}
                  >
                    <Image 
                        source={icons.chevronRight}
                        resizeMode="contain"
                        style={styles.buttonImage("50%")}
                      />
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

export default Search