import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
//import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.75;

const OfferData = [
  {
    id: '1',
    title: 'Mount Fuji',
    location: 'Tokyo, Japan',
    rating: 4.8,
    image: require('../assets/images/offerImage.png'),
  },
  {
    id: '2',
    title: 'Andes',
    location: 'South America',
    rating: 4.9,
    image: require('../assets/images/offerImage.png'),
  },
  {
    id: '3',
    title: 'Swiss Alps',
    location: 'Switzerland',
    rating: 4.9,
    image: require('../assets/images/offerImage.png'),
  },
];

const ExclusiveOffers = () => {
  // const navigation = useNavigation();

  const renderDestinationCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      //      onPress={() => navigation.navigate('Details', { item })}
      activeOpacity={0.9}
    >
      <Image source={item.image} style={styles.cardImage} resizeMode="cover" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Exclusive Offers</Text>
      </View>

      <FlatList
        data={OfferData}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={renderDestinationCard}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default ExclusiveOffers;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },

  sectionHeader: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    ...Platform.select({
      ios: { fontFamily: 'System' },
      android: { fontFamily: 'sans-serif-medium' },
    }),
  },

  listContent: {
    paddingLeft: 20,
    paddingRight: 10,
  },

  card: {
    width: 300,
    height: 180,
    marginRight: 15,
    borderRadius: 25,
    overflow: 'hidden',
    backgroundColor: '#FFF',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});
