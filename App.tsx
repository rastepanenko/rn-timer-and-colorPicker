import { RecoilRoot } from 'recoil';
import { Navigation } from './src/Navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MenuProvider } from 'react-native-popup-menu';

export default function AppRecoilWrapper() {
  return (
    <RecoilRoot>
      <App />
    </RecoilRoot>
  );
}

function App() {
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <MenuProvider>
        <Navigation />
      </MenuProvider>
    </SafeAreaProvider>
  );
}
