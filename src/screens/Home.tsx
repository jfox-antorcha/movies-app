import React from 'react'
import { View, StyleSheet, Dimensions, ScrollView, Text } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Carousel } from 'react-native-snap-carousel-v4'
import { useTheme } from '@react-navigation/native'
import { useMovies } from '../hooks/useMovies'
import { Colors } from '../interfaces/themes'
import MoviePoster from '../components/MoviePoster'
import MoviesList from '../components/MoviesList'

const { width } = Dimensions.get('window')

interface StylesProps {
  colors: Colors
  top: number
}

const Home = () => {
  const { colors } = useTheme()
  const { top } = useSafeAreaInsets()
  const { movies, isLoading } = useMovies()
  const styles = React.useMemo(() => createStyles({ colors, top }), [colors, top])

  if (isLoading) return <></>

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.nowPlayingContainer}>
        <Text style={styles.text}>Now Playing</Text>
        <Carousel
          data={movies.nowPlaying}
          renderItem={({ item }: any) => <MoviePoster movie={item} height={300} width={200} />}
          sliderWidth={width}
          itemWidth={210}
          vertical={false}
        />
      </View>
      <MoviesList movies={movies.popular} title='Popular' />
      <MoviesList movies={movies.topRated} title='Top Rated' />
      <MoviesList movies={movies.upcoming} title='Upcoming' />
    </ScrollView>
  )
}

const createStyles = ({ colors, top }: StylesProps) =>
  StyleSheet.create({
    container: { paddingBottom: 30 },
    nowPlayingContainer: {
      paddingTop: top,
      paddingBottom: 10
    },
    text: {
      color: colors.text,
      fontSize: 30,
      fontWeight: '700',
      alignSelf: 'center',
      paddingBottom: 10
    }
  })

export default Home
