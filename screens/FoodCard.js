import * as React from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, ScrollView } from 'react-native';
import { Card } from 'react-native-paper';
import { primaryColor } from '../StaticVariables';

const FoodCard = ({ id, name, recipes, navigate }) => {
    const maxRecipeChar = 5; //let size of card be fixed
    const recipesInLine = recipes.split('\n').join(','); //convert to single line string
    const recipesToDisplay =  recipesInLine.length > maxRecipeChar ? recipesInLine.substring(0,maxRecipeChar)+'...' : recipesInLine; //no need to show all recipes in card

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
        backgroundColor: primaryColor,
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