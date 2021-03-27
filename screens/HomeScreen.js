import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RefreshControl, FlatList, View, Text, StyleSheet, ScrollView, TouchableHighlight } from 'react-native';
import { Button, TextInput, FAB } from 'react-native-paper';
import { Alert } from 'react-native';
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
          setRefeshing(false);
        }
      }
      else {
        setRefeshing(false);
        setData([]);
      }
    } catch (e) {
      // read key error
      console.log(e.toString());
      showErrorAlert();
    }
  }

  const clearData = async () => {
    try {
      await AsyncStorage.clear();
      setData([]);
    } catch (e) {
      // clear error
      console.log(e.toString())
      showErrorAlert();
    }
  };

  const showErrorAlert = () =>
    Alert.alert(
      "",
      "Something went wrong...",
      [
        { text: "OK" },
      ], {
      cancelable: true,
    }
    );

  const showRemoveAlert = () =>
    Alert.alert(
      "Remove All Recipes",
      "Are you sure you want to remove all recipes?",
      [
        { text: "Cancel" },
        { text: "Remove", onPress: clearData }
      ], {
      cancelable: true,
    }
    );

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
          <View>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              refreshing={refreshing}
              onRefresh={handleRefresh}
              horizontal={true}
            />
          </View>
        ) : <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#666666' }}>No recipes...</Text>
      }

      <FAB
        style={styles.fab}
        icon={require('../resource/plusIcon.png')}
        onPress={() => navigation.navigate('Add')}
        theme={{ colors: { accent: '#ffaa42' } }}
        color="#4a4a4a"
      />
      <FAB
        style={styles.fab2}
        icon={require('../resource/deleteIcon.png')}
        onPress={showRemoveAlert}
        theme={{ colors: { accent: '#ffaa42' } }}
        color="#4a4a4a"
        disabled={data.length < 1 ? true : false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
    padding: 5,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  fab2: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 76,
  },
});

export default HomeScreen;