
import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { HelperText, Button, TextInput } from 'react-native-paper';
import 'react-native-get-random-values'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { nanoid } from 'nanoid'
import { ThemeProvider } from '@react-navigation/native';

const primaryColor = '#ffaa42';
const theme = { colors: { primary: primaryColor } };

const AddScreen = ({ navigation }) => {
    const [foodName, setFoodName] = useState('');
    const handleFoodNameChange = (input) => {
        setFoodName(input)
    }
    const foodNameHasError = () => {
        return foodName.match(/^[a-zA-Z ]*$/) === null;
    };

    const [recipes, setRecipes] = useState('');
    const handleRecipesChange = (input) => {
        setRecipes(input);
    }

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

    const [saving, setSaving] = useState(false);
    const handleSave = async () => {
        setSaving(true);
        const data = {
            id: nanoid(),
            name: foodName,
            recipes: recipes
        };

        try {
            const jsonValue = JSON.stringify(data)
            await AsyncStorage.setItem(data.id, jsonValue);
            setSaving(false);
            navigation.navigate('Home');
        } catch (e) {
            // save error
            showErrorAlert();
            console.log(e.toString())
        }
    };

return (
    <View style={styles.container}>
        <TextInput
            label="Name of food"
            value={foodName}
            onChangeText={handleFoodNameChange}
            mode="outlined"
            theme={theme}
        />
        <HelperText type="error" visible={foodName && foodNameHasError()}>
            Food name is invalid!
            </HelperText>
        <TextInput
            label="Recipes"
            value={recipes}
            onChangeText={handleRecipesChange}
            mode="outlined"
            theme={theme}
            multiline={true}
            numberOfLines={4}
        />
        <View style={styles.saveButton}>
            <Button 
                labelStyle={{ color: 'white', fontSize: 18 }} 
                uppercase={false} 
                theme={theme} 
                mode="contained" 
                onPress={handleSave} 
                loading={saving}
                disabled={!foodNameHasError() && foodName?false:true}
                >
                Save
            </Button>
        </View>
    </View>
);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 5,
        padding: 8
    },
    saveButton: {
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10
    }
});

export default AddScreen;