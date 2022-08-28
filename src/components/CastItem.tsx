import React, { useMemo } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { Cast } from '../interfaces/movies'
import { useTheme } from '@react-navigation/native'
import { Colors } from '../interfaces/themes'

interface Props {
  cast: Cast
}

const CastItem = ({ cast }: Props) => {
  const { colors } = useTheme()
  const styles = useMemo(() => createStyles(colors), [colors])
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${cast.profile_path}` }}
        style={styles.profileImage}
        resizeMode='cover'
      />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{cast.name}</Text>
        <Text style={styles.character}>{cast.character}</Text>
      </View>
    </View>
  )
}

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      marginVertical: 20,
      marginHorizontal: 10,
      borderRadius: 10,
      height: 200,
      width: 120,
      shadowColor: colors.border,
      shadowOffset: {
        width: 0,
        height: 10
      },
      shadowOpacity: 0.24,
      shadowRadius: 7,
      elevation: 9
    },
    profileImage: {
      flex: 1,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10
    },
    textContainer: {
      height: 80,
      paddingTop: 10
    },
    name: {
      fontSize: 14,
      fontWeight: 'bold',
      color: colors.text
    },
    character: {
      fontSize: 12,
      color: colors.text,
      opacity: 0.8
    }
  })
export default CastItem
