
import * as React from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';

const FoodCard = ({ name, recipes, navigate }) => {
    return (
        <TouchableHighlight onPress={() => navigate('Edit')}>
            <Card style={styles.card}>
                <View styles={styles.cardContent}>
                    <Image
                        style={styles.cardImage}
                        source={require('../resource/food1.png')}
                        defaultSource={require('../resource/default.png')}
                    />
                    <View style={styles.cardText}>
                        <Text style={styles.title}>{name}</Text>
                    </View>
                </View>
            </Card>
        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffaa42',
    },
    cardImage: {
        width: 150,
        height: 100
    },
    cardText: {
        padding: 5
    },
    title: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold'
    },
});

export default FoodCard;