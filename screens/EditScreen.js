
import * as React from 'react';
import { View, Text } from 'react-native';
const EditScreen = ({ navigation, route }) => {
    const { foodID } = route.params;
    return (
        <View>
            <Text>Edit Screen: {foodID}</Text>
        </View>
    );
};

export default EditScreen;