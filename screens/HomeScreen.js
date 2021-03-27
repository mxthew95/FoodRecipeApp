import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import 'react-native-get-random-values'
import { nanoid } from 'nanoid'
import { Button, TextInput } from 'react-native-paper';
import Card from './FoodCard';
import FoodCard from './FoodCard';

const HomeScreen = ({ navigation }) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <FoodCard navigate={navigation.navigate} name="Food 1" recipes={'chicken,egg'}/>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    padding: 5,
  }
});

export default HomeScreen;