import React from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import TractPlayer, {usePlaybackState, State} from 'react-native-track-player';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import {playbackService} from '../../musicPlayerService';

const ControlCenter = () => {
  const playBackState = usePlaybackState();

  // next button
  const skipToNext = async () => {
    await TractPlayer.skipToNext();
  };

  // previous button
  const skipToPrevious = async () => {
    await TractPlayer.skipToPrevious();
  };

  type PlaybackStatus = { state?: State };

  // toggle play/pause button
  const togglePlayBack = async (playback: PlaybackStatus) => {
    const currentTrack = await TractPlayer.getCurrentTrack();
    if (currentTrack != null) {
      const currentState = playback.state;
      if (
        currentState === State.Paused ||
        currentState === State.Ready ||
        currentState === undefined
      ) {
        await TractPlayer.play();
      } else {
        await TractPlayer.pause();
      }
    }
  };

  return(
    <View style={styles.container}>
      <Pressable onPress={skipToPrevious}>
        <Icon name="skip-previous" size={40} color="#ffffff" />
      </Pressable>
      <Pressable onPress={() => togglePlayBack(playBackState)}>
        <Icon name={playBackState?.state === State.Playing ? 'pause' : 'play-arrow'} size={75} color="#ffffff" />
      </Pressable>
      <Pressable onPress={skipToNext}>
        <Icon name="skip-next" size={40} color="#ffffff" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      marginBottom: 56,
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    icon: {
      color: '#FFFFFF',
    },
    playButton: {
      marginHorizontal: 24,
    },
  });

export default ControlCenter;
