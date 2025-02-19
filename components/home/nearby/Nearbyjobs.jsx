import { View, Text, TouchableOpacity, ActivityIndicator  } from 'react-native' 
import { useRouter } from 'expo-router'

import styles from "./nearbyjobs.style";
import { COLORS } from '../../../constants'
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard'

import useFetch from '../../../hooks/useFetch'

const Nearbyjobs = () => {

  const router = useRouter();

  const { data, isLoading, error, refetch } = useFetch('search', {
    query: 'React developer',
    num_pages: 1
  })


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby jobs</Text> 
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size='large' colors={COLORS.primary} />
        ) : error ? (
          <Text>Ran out of API calls</Text>
        ) : data?.map((job) => (
          <NearbyJobCard 
          job={job}
          key={`nearby-job-${job?.job_id}`}
          handleNavigate={() => router.push(`/job-details/${job?.job_id}`)}
        />
        )) }
      </View>
    </View>
  );
};

export default Nearbyjobs;
