import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const List = () => {
  const navigation = useNavigation();
  
  const products = [
    {
      id: 1,
      title: 'Rebar juice',
      description: 'Description for Product 1',
      image: require('../../images/rebar.png'),
      price: 45
    },
    {
      id: 2,
      title: 'Gym mattress',
      description: 'Description for Product 2',
      image: require('../../images/gymm.jpeg'),
      price: 55
    },
    {
      id: 3,
      title: '25 shekel coupon',
      description: 'Description for Product 2',
      image: require('../../images/buyme.jpeg'),
      price: 150
    },
    {
      id: 4,
      title: 'Random shirt',
      description: 'Description for Product 2',
      image: require('../../images/shirt.jpeg'),
      price: 35
    },
    {
      id: 5,
      title: 'Macdonalds burger',
      description: 'Description for Product 2',
      image: require('../../images/burger.png'),
      price: 200
    },
  ];
  const navigateToProductDetail = (product) => {
    navigation.navigate('ProductDetail', { product: product });
  };
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {products.map(product => (
        <TouchableOpacity
          key={product.id}
          onPress={() => navigateToProductDetail(product)}
          style={styles.productContainer}
        >
          <View style={styles.imageContainer}>
            <Image source={product.image} style={styles.image} />
          </View>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.description}>{product.description}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>Coins: {product.price}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  productContainer: {
    width: '48%',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageContainer: {
    width: '100%',
    height: 150,
    marginBottom: 10
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 5
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center'
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center'
  },
  priceContainer: {
    backgroundColor: '#3498db',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5
  },
  priceText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default List;
