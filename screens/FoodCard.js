
import * as React from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';

const FoodCard = ({ id, name, recipes, navigate, img }) => {
    return (
        <TouchableHighlight style={styles.touchable} onPress={() => navigate('Edit', {
            foodID: id,
            name: name
        })}>
            <Card style={styles.card}>
                <View styles={styles.cardContent}>
                    <Image
                        style={styles.cardImage}
                        source={require('../resource/default.png')}
                    />
                    <View style={styles.cardText}>
                        <Text style={styles.title}>{name}</Text>
                        <Text style={styles.subtitle}>{recipes}</Text>
                    </View>
                </View>
            </Card>
        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    touchable: {
        margin: 5
    },
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
    subtitle: {
        color: 'white',
    }
});

export default FoodCard;