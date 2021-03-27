import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RefreshControl, FlatList, View, Text, StyleSheet, ScrollView, TouchableHighlight } from 'react-native';
import { Button, TextInput, FAB } from 'react-native-paper';
import Card from './FoodCard';
import FoodCard from './FoodCard';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = ({ navigation }) => {

  const [refreshing, setRefeshing] = useState(false);
  const [data, setData] = useState([]);

  const renderItem = ({ item }) => (
    <FoodCard id={item.id} name={item.name} recipes={item.recipes} navigate={navigation.navigate} />
  );

  const handleRefresh = async () => {
    setRefeshing(true);
    getData();
  };

  const getData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys()
      if (keys.length > 0) {
        const values = await AsyncStorage.multiGet(keys);
        if (values.length > 0) {
          const storedData = values.map((el) => {
            return JSON.parse(el[1]);
          });
          setData(storedData);
        }
      }
    } catch (e) {
      // read key error
      console.log(e.toString());
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getData();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      {
        data.length > 0 ? (
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        ) : <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#666666' }}>No recipes...</Text>
      }

      <FAB
        style={styles.fab}
        icon={require('../resource/plusIcon.png')}
        onPress={() => navigation.navigate('Add')}
        theme={{ colors: { accent: '#ffaa42' } }}
        color="#4a4a4a"
      />

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    padding: 5,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default HomeScreen;