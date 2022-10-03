import { ThemeProvider } from 'styled-components/native';
import {
  useFonts,
  Nunito_400Regular,
  Nunito_700Bold,
} from '@expo-google-fonts/nunito';
import theme from '@theme/index';
import { StatusBar } from 'expo-status-bar';
import { Routes } from '@routes/index';

export default function App() {
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar translucent style='dark' />
      <Routes />
    </ThemeProvider>
  );
}
