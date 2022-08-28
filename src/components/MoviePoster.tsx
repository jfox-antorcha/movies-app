import React, { useMemo } from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useNavigation, useTheme } from '@react-navigation/native'
import { Colors } from '../interfaces/themes'
import { Movie } from '../interfaces/movies'

interface Props {
  movie: Movie
  width: number
  height: number
}

interface StylesProps {
  colors: Colors
  width: number
  height: number
}

const MoviePoster = ({ movie, height, width }: Props) => {
  const { colors } = useTheme()
  const navigation = useNavigation()
  const styles = useMemo(() => createStyles({ colors, width, height }), [colors, width, height])
  const image_path = `https://image.tmdb.org/t/p/w500${movie.poster_path}`

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.container}
      onPress={() => navigation.navigate('Details', movie)}
    >
      <Image source={{ uri: image_path }} style={styles.poster} />
    </TouchableOpacity>
  )
}

export default MoviePoster

const createStyles = ({ colors, width, height }: StylesProps) =>
  StyleSheet.create({
    container: {
      marginHorizontal: 10,
      width: width,
      height: height,
      borderRadius: 20,
      backgroundColor: colors.card
    },
    poster: {
      flex: 1,
      borderRadius: 20
    }
  })
