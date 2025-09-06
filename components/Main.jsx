import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  Button,
  TouchableHighlight,
  Pressable,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import Constants from 'expo-constants';
import { useEffect, useState } from 'react';
import { getLatestGames } from '../lib/metacritic';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AnimatedGameCard, GameCard } from './GameCard';
import { Logo } from './Logo';

export function Main() {
  const [games, setGames] = useState([]);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    getLatestGames().then((games) => {
      setGames(games);
    });
  }, []);
  return (
    <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <View style={{ marginBottom: 20 }}>
        <Logo />
      </View>
      {games.length === 0 ? (
        <ActivityIndicator color={'#fff'} size={'large'} />
      ) : (
        <FlatList
          data={games}
          keyExtractor={(game) => game.slug}
          renderItem={({ item, index }) => <AnimatedGameCard game={item} index={index} />}
        ></FlatList>
      )}
      {/* <Image
        source={{
          uri: 'https://cdn-1.motorsport.com/images/mgl/Y99JQRbY/s400/red-bull-racing-logo-1.webp',
        }}
        style={{ width: 100, height: 100, resizeMode: 'center' }}
      /> */}
      {/* <Text style={{ color: 'white' }}>Open up App.js to start working on your app! elian2</Text> */}
      {/* <Button color="red" title="pulsa aquí Button" onPress={() => alert('Hola')} /> */}
      {/* <TouchableHighlight
        underlayColor={'#09f'}
        onPress={() => alert('Hola')}
        style={{
          width: 200,
          height: 200,
          backgroundColor: 'green',
          borderRadius: 100,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white' }}>Pulsa aquí TouchableHighlight</Text>
      </TouchableHighlight> */}
      {/* <Pressable
        onPress={() => {}}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? 'rgba(32, 46, 63, 1)' : 'white',
          },
          styles.wrapperCustom,
        ]}
      >
        {({ pressed }) => (
          <Text style={styles.text}>{pressed ? 'Pressed! Pressable' : 'Press Me Pressable'}</Text>
        )}
      </Pressable> */}
    </View>
  );
}
