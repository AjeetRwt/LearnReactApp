import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  ScrollView,
} from 'react-native';
import ExclusiveOffers from './ExclusiveOffers';
import Filter from '../assets/svg/fiter';
import Fav from '../assets/svg/fav';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.75;

const DATA = [
  {
    id: '1',
    title: 'Mount Fuji',
    locatieson: 'Tokyo, Japan',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=800',
  },
  {
    id: '2',
    title: 'Andes',
    location: 'South America',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800',
  },
  {
    id: '3',
    title: 'Swiss Alps',
    location: 'Switzerland',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800',
  },
  {
    id: '4',
    title: 'Swiss Alps',
    location: 'Switzerland',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800',
  },
  {
    id: '5',
    title: 'Swiss Alps',
    location: 'Switzerland',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800',
  },
];

const HomeScreen = () => {
  const [selectedTab, setSelectedTab] = useState('Most Viewed');
  const [favorites, setFavorites] = useState({});
  const navigation = useNavigation();

  const toggleFavorite = id => {
    setFavorites(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderDestinationCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation?.navigate('Details', { item })}
      activeOpacity={0.9}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.cardImage}
        resizeMode="cover"
      />
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={() => toggleFavorite(item.id)}
        activeOpacity={0.7}
      >
        <Fav />
      </TouchableOpacity>
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <View style={styles.cardFooter}>
          <View style={styles.locationContainer}>
            {/* <Icon name="location-outline" size={16} color="#CCC" /> */}
            <Text style={styles.locationText}>{item.location}</Text>
          </View>
          <View style={styles.ratingContainer}>
            {/* <Icon name="star" size={16} color="#FFD700" /> */}
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {' '}
        <View style={styles.content}>
          {/* Header Section */}
          <View style={styles.header}>
            <View>
              <Text style={styles.greeting}>Hi, Ajeet 👋</Text>
              <Text style={styles.subtitle}>Explore the world</Text>
            </View>
            <Image
              source={{ uri: 'https://i.pravatar.cc/100?img=12' }}
              style={styles.profileImage}
            />
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              {/* <Icon name="search-outline" size={20} color="#999" /> */}
              <TextInput
                style={styles.searchInput}
                placeholder="Search places"
                placeholderTextColor="#999"
                returnKeyType="search"
                clearButtonMode="while-editing"
              />
            </View>
            <TouchableOpacity style={styles.filterButton} activeOpacity={0.7}>
              <Filter />
              {/* <Icon name="options-outline" size={20} color="#666" /> */}
            </TouchableOpacity>
          </View>

          {/* Popular Places Section */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular places</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.viewAllText}>View all</Text>
            </TouchableOpacity>
          </View>

          {/* Tab Navigation */}
          <View style={styles.tabContainer}>
            {['Most Viewed', 'Nearby', 'Latest'].map(tab => (
              <TouchableOpacity
                key={tab}
                style={[styles.tab, selectedTab === tab && styles.activeTab]}
                onPress={() => setSelectedTab(tab)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.tabText,
                    selectedTab === tab && styles.activeTabText,
                  ]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Destinations List */}
          <FlatList
            data={DATA}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={renderDestinationCard}
            contentContainerStyle={styles.listContent}
            snapToInterval={CARD_WIDTH + 15}
            decelerationRate="fast"
            bounces={true}
            pagingEnabled={false}
          />
          <ExclusiveOffers />
        </View>{' '}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 10 : 20,
    paddingBottom: 20,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
    ...Platform.select({
      ios: {
        fontFamily: 'System',
        fontWeight: '700',
      },
      android: {
        fontFamily: 'sans-serif-medium',
      },
    }),
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    fontWeight: '400',
    ...Platform.select({
      ios: {
        fontFamily: 'System',
      },
      android: {
        fontFamily: 'sans-serif',
      },
    }),
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E0E0E0',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 25,
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'ios' ? 14 : 12,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#1A1A1A',
    ...Platform.select({
      ios: {
        fontFamily: 'System',
      },
      android: {
        fontFamily: 'sans-serif',
      },
    }),
  },
  filterButton: {
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    padding: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    ...Platform.select({
      ios: {
        fontFamily: 'System',
        fontWeight: '700',
      },
      android: {
        fontFamily: 'sans-serif-medium',
      },
    }),
  },
  viewAllText: {
    fontSize: 14,
    color: '#999',
    fontWeight: '500',
    ...Platform.select({
      ios: {
        fontFamily: 'System',
      },
      android: {
        fontFamily: 'sans-serif',
      },
    }),
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: 'transparent',
  },
  activeTab: {
    backgroundColor: '#1A1A1A',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#999',
    ...Platform.select({
      ios: {
        fontFamily: 'System',
        fontWeight: '600',
      },
      android: {
        fontFamily: 'sans-serif-medium',
      },
    }),
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  listContent: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
  },
  card: {
    width: 300,
    height: 300,
    marginRight: 15,
    borderRadius: 25,
    overflow: 'hidden',
    backgroundColor: '#FFF',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  cardImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  favoriteButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 20,
    padding: 8,
  },
  cardInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
    ...Platform.select({
      ios: {
        fontFamily: 'System',
        fontWeight: '700',
      },
      android: {
        fontFamily: 'sans-serif-medium',
      },
    }),
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 14,
    color: '#E0E0E0',
    marginLeft: 4,
    ...Platform.select({
      ios: {
        fontFamily: 'System',
      },
      android: {
        fontFamily: 'sans-serif',
      },
    }),
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 4,
    fontWeight: '600',
    ...Platform.select({
      ios: {
        fontFamily: 'System',
        fontWeight: '600',
      },
      android: {
        fontFamily: 'sans-serif-medium',
      },
    }),
  },
});
