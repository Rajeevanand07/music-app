import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import {setupPlayer, addTrack} from '../musicPlayerService';
import React, { useEffect, useState } from 'react';
import MusicPlayer from './screens/MusicPlayer';

function App(): React.JSX.Element {
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  async function initializePlayer() {
    const isReady = await setupPlayer();
    if (isReady) {
      setIsPlayerReady(true);
      await addTrack();
    }
  }

  useEffect(() => {
    initializePlayer();
  }, []);

  if (!isPlayerReady) {
    return (
      <SafeAreaView>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <MusicPlayer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
