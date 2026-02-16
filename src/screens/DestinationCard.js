import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const DestinationCard = ({ item, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <ImageBackground
        source={{ uri: item.image }}
        style={styles.image}
        imageStyle={{ borderRadius: 20 }}
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.location}>{item.location}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default DestinationCard;

const styles = StyleSheet.create({
  card: {
    width: 220,
    height: 300,
    marginRight: 20,
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    padding: 15,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  location: {
    color: '#fff',
    fontSize: 14,
  },
});
