import React from 'react'
import { useColorScheme } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { lightTheme, darkTheme } from '../contants/themes'
import { Movie } from '../interfaces/movies'

import Home from '../screens/Home'
import Details from '../screens/Details'

export type RootStackParams = {
  Home: undefined
  Details: Movie
}

const Stack = createNativeStackNavigator<RootStackParams>()

const Navigation = () => {
  const scheme = useColorScheme()
  return (
    <NavigationContainer theme={scheme === 'dark' ? darkTheme : lightTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Details' component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
