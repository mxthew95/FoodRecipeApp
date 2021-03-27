import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import EditScreen from './screens/EditScreen';
import AddScreen from './screens/AddScreen';

const Stack = createStackNavigator();

export default function Navigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#4a4a4a',
                },
                headerTitleStyle: {
                    fontWeight: 'bold',
                    color: 'white',
                    fontSize: 24
                },
            }}
        >
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    title: 'Your Recipes',
                }}
            />
            <Stack.Screen
                name="Edit"
                component={EditScreen}
                options={({ route }) => ({ title: route.params.name })}
            />
            <Stack.Screen
                name="Add"
                component={AddScreen}
                options={{
                    title: 'Add A Recipe',
                }}
            />
        </Stack.Navigator>
    )
}