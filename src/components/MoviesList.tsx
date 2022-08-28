import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { Movie } from '../interfaces/movies'
import MoviePoster from './MoviePoster'
import { Colors } from '../interfaces/themes'

interface Props {
  movies: Movie[]
  title: string
}

const MoviesList = ({ movies, title }: Props) => {
  const { colors } = useTheme()
  const styles = React.useMemo(() => createStyles(colors), [colors])
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={movies}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item }: any) => <MoviePoster movie={item} height={200} width={120} />}
        showsHorizontalScrollIndicator={false}
        horizontal
      />
    </View>
  )
}

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      margin: 10
    },
    title: {
      color: colors.text,
      fontSize: 30,
      fontWeight: '700',
      marginHorizontal: 10,
      paddingTop: 20,
      paddingBottom: 10
    }
  })

export default MoviesList
