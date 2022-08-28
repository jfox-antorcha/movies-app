import { useTheme } from '@react-navigation/native'
import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { Cast, MovieDetails } from '../interfaces/movies'
import { Colors } from '../interfaces/themes'
import CastItem from './CastItem'

interface Props {
  movieDetails: MovieDetails
  cast: Cast[]
}

const MovieDetailsComponet = ({ cast, movieDetails }: Props) => {
  const { colors } = useTheme()
  const styles = React.useMemo(() => createStyles(colors), [colors])

  return (
    <>
      <View style={styles.bodyItems}>
        <Text style={styles.tagText}>{movieDetails.tagline}</Text>
      </View>
      <View style={styles.separator} />
      <View style={styles.bodyItems}>
        <Text style={styles.castText}>OverView</Text>
        <Text style={styles.bodyText}>{movieDetails.overview}</Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.subtitle}>Duration: {movieDetails.runtime} min</Text>
        <Text style={styles.subtitle}>
          Genres: {movieDetails.genres.map((g) => g.name).join(', ')}
        </Text>
      </View>
      <View style={styles.separator} />
      <View style={styles.bodyItems}>
        <Text style={styles.castText}>Cast</Text>
      </View>
      <FlatList
        data={cast}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item }) => <CastItem cast={item} />}
        showsHorizontalScrollIndicator={false}
        horizontal
      />
    </>
  )
}

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    subtitle: {
      color: colors.text,
      fontSize: 18,
      fontWeight: '500'
    },
    tagText: {
      color: colors.text,
      fontSize: 16,
      fontStyle: 'italic'
    },
    bodyText: {
      fontSize: 14,
      color: colors.text,
      paddingVertical: 3
    },
    separator: {
      marginVertical: 5
    },
    bodyItems: {
      paddingHorizontal: 20
    },
    details: {
      marginTop: 10,
      paddingVertical: 10,
      paddingHorizontal: 20
    },
    castText: {
      fontSize: 20,
      fontWeight: 'bold'
    }
  })

export default MovieDetailsComponet
