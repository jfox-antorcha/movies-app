import React from 'react'
import moment from 'moment'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { RootStackParams } from '../navigation'
import { useTheme } from '@react-navigation/native'
import { Colors } from '../interfaces/themes'
import { StatusBar } from 'expo-status-bar'
import { useMovieDetils } from '../hooks/useMovies'
import MovieDetails from '../components/MovieDetails'

interface Props extends NativeStackScreenProps<RootStackParams, 'Details'> {}

interface StylesProps {
  colors: Colors
  top: number
}

const Details = ({ navigation, route }: Props) => {
  const movie = route.params
  const { colors } = useTheme()
  const { top } = useSafeAreaInsets()
  const { isLoading, movieDetails } = useMovieDetils(movie.id)
  const styles = React.useMemo(() => createStyles({ colors, top }), [colors, top])

  return (
    <View>
      <StatusBar translucent />
      <View style={styles.posterContainer}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` }}
          style={styles.poster}
          resizeMode='cover'
        />
      </View>

      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name='arrow-back-circle-outline' size={34} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <View>
            <Text style={styles.title}>{movie.title}</Text>
            <Text style={styles.subtitle}>{moment(movie.release_date).format('YYYY')}</Text>
            <View style={styles.rateRow}>
              <Ionicons name='star' size={16} color={colors.text} />
              <Text style={styles.rateText}>{movie.vote_average}/10</Text>
            </View>
          </View>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>
        {!isLoading && (
          <MovieDetails movieDetails={movieDetails.movieDetails!} cast={movieDetails.cast} />
        )}
      </ScrollView>
    </View>
  )
}

const createStyles = ({ colors, top }: StylesProps) =>
  StyleSheet.create({
    header: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center'
    },
    backBtn: {
      paddingHorizontal: 10,
      justifyContent: 'center',
      alignItems: 'center'
    },
    posterContainer: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').width * 0.5625,
      marginBottom: 10
    },
    poster: {
      flex: 1
    },
    titleContainer: {
      justifyContent: 'flex-start',
      paddingRight: 20
    },
    title: {
      paddingRight: 20,
      color: colors.text,
      fontSize: 22,
      fontWeight: 'bold'
    },
    subtitle: {
      color: colors.text,
      fontSize: 18,
      fontWeight: '500'
    },
    rateRow: { flexDirection: 'row' },
    rateText: {
      paddingLeft: 3,
      color: colors.text,
      fontSize: 16
    },
    body: {
      paddingTop: 10,
      paddingBottom: 30,
      height: '65%'
    },
    bodyText: {
      fontSize: 14,
      color: colors.text,
      paddingVertical: 3
    },
    separator: {
      marginVertical: 5,
      height: 1,
      backgroundColor: colors.border
    },
    bodyItems: {
      paddingHorizontal: 20
    }
  })

export default Details
