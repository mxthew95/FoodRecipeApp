
import * as React from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, ScrollView } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';

const FoodCard = ({ id, name, recipes, navigate, img }) => {
    const maxRecipeChar = 5;
    const recipesInLine = recipes.split('\n').join(',');
    const recipesToDisplay =  recipesInLine.length > maxRecipeChar ? recipesInLine.substring(0,maxRecipeChar)+'...' : recipesInLine;

    return (
        <TouchableHighlight style={styles.touchable} onPress={() => navigate('Edit', {
            foodID: id,
            name: name
        })}>
            <Card>
                <View styles={styles.cardContent}>
                    <Image
                        style={styles.cardImage}
                        source={require('../resource/default.png')}
                    />
                    <View style={styles.cardTitle}>
                        <Text style={styles.title}>{name}</Text>
                    </View>
                    <View style={styles.cardSubtitle }>
                        <Text style={styles.subtitle}>{recipesToDisplay}</Text>
                    </View>

                </View>
            </Card>
        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    touchable: {
        margin: 5,
    },
    cardImage: {
        width: 150,
        height: 100
    },
    cardTitle: {
        padding: 5,
        backgroundColor: '#ffaa42',
    },
    cardSubtitle: {
        padding: 5,
        backgroundColor: '#dedede',
    },
    title: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold'
    },
    subtitle: {
        color: 'black',
        fontSize: 12
    }
});

export default FoodCard;