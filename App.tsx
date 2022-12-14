import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import Navigation from './src/navigation'

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style='auto' />
      <Navigation />
    </SafeAreaProvider>
  )
}
