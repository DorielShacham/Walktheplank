import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const ProductDetail = ({ route }) => {
    const { product } = route.params;

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={product.image} style={styles.image} />
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.title}>{product.title}</Text>
                <Text style={styles.description}>{product.description}</Text>
                <Text style={styles.price}>Coins: {product.price}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
    detailsContainer: {
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    description: {
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'center',
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#3498db',
        textAlign: 'center',
    },
});

export default ProductDetail;
