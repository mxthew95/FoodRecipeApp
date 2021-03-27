import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import EditScreen from './screens/EditScreen';
import { forHorizontalIOS } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/CardStyleInterpolators';
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
            <Stack.Screen name="Edit" component={EditScreen} />
        </Stack.Navigator>
    )
}