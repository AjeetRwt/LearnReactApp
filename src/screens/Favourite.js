import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';

const { width } = Dimensions.get('window');

const Favourite = () => {
  const [favorites, setFavorites] = useState([
    {
      id: '1',
      title: 'Mount Fuji',
      location: 'Tokyo, Japan',
      rating: 4.8,
      image: require('../assets/images/offerImage.png'),
    },
    {
      id: '2',
      title: 'Swiss Alps',
      location: 'Switzerland',
      rating: 4.9,
      image: require('../assets/images/offerImage.png'),
    },
  ]);

  const removeFavorite = id => {
    setFavorites(prev => prev.filter(item => item.id !== id));
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />

      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.location}>{item.location}</Text>
        <Text style={styles.rating}>⭐ {item.rating}</Text>
      </View>

      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeFavorite(item.id)}
      >
        <Text style={styles.removeText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  if (favorites.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>No Favorites Yet</Text>
        <Text style={styles.emptySubtitle}>
          Start adding places to see them here.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Favorites</Text>

      <FlatList
        data={favorites}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default Favourite;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },

  header: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 20,
    color: '#1A1A1A',
  },

  card: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 20,
    marginBottom: 15,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
      },
      android: {
        elevation: 4,
      },
    }),
  },

  image: {
    width: 110,
    height: 110,
  },

  infoContainer: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
  },

  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },

  location: {
    fontSize: 14,
    color: '#777',
    marginBottom: 6,
  },

  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },

  removeButton: {
    justifyContent: 'center',
    paddingHorizontal: 15,
  },

  removeText: {
    color: '#FF4D4D',
    fontWeight: '600',
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },

  emptySubtitle: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
  },
});
