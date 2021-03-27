
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HelperText, Button, TextInput, DataTable } from 'react-native-paper';
import 'react-native-get-random-values'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { nanoid } from 'nanoid'

const theme = { colors: { primary: '#ffaa42' } };

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

    const [saving, setSaving] = useState(false);
    const handleSave = async () => {
        setSaving(true);
        const data = {};
        data.id = nanoid();
        data.name = foodName;
        data.recipes = recipes;

        try {
            const jsonValue = JSON.stringify(data)
            await AsyncStorage.setItem(data.id, jsonValue);
            setSaving(false);
            navigation.navigate('Home');
        } catch (e) {
            // save error
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
            theme={{ colors: { primary: '#ffaa42' } }}

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
        margin: 10
    }
});

export default AddScreen;