import { useState } from 'react'
import { Text, View, ScrollView, SafeAreaView } from 'react-native'
import { Stack, useRouter } from 'expo-router'

import { COLORS, icons, images, SIZES } from '../constants';
import ScreenHeaderBtn from '../components/common/header/ScreenHeaderBtn';
import Welcome from '../components/home/welcome/Welcome';
import Popularjobs from '../components/home/popular/Popularjobs';
import Nearbyjobs from '../components/home/nearby/Nearbyjobs';


const Home = () => {

  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState()

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite}}>
      <Stack.Screen options={{
        headerStyle: { backgroundColor: COLORS.lightWhite},
        headerShadowVisible: false,
        headerLeft: () => (
          <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
        ),
        headerRight: () => (
          <ScreenHeaderBtn iconUrl={images.profile} dimension="100%"/>
        ),
        headerTitle: ""
      }}/>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{ flex: 1, padding: SIZES.medium}}
        >
          <Welcome 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleClick={() => {
              if(searchTerm) {
                router.push(`/search/${searchTerm}`)
              }
            }}
          />
          <Popularjobs />
          <Nearbyjobs />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home;

// timestamp: 37:06. Working on the welcome tag.


// timestamp: 1:01:30. Working on useFetch Hook.

// timestamp: 1:25:50. Working on the job-details page.


// timestamp: 2:06:06. About to try my hand at making the search page per my
// notes on the job-details page, and then check it with the search page that can 
// be found in his github repository.