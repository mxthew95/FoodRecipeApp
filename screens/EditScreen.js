
import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet, Alert } from 'react-native';
import { HelperText, Button, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme, primaryColor, showErrorAlert } from '../StaticVariables';

const EditScreen = ({ navigation, route }) => {
    const { foodID } = route.params;
    const [loading, setLoading] = useState(true);
    const [foodName, setFoodName] = useState('');
    const [recipes, setRecipes] = useState('');
    const [saving, setSaving] = useState(false);
    const [removing, setRemoving] = useState(false);

    const handleFoodNameChange = (input) => {
        setFoodName(input);
    }

    const foodNameHasError = () => {
        return foodName.match(/^[a-zA-Z ]*$/) === null;
    };

    const handleRecipesChange = (input) => {
        setRecipes(input);
    }

    const handleSave = async () => {
        setSaving(true);
        const data = {
            id: foodID,
            name: foodName,
            recipes: recipes
        };

        try {
            const jsonValue = JSON.stringify(data);
            await AsyncStorage.setItem(foodID, jsonValue);
            setSaving(false);
            navigation.navigate('Home');
        } catch (e) {
            // save error
            showErrorAlert();
            console.log(e.toString())
        }
    };

    const handleRemove = async () => {
        try {
            setRemoving(true);
            await AsyncStorage.removeItem(foodID);
            setRemoving(false);
            navigation.navigate('Home');
        } catch (e) {
            // remove error
            showErrorAlert();
            console.log(e.toString())
        }
    }

    const showRemoveAlert = () =>
        Alert.alert(
            `Remove ${foodName}`,
            `Are you sure you want to remove ${foodName}?`,
            [
                { text: "Cancel" },
                { text: "Remove", onPress: handleRemove }
            ], {
            cancelable: true,
        }
        );

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem(foodID)
            if (jsonValue) {
                const data = JSON.parse(jsonValue);
                setFoodName(data.name);
                setRecipes(data.recipes);
                setLoading(false);
            }
        } catch (e) {
            showErrorAlert();
            console.log(e.toString());
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getData();
        });
        return unsubscribe;
    }, [navigation]);

    return (
        <View style={styles.container}>
            {
                !loading ? (
                    <View>
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
                        <View style={styles.buttons}>
                            <Button
                                labelStyle={{ color: 'white', fontSize: 18 }}
                                uppercase={false}
                                theme={theme}
                                mode="contained"
                                onPress={handleSave}
                                loading={saving}
                                disabled={!foodNameHasError() && foodName ? false : true}
                            >
                                Save
                            </Button>
                            <Button
                                labelStyle={{ color: 'white', fontSize: 18 }}
                                uppercase={false}
                                theme={theme}
                                mode="contained"
                                onPress={showRemoveAlert}
                                loading={removing}
                            >
                                Remove
                            </Button>
                        </View>
                    </View>
                ) : <ActivityIndicator size="large" color={primaryColor} animating={loading} />
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 5,
        padding: 8
    },
    buttons: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-evenly'
    }
});

export default EditScreen;